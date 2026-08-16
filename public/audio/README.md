`dump.opus` is CodeManu's "bgm_menu" track from the **8-bit Music Pack
(Loopable)** (https://opengameart.org/content/8-bit-music-pack-loopable,
CC-BY 3.0, needs attribution, which is why there's a credit line in the site
footer), transcoded from the original mp3 to Opus (`ffmpeg -c:a libopus -b:a
96k`, mono, 48kHz). Not a real game OST, royalty-free, loopable by design.

Browser support note: Safari (desktop and iOS) does not support Opus-in-Ogg
playback via `<audio>`/`Audio()` as of this writing, the toggle will show
"♪ TRACK MISSING" there since `audio.play()` rejects. Chrome and Firefox are
fine. If broad compatibility matters more than the format experiment, keep an
mp3 fallback and pick whichever `Audio()` accepts.

`splat.mp3` is the audio track of https://www.youtube.com/watch?v=mxCD3zQh1SA
(the source video is a 0.7s sound-effect clip, no trimming needed), pulled with
`yt-dlp -x --audio-format mp3`. One-shot click sound for the virus-alert badge
in the footer, plain mp3 rather than Opus since it's a single short `Audio()`
playback with no loop requirement, and mp3 has the broadest browser support.
