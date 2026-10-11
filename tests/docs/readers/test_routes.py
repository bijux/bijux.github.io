"""Exercise public discovery failures without network or browser dependencies."""
import json
from pathlib import Path
import tempfile
import unittest

from routes import verify


class PublicRouteTests(unittest.TestCase):
    def setUp(self):
        owner = Path("artifacts/docs/route-controls")
        owner.mkdir(parents=True, exist_ok=True)
        directory = tempfile.TemporaryDirectory(dir=owner)
        self.addCleanup(directory.cleanup)
        self.site = Path(directory.name)
        self.url = "https://bijux.io/"
        self.page = self.site / "projects/bijux-canon/index.html"
        self.page.parent.mkdir(parents=True)
        self.page.write_text('<link rel="canonical" href="https://bijux.io/projects/bijux-canon/"><a href="/projects/">Projects</a>')
        self.old = self.site / "04-projects/bijux-canon/index.html"
        self.old.parent.mkdir(parents=True)
        self.old.write_text('<link rel="canonical" href="https://bijux.io/projects/bijux-canon/">')
        self.report = self.site / "redirects.json"
        self.report.write_text(json.dumps({"schema": 1, "policy": "exact-declared-redirects", "site_url": self.url,
            "records": [{"path": "04-projects/bijux-canon/index.html", "destination": "projects/bijux-canon/index.html",
                         "canonical": "https://bijux.io/projects/bijux-canon/"}]}))
        (self.site / "search").mkdir()
        self.search = self.site / "search/search_index.json"
        self.search.write_text(json.dumps({"docs": [{"location": "projects/bijux-canon/#knowledge"}]}))
        self.sitemap = self.site / "sitemap.xml"
        self.sitemap.write_text('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://bijux.io/projects/bijux-canon/</loc></url></urlset>')

    def check(self):
        return verify(self.site, self.url, self.report)

    def test_clean_discovery_and_declared_bookmark_redirect_pass(self):
        self.assertEqual(self.check()["compatibility_redirects"], 1)

    def test_canonical_csp_redirect_receipt_checks_the_same_public_routes(self):
        redirects = json.loads(self.report.read_text())
        self.report.write_text(json.dumps({"redirects": redirects, "site_url": self.url}))
        self.assertEqual(self.check()["compatibility_redirects"], 1)

    def test_csp_redirect_receipt_cannot_select_another_site(self):
        redirects = json.loads(self.report.read_text())
        redirects["site_url"] = "https://other.example/"
        self.report.write_text(json.dumps({"redirects": redirects}))
        with self.assertRaisesRegex(ValueError, "does not describe this public hub build"):
            self.check()

    def test_numbered_navigation_and_encoded_alias_fail(self):
        for href in ("/04-projects/bijux-canon/", "/%30%34-projects/bijux-canon/"):
            with self.subTest(href=href):
                self.page.write_text('<link rel="canonical" href="https://bijux.io/projects/bijux-canon/"><a href="' + href + '">Canon</a>')
                with self.assertRaisesRegex(ValueError, "numbered public hub URL"):
                    self.check()

    def test_numbered_search_and_sitemap_fail(self):
        self.search.write_text(json.dumps({"docs": [{"location": "04-projects/bijux-canon/#knowledge"}]}))
        with self.assertRaisesRegex(ValueError, "search: numbered"):
            self.check()
        self.search.write_text(json.dumps({"docs": [{"location": "projects/bijux-canon/"}]}))
        self.sitemap.write_text('<urlset><url><loc>https://bijux.io/04-projects/bijux-canon/</loc></url></urlset>')
        with self.assertRaisesRegex(ValueError, "sitemap: numbered"):
            self.check()

    def test_numbered_canonical_and_undeclared_numbered_page_fail(self):
        self.page.write_text('<link rel="canonical" href="https://bijux.io/04-projects/bijux-canon/">')
        with self.assertRaisesRegex(ValueError, "canonical URL"):
            self.check()
        self.page.write_text('<link rel="canonical" href="https://bijux.io/projects/bijux-canon/">')
        undeclared = self.site / "06-internal/index.html"
        undeclared.parent.mkdir()
        undeclared.write_text('<link rel="canonical" href="https://bijux.io/projects/bijux-canon/">')
        with self.assertRaisesRegex(ValueError, "numbered public hub URL"):
            self.check()

    def test_missing_redirect_destination_fails(self):
        self.page.unlink()
        with self.assertRaisesRegex(ValueError, "missing compatibility"):
            self.check()


if __name__ == "__main__":
    unittest.main()
