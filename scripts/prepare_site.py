"""Stage the static site with content-versioned asset URLs for GitHub Pages."""

import hashlib
import re
import shutil
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "_site"
ASSET_ATTRIBUTES = re.compile(
    r'(?P<attribute>\b(?:src|href|data-feature-image))='
    r'(?P<quote>["\'])(?P<url>[^"\']+)(?P=quote)'
)
ASSET_EXTENSIONS = {
    ".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico",
    ".woff", ".woff2", ".pdf",
}


def version_asset(match):
    url = urlsplit(match["url"])
    if url.scheme or url.netloc or not url.path:
        return match[0]

    asset = (ROOT / url.path.lstrip("/")).resolve()
    if not asset.is_relative_to(ROOT) or not asset.is_file():
        return match[0]
    if asset.suffix.lower() not in ASSET_EXTENSIONS:
        return match[0]

    version = hashlib.sha256(asset.read_bytes()).hexdigest()[:12]
    query = [(key, value) for key, value in parse_qsl(url.query) if key != "v"]
    query.append(("v", version))
    versioned = urlunsplit(("", "", url.path, urlencode(query), url.fragment))
    return f'{match["attribute"]}={match["quote"]}{versioned}{match["quote"]}'


def main():
    OUTPUT.mkdir(exist_ok=True)
    for directory in ("assets", "images"):
        shutil.copytree(ROOT / directory, OUTPUT / directory, dirs_exist_ok=True)
    for pattern in ("*.html", "*.css", "*.js", "publications.json", "CNAME"):
        for source in ROOT.glob(pattern):
            destination = OUTPUT / source.name
            if source.suffix == ".html":
                html = source.read_text(encoding="utf-8")
                destination.write_text(
                    ASSET_ATTRIBUTES.sub(version_asset, html), encoding="utf-8"
                )
            else:
                shutil.copy2(source, destination)
    print(f"Staged versioned website in {OUTPUT}")


if __name__ == "__main__":
    main()
