import hashlib
import json
import os
import re
import subprocess
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List, Optional, Set
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[2]
BASE_URL = "https://malcriadobcn.com/"
BASE_DOMAIN = "malcriadobcn.com"
USER_AGENT = "Mozilla/5.0"
HTTP_TIMEOUT = 30

URLS = {
    "robots": urllib.parse.urljoin(BASE_URL, "robots.txt"),
    "sitemap": urllib.parse.urljoin(BASE_URL, "sitemap_index.xml"),
    "pages_api": urllib.parse.urljoin(
        BASE_URL, "wp-json/wp/v2/pages?per_page=100"
    ),
    "media_api": urllib.parse.urljoin(
        BASE_URL,
        "wp-json/wp/v2/media?per_page=100&_fields=id,source_url,mime_type,media_details,alt_text,title",
    ),
}

WORK_DIR = ROOT / "tmp" / "phase0"
ASSET_ROOT = ROOT / "public" / "assets" / "source"
OUTPUTS = {
    "crawl": WORK_DIR / "crawl-data.json",
    "assets": WORK_DIR / "asset-data.json",
    "summary": WORK_DIR / "summary.json",
    "manifest": ROOT / "src" / "content" / "assets" / "asset-manifest.json",
}

MD_DIRS = [
    ROOT / "docs" / "audit",
    ROOT / "docs" / "content",
    ROOT / "docs" / "assets",
    ROOT / "docs" / "seo",
    ROOT / "docs" / "adr",
    ROOT / "src" / "content" / "assets",
]

ALLOWED_SOCIAL_HOSTS = {
    "instagram.com",
    "www.instagram.com",
    "wa.me",
    "api.whatsapp.com",
    "facebook.com",
    "www.facebook.com",
    "tiktok.com",
    "www.tiktok.com",
}

DOC_EXTENSIONS = {".pdf", ".doc", ".docx"}
ASSET_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ".gif",
    ".mp4",
    ".mov",
    ".webm",
    ".pdf",
}


def ensure_dirs() -> None:
    for directory in MD_DIRS + [WORK_DIR]:
        directory.mkdir(parents=True, exist_ok=True)
    for name in [
        "brand",
        "food",
        "venue",
        "people",
        "video",
        "documents",
        "miscellaneous",
    ]:
        (ASSET_ROOT / name).mkdir(parents=True, exist_ok=True)


def fetch(url: str) -> Dict:
    try:
        header_file = WORK_DIR / "curl-headers.txt"
        body_file = WORK_DIR / "curl-body.bin"
        if header_file.exists():
            header_file.unlink()
        if body_file.exists():
            body_file.unlink()
        command = [
            "curl.exe",
            "-L",
            "--max-redirs",
            "5",
            "-A",
            USER_AGENT,
            "-H",
            "Accept: */*",
            "-D",
            str(header_file),
            "-o",
            str(body_file),
            "-sS",
            url,
        ]
        completed = subprocess.run(
            command,
            check=False,
            capture_output=True,
            text=True,
            timeout=HTTP_TIMEOUT + 10,
        )
        content = body_file.read_bytes() if body_file.exists() else b""
        header_text = header_file.read_text(encoding="utf-8", errors="ignore") if header_file.exists() else ""
        status_matches = re.findall(r"^HTTP/\S+\s+(\d+)", header_text, flags=re.M)
        status = int(status_matches[-1]) if status_matches else None
        final_url_matches = re.findall(r"^location:\s*(.+)$", header_text, flags=re.I | re.M)
        final_url = final_url_matches[-1].strip() if final_url_matches else url
        if status in {200, 301, 302, 307, 308, 403, 404} or completed.returncode == 0:
            headers = {}
            for line in header_text.splitlines():
                if ":" in line and not line.startswith("HTTP/"):
                    key, value = line.split(":", 1)
                    headers[key.strip()] = value.strip()
            return {
                "url": url,
                "final_url": final_url if final_url.startswith("http") else url,
                "status": status,
                "headers": headers,
                "content": content,
                "error": completed.stderr.strip() or None,
            }
    except Exception as error:
        curl_error = str(error)
    try:
        request = urllib.request.Request(
            url, headers={"User-Agent": USER_AGENT, "Accept": "*/*"}
        )
        with urllib.request.urlopen(request, timeout=HTTP_TIMEOUT) as response:
            content = response.read()
            return {
                "url": url,
                "final_url": response.geturl(),
                "status": response.getcode(),
                "headers": dict(response.headers.items()),
                "content": content,
            }
    except urllib.error.HTTPError as error:
        return {
            "url": url,
            "final_url": error.geturl(),
            "status": error.code,
            "headers": dict(error.headers.items()),
            "content": error.read(),
            "error": str(error),
        }
    except Exception as error:
        return {
            "url": url,
            "final_url": url,
            "status": None,
            "headers": {},
            "content": b"",
            "error": f"{locals().get('curl_error', '')} {str(error)}".strip(),
        }


