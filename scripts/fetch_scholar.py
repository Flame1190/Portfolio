import os
import json
import time
from typing import List, Dict

import requests


SERPAPI_API_KEY_ENV = "SERPAPI_API_KEY"
AUTHOR_ID = "I4Zl2NIAAAAJ"
SERPAPI_ENDPOINT = "https://serpapi.com/search"
PAGE_SIZE = 20  # SerpAPI default for scholar_author


def fetch_all_publications(api_key: str, author_id: str) -> List[Dict]:
    """Fetch all publications for the given Google Scholar author via SerpAPI."""
    publications: List[Dict] = []
    start = 0

    while True:
        params = {
            "engine": "google_scholar_author",
            "author_id": author_id,
            "sort": "pubdate",
            "start": start,
            "api_key": api_key,
            "num": PAGE_SIZE,
            "hl": "en",
        }
        resp = requests.get(SERPAPI_ENDPOINT, params=params, timeout=30)
        resp.raise_for_status()
        data = resp.json()

        articles = data.get("articles", [])
        if not articles:
            break

        for art in articles:
            info = art.get("publication_info", {}) or {}
            cited = art.get("cited_by", {}) or {}
            cited_value = cited.get("value")

            publications.append(
                {
                    "title": art.get("title") or "",
                    "authors": info.get("authors") or "",
                    "venue": info.get("summary") or "",
                    "year": str(info.get("year")) if info.get("year") is not None else "",
                    "link": (art.get("link") or art.get("citation_id") or ""),
                    "citedBy": int(cited_value) if isinstance(cited_value, int) else 0,
                }
            )

        next_link = (data.get("serpapi_pagination") or {}).get("next")
        if not next_link:
            break

        start += PAGE_SIZE
        time.sleep(1.0)  # be polite with rate limits

    return publications


def main() -> None:
    # 1) Prefer environment variable
    api_key = os.getenv(SERPAPI_API_KEY_ENV)
    # 2) Fallback: try reading from scripts/serpapi_key.txt so it also works
    # when run from tools that don't inherit your shell env vars.
    if not api_key:
        key_path = os.path.join(os.path.dirname(__file__), "serpapi_key.txt")
        if os.path.exists(key_path):
            with open(key_path, "r", encoding="utf-8") as f:
                api_key = f.read().strip()

    if not api_key:
        raise SystemExit(
            f"SerpAPI key not found. Either set the {SERPAPI_API_KEY_ENV} "
            "environment variable, or create scripts/serpapi_key.txt containing "
            "only your SerpAPI key."
        )

    pubs = fetch_all_publications(api_key, AUTHOR_ID)
    if not pubs:
        raise SystemExit("No publications returned from SerpAPI; aborting.")

    # Sort newest year first, then title
    pubs.sort(key=lambda p: ((p.get("year") or ""), p.get("title") or ""), reverse=True)

    out_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "publications.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(pubs, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(pubs)} publications to {out_path}")


if __name__ == "__main__":
    main()

