"""Keep source ordering prefixes out of public hub discovery and canonical URLs."""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


class Document(HTMLParser):
    def __init__(self, text: str):
        super().__init__()
        self.links: list[str] = []
        self.canonical: list[str] = []
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonical.append(attrs.get("href", ""))


def verify(site: Path, site_url: str, redirect_report: Path) -> dict:
    origin = urlsplit(site_url)
    if origin.scheme != "https" or not origin.netloc or origin.path != "/":
        raise ValueError("Public hub checks require its absolute HTTPS root URL")

    def clean(href: str, base: str, owner: str) -> str:
        absolute = urljoin(base, href)
        url = urlsplit(absolute)
        if url.netloc == origin.netloc and re.match(r"^/[0-9]{2,}-", unquote(url.path)):
            raise ValueError(f"{owner}: numbered public hub URL: {href}")
        return absolute

    report = json.loads(redirect_report.read_text())
    redirects = report.get("redirects", report)
    if redirects.get("schema") != 1 or redirects.get("policy") != "exact-declared-redirects" or redirects.get("site_url") != site_url:
        raise ValueError("Redirect report does not describe this public hub build")
    records = redirects["records"]
    compatibility = {record["path"]: record for record in records}
    if len(compatibility) != len(records):
        raise ValueError("Repeated compatibility redirect")
    for route, record in compatibility.items():
        target = clean(record["canonical"], site_url, route)
        destination = site / record["destination"]
        if not destination.is_file() or not (site / route).is_file():
            raise ValueError(f"{route}: missing compatibility redirect or destination")
        document = Document((site / route).read_text())
        if len(document.canonical) != 1 or urljoin(site_url + route, document.canonical[0]) != target:
            raise ValueError(f"{route}: redirect must canonicalize to its clean destination")

    pages = 0
    for file in sorted(site.rglob("*.html")):
        relative = file.relative_to(site).as_posix()
        route = relative.removesuffix("index.html") if relative.endswith("index.html") else relative
        base = urljoin(site_url, route)
        document = Document(file.read_text())
        if relative not in compatibility:
            clean(base, site_url, relative)
            if relative != "404.html" and document.canonical != [base]:
                raise ValueError(f"{relative}: canonical URL must match its clean public route")
            pages += 1
        for href in document.canonical + document.links:
            clean(href, base, relative)

    search = json.loads((site / "search/search_index.json").read_text())
    if not search["docs"]:
        raise ValueError("Empty public search index")
    for record in search["docs"]:
        clean(record["location"], site_url, "search")
    sitemap = ET.parse(site / "sitemap.xml")
    locations = [node.text for node in sitemap.iter() if node.tag.rsplit("}", 1)[-1] == "loc"]
    if not locations:
        raise ValueError("Empty public sitemap")
    for location in locations:
        clean(location, site_url, "sitemap")
    return {"passed": True, "pages": pages, "compatibility_redirects": len(records),
            "search_entries": len(search["docs"]), "sitemap_routes": len(locations)}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site-dir", type=Path, required=True)
    parser.add_argument("--site-url", required=True)
    parser.add_argument("--redirect-report", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    result = verify(args.site_dir, args.site_url, args.redirect_report)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + "\n")
    print(f"Public routes: {result['pages']} clean pages, {result['compatibility_redirects']} compatibility redirects; search and sitemap passed")


if __name__ == "__main__":
    main()
