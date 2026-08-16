"""One-off generator for the tiled starfield background texture.
Not part of the build, run manually and commit the resulting PNG.
"""

import random
from PIL import Image, ImageDraw, ImageFont

random.seed(7)

SIZE = 240
MARGIN = 12  # keep content off the edges so tiling has no visible seam

img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

font_path = "/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Bold.ttf"
font_small = ImageFont.truetype(font_path, 9)


def free_pos():
    return (random.randint(MARGIN, SIZE - MARGIN), random.randint(MARGIN, SIZE - MARGIN))


# plain dot stars
for _ in range(14):
    x, y = free_pos()
    r = random.choice([1, 1, 1, 2])
    alpha = random.randint(70, 160)
    draw.ellipse([x - r, y - r, x + r, y + r], fill=(232, 230, 240, alpha))

# 4-point sparkle stars (dim white), matching the logo's star icons
for _ in range(5):
    x, y = free_pos()
    arm = random.choice([3, 4, 5])
    alpha = random.randint(90, 150)
    color = (232, 230, 240, alpha)  # --fg
    draw.line([(x - arm, y), (x + arm, y)], fill=color, width=1)
    draw.line([(x, y - arm), (x, y + arm)], fill=color, width=1)

# binary flecks (dim magenta), echoing the logo's binary-code strip
for _ in range(9):
    x, y = free_pos()
    ch = random.choice(["0", "1"])
    alpha = random.randint(35, 70)
    draw.text((x, y), ch, font=font_small, fill=(255, 47, 146, alpha))  # --magenta

img.save("public/images/starfield-tile.png")
print("wrote public/images/starfield-tile.png", img.size)