def fetch_json(url: str):
    try:
        payload = fetch(url)
        return json.loads(payload["content"].decode("utf-8", errors="ignore"))
    except Exception:
        return []


def strip_html(value: str) -> str:
    text = re.sub(r"<script[\s\S]*?</script>", " ", value, flags=re.I)
    text = re.sub(r"<style[\s\S]*?</style>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text)
    return urllib.parse.unquote(text).strip()


def normalize_url(url: str, current_url: str) -> str:
    absolute = urllib.parse.urljoin(current_url, url)
    parsed = urllib.parse.urlparse(absolute)
    clean = parsed._replace(fragment="").geturl()
    return clean


def is_internal(url: str) -> bool:
    parsed = urllib.parse.urlparse(url)
    return parsed.netloc in {"", BASE_DOMAIN, f"www.{BASE_DOMAIN}"}


def looks_like_asset(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.lower()
    return any(path.endswith(ext) for ext in ASSET_EXTENSIONS)


def looks_like_document(url: str) -> bool:
    path = urllib.parse.urlparse(url).path.lower()
    return any(path.endswith(ext) for ext in DOC_EXTENSIONS)


def is_downloadable_site_asset(url: str) -> bool:
    parsed = urllib.parse.urlparse(url)
    path = parsed.path.lower()
    if parsed.netloc not in {BASE_DOMAIN, f"www.{BASE_DOMAIN}"}:
        return False
    if "/wp-content/uploads/" in path:
        return True
    if path.endswith(("favicon.ico",)):
        return True
    return False


class PageParser(HTMLParser):
    def __init__(self, current_url: str):
        super().__init__(convert_charrefs=True)
        self.current_url = current_url
        self.lang = None
        self.title = ""
        self.title_capture = False
        self.meta_description = None
        self.canonical = None
        self.og = {}
        self.favicons = []
        self.headings = []
        self.current_heading = None
        self.heading_text = []
        self.links = []
        self.images = []
        self.videos = []
        self.documents = []
        self.forms = []
        self.json_ld = []
        self.current_json_ld = []
        self.capture_json_ld = False
        self.text_chunks = []

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if tag == "html":
            self.lang = attr.get("lang")
        elif tag == "title":
            self.title_capture = True
        elif tag == "meta":
            name = attr.get("name", "").lower()
            prop = attr.get("property", "").lower()
            content = attr.get("content")
            if name == "description":
                self.meta_description = content
            if prop.startswith("og:") and content:
                self.og[prop] = content
        elif tag == "link":
            rel = attr.get("rel", "").lower()
            href = attr.get("href")
            if href:
                href = normalize_url(href, self.current_url)
            if rel == "canonical" and href:
                self.canonical = href
            if "icon" in rel and href:
                self.favicons.append(href)
        elif tag in {"h1", "h2", "h3"}:
            self.current_heading = tag
            self.heading_text = []
        elif tag == "a":
            href = attr.get("href")
            if href:
                url = normalize_url(href, self.current_url)
                entry = {
                    "url": url,
                    "text": (attr.get("aria-label") or "").strip(),
                    "classes": attr.get("class", ""),
                }
                self.links.append(entry)
                if looks_like_document(url):
                    self.documents.append(url)
        elif tag == "img":
            src = attr.get("src") or attr.get("data-src")
            if src:
                self.images.append(
                    {
                        "url": normalize_url(src, self.current_url),
                        "alt": attr.get("alt", "").strip(),
                    }
                )
        elif tag == "source":
            src = attr.get("src") or attr.get("srcset")
            if src:
                first_src = src.split(",")[0].strip().split(" ")[0]
                if looks_like_asset(first_src):
                    self.videos.append(normalize_url(first_src, self.current_url))
        elif tag == "video":
            src = attr.get("src")
            if src:
                self.videos.append(normalize_url(src, self.current_url))
        elif tag == "form":
            self.forms.append(
                {
                    "action": normalize_url(attr.get("action", self.current_url), self.current_url),
                    "method": attr.get("method", "get").lower(),
                }
            )
        elif tag == "script" and attr.get("type", "").lower() == "application/ld+json":
            self.capture_json_ld = True
            self.current_json_ld = []

    def handle_endtag(self, tag):
        if tag == "title":
            self.title_capture = False
        elif tag in {"h1", "h2", "h3"} and self.current_heading == tag:
            text = " ".join(self.heading_text).strip()
            if text:
                self.headings.append({"level": tag, "text": text})
            self.current_heading = None
            self.heading_text = []
        elif tag == "script" and self.capture_json_ld:
            raw = "".join(self.current_json_ld).strip()
            if raw:
                self.json_ld.append(raw)
            self.capture_json_ld = False
            self.current_json_ld = []

    def handle_data(self, data):
        stripped = data.strip()
        if not stripped:
            return
        self.text_chunks.append(stripped)
        if self.title_capture:
            self.title += stripped
        if self.current_heading:
            self.heading_text.append(stripped)
        if self.capture_json_ld:
            self.current_json_ld.append(data)


def parse_sitemap(xml_bytes: bytes) -> List[str]:
    try:
        root = ElementTree.fromstring(xml_bytes)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = []
        for loc in root.findall(".//sm:loc", ns):
            if loc.text:
                urls.append(loc.text.strip())
        return urls
    except ElementTree.ParseError:
        decoded = xml_bytes.decode("utf-8", errors="ignore")
        return re.findall(r"<loc>(.*?)</loc>", decoded, flags=re.I)


def parse_wp_pages() -> List[Dict]:
    return fetch_json(URLS["pages_api"])


def parse_wp_media() -> List[Dict]:
    return fetch_json(URLS["media_api"])


def extract_contacts(text: str) -> Dict[str, List[str]]:
    phones = sorted(set(re.findall(r"(?:\+34\s?)?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}[\s.-]?\d{2}", text)))
    emails = sorted(set(re.findall(r"[\w.\-+]+@[\w\-.]+\.\w+", text)))
    whatsapp = []
    hours = []
    for match in re.findall(r"(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo)[^.;\n]{0,120}", text, flags=re.I):
        hours.append(match)
    return {"phones": phones, "emails": emails, "hours_mentions": sorted(set(hours)), "whatsapp": whatsapp}


def category_for_asset(url: str, page_url: str) -> str:
    lower = url.lower()
    filename = Path(urllib.parse.urlparse(url).path).name.lower()
    if filename.endswith(".mp4") or "/video/" in lower:
        return "video"
    if filename.endswith(".pdf"):
        return "documents"
    if "logo" in filename or "favicon" in filename or "cropped-" in filename:
        return "brand"
    if any(token in filename for token in ["chef", "hector", "persona", "team"]):
        return "people"
    if any(token in filename for token in ["local", "terraza", "playa", "venue", "restaurant"]):
        return "venue"
    if any(
        token in filename
        for token in [
            "tartar",
            "ensaladilla",
            "burrata",
            "nachos",
            "sushi",
            "gambas",
            "coronitas",
            "mojito",
            "margarita",
            "pulpo",
            "arepas",
            "mollejas",
            "pizza",
            "cake",
            "chich",
            "tacos",
        ]
    ):
        return "food"
    if "menu" in page_url or "carta" in page_url:
        return "food"
    return "miscellaneous"


def normalize_upload_original(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    path = parsed.path
    if "/wp-content/uploads/" not in path:
        return url
    new_path = re.sub(r"-\d+x\d+(?=\.[A-Za-z0-9]+$)", "", path)
    new_path = re.sub(r"-scaled(?=\.[A-Za-z0-9]+$)", "", new_path)
    return urllib.parse.urlunparse(parsed._replace(path=new_path))


def canonical_page_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    path = parsed.path or "/"
    if path != "/" and path.endswith("/"):
        path = path[:-1]
    return urllib.parse.urlunparse(parsed._replace(path=path, params="", query="", fragment=""))


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def get_dimensions_from_media_details(media_record: Optional[Dict]) -> Optional[Dict]:
    if not media_record:
        return None
    details = media_record.get("media_details") or {}
    width = details.get("width")
    height = details.get("height")
    file_size = details.get("filesize")
    return {"width": width, "height": height, "filesize": file_size}


def download_asset(url: str, target_dir: Path) -> Optional[Path]:
    response = fetch(url)
    if response["status"] != 200 or not response["content"]:
        return None
    filename = Path(urllib.parse.urlparse(response["final_url"]).path).name
    target = target_dir / filename
    if not target.exists():
        target.write_bytes(response["content"])
    return target


def build_page_record(url: str) -> Dict:
    response = fetch(url)
    parser = PageParser(response["final_url"])
    content_text = ""
    decoded = ""
    if response["content"]:
        decoded = response["content"].decode("utf-8", errors="ignore")
        parser.feed(decoded)
        content_text = strip_html(decoded)
    contacts = extract_contacts(content_text)
    internal_links = []
    social_links = []
    whatsapp_links = []
    for link in parser.links:
        target = link["url"]
        host = urllib.parse.urlparse(target).netloc.lower()
        if is_internal(target):
            internal_links.append(target)
        elif host in ALLOWED_SOCIAL_HOSTS:
            social_links.append(target)
        if "wa.me" in target or "whatsapp" in target:
            whatsapp_links.append(target)
    return {
        "url": url,
        "final_url": response["final_url"],
        "status": response["status"],
        "redirected": response["final_url"] != url,
        "headers": response["headers"],
        "title": parser.title.strip() or None,
        "meta_description": parser.meta_description,
        "canonical": parser.canonical,
        "lang": parser.lang,
        "h1": next((h["text"] for h in parser.headings if h["level"] == "h1"), None),
        "headings": parser.headings,
        "internal_links": sorted(set(internal_links)),
        "images": parser.images,
        "videos": sorted(set(parser.videos)),
        "documents": sorted(set(parser.documents)),
        "forms": parser.forms,
        "social_links": sorted(set(social_links)),
        "whatsapp_links": sorted(set(whatsapp_links)),
        "phones": contacts["phones"],
        "emails": contacts["emails"],
        "hours_mentions": contacts["hours_mentions"],
        "address_mentions": sorted(
            set(
                re.findall(
                    r"Passeig Mar[ií]tim,\s*14,\s*08397\s*Pineda de Mar,\s*Barcelona",
                    content_text,
                    flags=re.I,
                )
            )
        ),
        "json_ld_count": len(parser.json_ld),
        "og": parser.og,
        "favicons": sorted(set(parser.favicons)),
        "text_excerpt": content_text[:1000],
        "contains_reservation_cta": any(
            token in content_text.lower()
            for token in ["reserva", "reservar", "book", "whatsapp"]
        ),
        "contains_menu_terms": any(
            token in content_text.lower()
            for token in ["pizza", "sushi", "cocktail", "coctel", "postre", "vermut"]
        ),
        "raw_error": response.get("error"),
    }


def collect_urls() -> Dict[str, List[str]]:
    robots = fetch(URLS["robots"])
    sitemap_index = fetch(URLS["sitemap"])
    sitemap_urls = parse_sitemap(sitemap_index["content"])
    page_urls: Set[str] = set()
    for sitemap_url in sitemap_urls:
        data = fetch(sitemap_url)
        for url in parse_sitemap(data["content"]):
            page_urls.add(canonical_page_url(url))
    page_urls.add(canonical_page_url(BASE_URL))
    return {
        "robots_txt": robots["content"].decode("utf-8", errors="ignore"),
        "sitemap_index": sitemap_urls,
        "page_urls": sorted(page_urls),
    }


def find_possible_duplicate_groups(assets: List[Dict]) -> List[List[str]]:
    groups = defaultdict(list)
    for asset in assets:
        key = (
            asset.get("sha256"),
            asset.get("mime_type"),
            asset.get("dimensions", {}).get("width"),
            asset.get("dimensions", {}).get("height"),
        )
        groups[key].append(asset["id"])
    return [ids for ids in groups.values() if len(ids) > 1]


def main() -> None:
    ensure_dirs()
    url_data = collect_urls()
    page_records = [build_page_record(url) for url in url_data["page_urls"]]
    wp_pages = parse_wp_pages()
    wp_media = parse_wp_media()
    media_by_url = {item["source_url"]: item for item in wp_media}
    media_by_name = {Path(item["source_url"]).name: item for item in wp_media}

    discovered_asset_refs = []
    page_asset_map = defaultdict(set)
    for page in page_records:
        for image in page["images"]:
            page_asset_map[page["final_url"]].add(image["url"])
            discovered_asset_refs.append((page["final_url"], image["url"], image.get("alt", "")))
        for video in page["videos"]:
            page_asset_map[page["final_url"]].add(video)
            discovered_asset_refs.append((page["final_url"], video, ""))
        for icon in page["favicons"]:
            page_asset_map[page["final_url"]].add(icon)
            discovered_asset_refs.append((page["final_url"], icon, ""))
        for document in page["documents"]:
            page_asset_map[page["final_url"]].add(document)
            discovered_asset_refs.append((page["final_url"], document, ""))

    for wp_page in wp_pages:
        rendered = (wp_page.get("content") or {}).get("rendered", "")
        for match in sorted(set(re.findall(r"copy_[A-Z0-9\-]+\.mp4", rendered, flags=re.I))):
            media_record = media_by_name.get(match)
            if media_record:
                url = media_record["source_url"]
                page_url = canonical_page_url(wp_page["link"])
                page_asset_map[page_url].add(url)
                discovered_asset_refs.append((page_url, url, ""))

    unique_assets = {}
    for page_url, raw_url, alt_text in discovered_asset_refs:
        if not is_downloadable_site_asset(raw_url):
            continue
        normalized = normalize_upload_original(raw_url)
        unique_assets.setdefault(
            normalized,
            {
                "source_url": raw_url,
                "normalized_url": normalized,
                "pages": set(),
                "alt_texts": set(),
            },
        )
        unique_assets[normalized]["pages"].add(page_url)
        if alt_text:
            unique_assets[normalized]["alt_texts"].add(alt_text)

    asset_records = []
    for index, asset_info in enumerate(sorted(unique_assets.values(), key=lambda item: item["normalized_url"]), start=1):
        url = asset_info["normalized_url"]
        media_record = media_by_url.get(url) or media_by_url.get(asset_info["source_url"])
        category = category_for_asset(url, next(iter(asset_info["pages"])))
        target_dir = ASSET_ROOT / category
        downloaded = download_asset(url, target_dir)
        if not downloaded and url != asset_info["source_url"]:
            downloaded = download_asset(asset_info["source_url"], target_dir)
            url = asset_info["source_url"]
            media_record = media_by_url.get(url) or media_record
        if not downloaded:
            continue
        sha = sha256_file(downloaded)
        mime_type = (
            media_record.get("mime_type")
            if media_record
            else mimetypes.guess_type(downloaded.name)[0] or "application/octet-stream"
        )
        dimensions = get_dimensions_from_media_details(media_record) or {}
        local_rel = downloaded.relative_to(ROOT).as_posix()
        filename = downloaded.name
        asset_records.append(
            {
                "id": f"asset-{index:03d}",
                "original_name": filename,
                "local_path": local_rel,
                "source_url": url,
                "page_urls": sorted(asset_info["pages"]),
                "mime_type": mime_type,
                "extension": downloaded.suffix.lower(),
                "size_bytes": downloaded.stat().st_size,
                "dimensions": {
                    "width": dimensions.get("width"),
                    "height": dimensions.get("height"),
                },
                "duration_seconds": None,
                "sha256": sha,
                "proposed_role": category,
                "category": category,
                "orientation": (
                    "landscape"
                    if dimensions.get("width") and dimensions.get("height") and dimensions["width"] > dimensions["height"]
                    else "portrait"
                    if dimensions.get("width") and dimensions.get("height") and dimensions["width"] < dimensions["height"]
                    else "square"
                    if dimensions.get("width") and dimensions.get("height") and dimensions["width"] == dimensions["height"]
                    else None
                ),
                "current_alt_text": next(iter(asset_info["alt_texts"]), ""),
                "provisional_alt_text": "",
                "rights_status": (
                    "OWNED_ASSUMED_FROM_CURRENT_SITE"
                    if category in {"brand", "food", "venue", "people", "video", "documents"}
                    else "REQUIRES_CONFIRMATION"
                ),
                "needs_optimization": True,
                "duplicate_of": None,
                "quality_notes": "",
                "recommended_focal_point": None,
            }
        )

    sha_groups = defaultdict(list)
    for asset in asset_records:
        sha_groups[asset["sha256"]].append(asset["id"])
    for asset in asset_records:
        siblings = [candidate for candidate in sha_groups[asset["sha256"]] if candidate != asset["id"]]
        if siblings:
            asset["duplicate_of"] = siblings[0]

    duplicate_groups = find_possible_duplicate_groups(asset_records)

    summary = {
        "generated_at": __import__("datetime").datetime.now(__import__("datetime").UTC).isoformat(),
        "page_count": len(page_records),
        "asset_count": len(asset_records),
        "page_urls": [page["final_url"] for page in page_records],
        "duplicate_groups": duplicate_groups,
        "wp_page_slugs": [page["slug"] for page in wp_pages],
    }

    OUTPUTS["crawl"].write_text(
        json.dumps(
            {
                "url_data": url_data,
                "wp_pages": wp_pages,
                "pages": page_records,
            },
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    OUTPUTS["assets"].write_text(
        json.dumps(asset_records, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    OUTPUTS["summary"].write_text(
        json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    OUTPUTS["manifest"].write_text(
        json.dumps({"assets": asset_records}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(
        json.dumps(
            {
                "page_count": len(page_records),
                "asset_count": len(asset_records),
                "outputs": {key: str(value) for key, value in OUTPUTS.items()},
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    import mimetypes

    main()
