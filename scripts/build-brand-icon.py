"""Derive square brand icons from the site's high-resolution crystal artwork."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "images/logo-top-transparent.png"
BACKGROUND = (10, 15, 30, 255)


def render(size: int) -> Image.Image:
    source = Image.open(SOURCE).convert("RGBA")
    # This rectangle contains only the crystal, above the wordmark.
    mark = source.crop((60, 20, 473, 442))
    inset = round(size * (0.08 if size >= 128 else 0.06))
    target = size - 2 * inset
    mark.thumbnail((target, target), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), BACKGROUND)
    canvas.alpha_composite(mark, ((size - mark.width) // 2, (size - mark.height) // 2))
    return canvas


if __name__ == "__main__":
    render(512).save(ROOT / "images/frosted-logic-linkedin.png", optimize=True)
    render(180).save(ROOT / "apple-touch-icon.png", optimize=True)
    render(32).save(ROOT / "favicon-32x32.png", optimize=True)
    render(64).save(ROOT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
