Custom `:shortcode:` emoji used by the rehype plugin at
`src/plugins/rehype-emoji.mjs` (registry: `src/data/emoji.json`). Each GIF here
was pulled from a Tenor listing the user linked directly, then downsized
(ffmpeg, scaled to 64px tall, re-paletted) purely to keep file size sane for
an inline text-sized emoji, not to strip attribution.

These are meme GIFs sourced from Tenor, not self-authored, same "verify
per-item if it ever needs to be bulletproof" caveat as the other found-asset
notes in `.claude/research/old-internet-aesthetic.md`. Fine for this
non-commercial student blog; swap for something self-hosted/licensed if that
ever changes.

| Shortcode    | Source                                                                                                                                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:skull:`    | https://tenor.com/pt-BR/view/skull-android-xd-meaning-laughter-emoji-713-gif-24287288                                                                                                                                                               |
| `:ice:`      | https://tenor.com/pt-BR/view/dsa-ice-gif-17608354289373564627                                                                                                                                                                                       |
| `:snail:`    | https://tenor.com/pt-BR/view/%D1%83%D0%BB%D0%B8%D1%82%D0%BA%D0%B0-%D1%83%D0%BB%D0%B8%D1%82%D0%BE%D1%87%D0%BA%D0%B0-%D1%83%D0%BB%D0%B8%D1%82%D0%BE%D1%87%D0%BA%D0%BB-%D1%83%D0%BB%D0%B8%D1%82%D0%BE%D1%87%D0%BA%D0%BE-snail-gif-18357931073676036134 |
| `:sob:`      | https://tenor.com/pt-BR/view/realistic-sob-crying-emoji-realistic-emoji-sob-sobbing-gif-11784846928017992636                                                                                                                                        |
| `:evilcat:`  | https://tenor.com/pt-BR/view/animal-jam-aj-animal-jam-classic-cat-evil-gif-5029072558007657986                                                                                                                                                      |
| `:thumbsup:` | https://tenor.com/pt-BR/view/nai-ok-thumbs-up-gif-813972239084342054                                                                                                                                                                                |
| `:smiley:`   | https://tenor.com/pt-BR/view/%D1%81%D0%BC%D0%B0%D0%B9%D0%BB%D0%B8%D0%BA-%D1%81%D0%BC%D0%B0%D0%B9%D0%BB%D0%B8%D0%BA%D0%B8-%D0%B4%D0%BE%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-gif-5906994537433773302                                             |
| `:popo:`     | https://tenor.com/pt-BR/view/popo-emoticons-emoji-gif-6506578508535798455                                                                                                                                                                           |
| `:argument:` | https://tenor.com/pt-BR/view/argument-gif-16587933457054625501                                                                                                                                                                                      |
| `:flower:`   | https://tenor.com/pt-BR/view/emoji-chinese-alibaba-smile-4-flower-gif-3459346795129182542                                                                                                                                                           |
| `:catstare:` | https://tenor.com/pt-BR/view/cat-stare-gif-12228161135910334025                                                                                                                                                                                     |
| `:accept:`   | https://tenor.com/pt-BR/view/accept-knowing-gif-314685336249689899                                                                                                                                                                                  |
| `:hicat:`    | https://tenor.com/pt-BR/view/hi-cat-gif-6640507742364763355                                                                                                                                                                                         |

To add more: drop a GIF here, add a line to `src/data/emoji.json`. No code
changes needed beyond that.
