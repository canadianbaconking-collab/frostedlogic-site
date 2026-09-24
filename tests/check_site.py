"""Dependency-free regression checks for the static redesign."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
BASELINE = "8fcbd56b449e4c79d3d58e15ef61e3b59e86bc54"


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.elements = []
        self.ids = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag, attrs))
        if "id" in attrs:
            self.ids.append(attrs["id"])


class SiteChecks(unittest.TestCase):
    def test_changed_pages(self):
        for filename in ("index.html", "about.html"):
            with self.subTest(page=filename):
                source = (ROOT / filename).read_text()
                page = Page(source)
                self.assertEqual(sum(tag == "h1" for tag, _ in page.elements), 1)
                self.assertEqual(sum(tag == "main" for tag, _ in page.elements), 1)
                self.assertEqual(len(page.ids), len(set(page.ids)))
                for phrase in ("Trust deliberately.", "Enforce predictably.", "Keep systems understandable."):
                    self.assertIn(phrase, source.replace("<br>", ""))
                for tag, attrs in page.elements:
                    if tag == "img":
                        self.assertIn("alt", attrs)
                        self.assertTrue(attrs.get("width"))
                        self.assertTrue(attrs.get("height"))
                    if tag == "a":
                        self.assertNotEqual(attrs.get("href"), "#")
                    for key in ("src", "href"):
                        value = attrs.get(key)
                        if not value:
                            continue
                        url = urlsplit(value)
                        if url.scheme or url.netloc:
                            continue
                        path = unquote(url.path)
                        target = ROOT / (path.lstrip("/") or filename)
                        if path == "/":
                            target = ROOT / "index.html"
                        elif path.endswith("/"):
                            target = target / "index.html"
                        self.assertTrue(target.is_file(), f"{filename}: missing {value}")
                        if url.fragment:
                            target_page = Page(target.read_text())
                            self.assertIn(url.fragment, target_page.ids, value)

    def test_doctrine_cleanup(self):
        for filename in ("index.html", "about.html", "docs/site-spec-extraction.md", "README.md"):
            source = (ROOT / filename).read_text().lower()
            for phrase in ("local-first", "determinism where possible", "clarity over feature count",
                           "configuration clarity", "reduce cognitive friction"):
                self.assertNotIn(phrase, source, filename)

    def test_motion_and_fallback(self):
        css = (ROOT / "styles/security.css").read_text()
        self.assertRegex(css, r"animation: light-drift (?:[3-9]\d|\d{3,})s ease-in-out infinite alternate")
        self.assertIn("prefers-reduced-motion: reduce", css)
        self.assertIn("animation: none", css)
        self.assertIn("@supports", css)
        self.assertIn("background: #161b2c", css)
        self.assertIn(".skip-link:focus", css)
        js = (ROOT / "security.js").read_text()
        self.assertIn("aria-expanded", js)
        self.assertIn("'Escape'", js)
        self.assertIn("toggle.focus()", js)
        self.assertNotIn("preventDefault", js)

    def test_legacy_isolation_and_brand(self):
        for filename in ("index.html", "about.html"):
            source = (ROOT / filename).read_text()
            self.assertEqual(source.count('href="/old-website/"'), 1)
            self.assertNotIn('href="/tools.html"', source)
            self.assertNotIn('href="/instruments.html"', source)
            self.assertIn('/images/logo-side.png', source)
        self.assertIn('/images/logo-top.png', (ROOT / 'index.html').read_text())
        hub = (ROOT / 'old-website/index.html').read_text()
        for old_page in ('tools.html', 'instruments.html', 'games.html', 'operations-review.html',
                         'envcheck.html', 'jsonsanity.html', 'schemafirst.html', 'glyphscope.html'):
            self.assertIn(f'href="/{old_page}"', hub)
        for asset in ('images/logo-top.png', 'images/logo-side.png', 'old-website/index.html'):
            self.assertTrue((ROOT / asset).is_file())

    def test_preserved_products_and_hosting(self):
        try:
            subprocess.run(["git", "cat-file", "-e", BASELINE], cwd=ROOT,
                           check=True, capture_output=True)
        except (FileNotFoundError, subprocess.CalledProcessError):
            self.skipTest("Git baseline unavailable; run in the full repository for preservation checks")
        tracked = subprocess.check_output(["git", "ls-tree", "-r", "--name-only", BASELINE], cwd=ROOT, text=True).splitlines()
        allowed = {"index.html", "about.html", "styles/theme.css", "docs/site-spec-extraction.md", "README.md"}
        for filename in tracked:
            if filename not in allowed:
                with self.subTest(file=filename):
                    before = subprocess.check_output(["git", "show", f"{BASELINE}:{filename}"], cwd=ROOT)
                    self.assertEqual((ROOT / filename).read_bytes(), before)
        for forbidden in ("package.json", "wrangler.toml", "wrangler.json", "wrangler.jsonc",
                          "_redirects", "_headers", "_worker.js", "CNAME"):
            self.assertFalse((ROOT / forbidden).exists(), f"Unexpected hosting change: {forbidden}")


if __name__ == "__main__":
    unittest.main(verbosity=2)
