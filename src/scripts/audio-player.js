// Ambient background track via the Web Audio API rather than <audio loop>.
// HTMLMediaElement's loop attribute re-seeks/re-buffers the file on every
// repeat, which tends to leave an audible gap or click with compressed
// codecs, not good enough for a track that's loopable by design (see
// public/audio/README.md). Decoding the whole file into an AudioBuffer once
// and looping it via AudioBufferSourceNode.loop is sample-accurate: the
// buffer just wraps back to sample 0 with zero gap.
//
// Everything here (AudioContext, the buffer, the single BufferSourceNode)
// lives in this module's closure rather than the DOM. Same reasoning as
// before: it isn't touched by Astro's view-transitions DOM swap, and this
// script only runs once for the whole session, so playback carries over
// across page navigations untouched.
//
// Browsers still block audio output until the user has interacted with the
// page at all (AudioContext starts "suspended"). See the toggle's click
// handler below for the only path that resumes it.
const toggle = document.getElementById("cv-audio-toggle");
if (toggle) {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContextCtor();
  const gain = ctx.createGain();
  gain.gain.value = 0.2;
  gain.connect(ctx.destination);

  let ready = false;

  const render = () => {
    const isPlaying = ready && ctx.state === "running";
    toggle.setAttribute("aria-pressed", String(isPlaying));
    toggle.textContent = isPlaying ? "♪ ON" : ready ? "♪ OFF" : "♪ LOADING";
  };
  render();
  // Safety net: keeps the toggle accurate even if resume()/suspend() settle
  // at a different time than our own promise chains expect.
  ctx.addEventListener("statechange", render);

  const loaded = fetch(toggle.dataset.audioSrc)
    .then((res) => res.arrayBuffer())
    .then((data) => ctx.decodeAudioData(data))
    .then((buffer) => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      source.start(0);
      ready = true;
      render();
    })
    .catch(() => {
      toggle.textContent = "♪ TRACK MISSING";
    });

  // ctx.resume() must be called synchronously within a user-gesture handler.
  // An `await` before it (e.g. waiting on the fetch/decode above) drops out
  // of the gesture's call stack and Chrome silently refuses to start the
  // context, even though the click itself was real. So this calls resume()
  // as its very first statement, then chases the fetch/decode with .then()
  // instead of async/await.
  const tryPlay = () => {
    const resumed = ctx.resume().catch(() => {});
    return Promise.all([resumed, loaded]).then(() => {
      render();
      return ready && ctx.state === "running";
    });
  };

  // No fallback that resumes on the page's first incidental click/key/touch:
  // that would start audio from e.g. clicking a post link, not from the
  // toggle itself. The house rule (see
  // .claude/research/old-internet-aesthetic.md) is explicit, muted by
  // default, one clear control, so the only path to sound is the toggle's
  // own click handler below. This attempt on load only succeeds if the
  // browser already granted audio from a previous visit (sticky activation),
  // it is a no-op otherwise.
  tryPlay();

  toggle.addEventListener("click", () => {
    if (ctx.state === "running") {
      ctx.suspend().then(render);
      return;
    }
    tryPlay().then((started) => {
      if (!started && ready) toggle.textContent = "♪ TRACK MISSING";
    });
  });
}
