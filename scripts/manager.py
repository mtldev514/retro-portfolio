import os
import json
import argparse
import re
import time
import mimetypes
from datetime import datetime
import cloudinary
import cloudinary.uploader
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Cloudinary Configuration
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

JSON_MAP = {
    "painting": "data/painting.json",
    "drawing": "data/drawing.json",
    "photography": "data/photography.json",
    "sculpting": "data/sculpting.json",
    "projects": "data/projects.json",
    "music": "data/music.json",
    "video": "data/video.json"
}

# GitHub Releases Configuration (for audio/video that Cloudinary free plan rejects)
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_REPO = "mtldev514/retro-portfolio"
RELEASE_TAG = "media"
GITHUB_UPLOAD_CATEGORIES = {"music"}

MEDIA_CONTENT_TYPES = {
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".flac": "audio/flac",
    ".m4a": "audio/mp4",
    ".aac": "audio/aac",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
}


def get_or_create_release():
    """Get existing 'media' release or create one for hosting audio/video assets."""
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
    }
    # Try to get existing release by tag
    r = requests.get(
        f"https://api.github.com/repos/{GITHUB_REPO}/releases/tags/{RELEASE_TAG}",
        headers=headers,
    )
    if r.status_code == 200:
        return r.json()

    # Create a new release
    print(f"Creating GitHub Release '{RELEASE_TAG}'...")
    r = requests.post(
        f"https://api.github.com/repos/{GITHUB_REPO}/releases",
        headers=headers,
        json={
            "tag_name": RELEASE_TAG,
            "name": "Media Assets",
            "body": "Audio and video files for the portfolio.",
            "draft": False,
            "prerelease": False,
        },
    )
    r.raise_for_status()
    return r.json()


def upload_to_github_release(file_path, filename):
    """Upload a file as an asset to the 'media' GitHub Release.
    Returns the browser_download_url for the uploaded asset."""
    release = get_or_create_release()
    upload_url = release["upload_url"].replace("{?name,label}", "")

    # Determine content type from extension
    ext = os.path.splitext(filename)[1].lower()
    content_type = MEDIA_CONTENT_TYPES.get(ext)
    if not content_type:
        content_type, _ = mimetypes.guess_type(filename)
        if not content_type:
            content_type = "application/octet-stream"

    # Prepend timestamp to avoid duplicate filename collisions
    unique_filename = f"{int(time.time())}_{filename}"

    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Content-Type": content_type,
        "Accept": "application/vnd.github.v3+json",
    }

    print(f"Uploading asset '{unique_filename}' ({content_type})...")
    with open(file_path, "rb") as f:
        r = requests.post(
            f"{upload_url}?name={unique_filename}",
            headers=headers,
            data=f,
        )
    r.raise_for_status()
    return r.json()["browser_download_url"]

def upload_and_save(file_path, title, category, medium=None, genre=None, description=None, created=None):
    """Core logic to upload file and update JSON database."""
    print(f"--- Processing: {title} ({category}) ---")
    
    # 1. Upload to the appropriate service
    if category in GITHUB_UPLOAD_CATEGORIES and GITHUB_TOKEN:
        # Audio: use GitHub Releases (Cloudinary free plan rejects audio)
        print(f"Uploading {file_path} to GitHub Releases...")
        original_filename = os.path.basename(file_path)
        media_url = upload_to_github_release(file_path, original_filename)
        print(f"Success! URL: {media_url}")
    else:
        # Images/other: use Cloudinary
        resource_type = "auto"
        if category == "video":
            resource_type = "video"
        print(f"Uploading {file_path} to Cloudinary...")
        upload_result = cloudinary.uploader.upload(
            file_path,
            folder=f"portfolio/{category}",
            resource_type=resource_type
        )
        media_url = upload_result.get("secure_url")
        print(f"Success! URL: {media_url}")

    # 3. Determine JSON file
    json_path = JSON_MAP.get(category)
    if not json_path:
        raise ValueError(f"Category '{category}' is invalid.")

    # 4. Load existing data
    if os.path.exists(json_path):
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
                data = json.loads(content) if content else []
        except json.JSONDecodeError:
            data = []
    else:
        data = []

    # 5. Create new entry with multilingual fields
    def make_multilingual(value):
        """Wrap a single-language value as a multilingual object."""
        if not value:
            return None
        return {"en": value, "fr": value, "mx": value, "ht": value}

    new_entry = {
        "id": f"{category}_{int(datetime.now().timestamp())}",
        "title": make_multilingual(title),
        "url": media_url,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "created": created if created else datetime.now().strftime("%Y-%m-%d")
    }
    if medium:
        new_entry["medium"] = make_multilingual(medium)
    if genre:
        new_entry["genre"] = make_multilingual(genre)
    if description:
        new_entry["description"] = make_multilingual(description)

    data.append(new_entry)

    # 6. Save back to JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Updated {json_path}")

    # 7. Update "Last Updated" globally
    update_site_timestamp()
    return new_entry

def update_site_timestamp():
    """Updates the 'Last Updated' string in all HTML files."""
    now = datetime.now().strftime("%d %b %Y")
    html_files = ["index.html"]
    for file_name in html_files:
        if os.path.exists(file_name):
            with open(file_name, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = re.sub(r'Last Updated:</span> \d{1,2} \w{3} \d{4}', f'Last Updated:</span> {now}', content)
            
            with open(file_name, "w", encoding="utf-8") as f:
                f.write(new_content)

def save_from_url(url, title, category, medium=None, genre=None, description=None, created=None):
    """Save a media entry using a direct URL (no Cloudinary upload).
    Used for audio files hosted on Internet Archive, GitHub Releases, etc."""
    print(f"--- Saving from URL: {title} ({category}) ---")

    json_path = JSON_MAP.get(category)
    if not json_path:
        raise ValueError(f"Category '{category}' is invalid.")

    # Load existing data
    if os.path.exists(json_path):
        try:
            with open(json_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
                data = json.loads(content) if content else []
        except json.JSONDecodeError:
            data = []
    else:
        data = []

    def make_multilingual(value):
        if not value:
            return None
        return {"en": value, "fr": value, "mx": value, "ht": value}

    new_entry = {
        "id": f"{category}_{int(datetime.now().timestamp())}",
        "title": make_multilingual(title),
        "url": url,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "created": created if created else datetime.now().strftime("%Y-%m-%d")
    }
    if medium:
        new_entry["medium"] = make_multilingual(medium)
    if genre:
        new_entry["genre"] = make_multilingual(genre)
    if description:
        new_entry["description"] = make_multilingual(description)

    data.append(new_entry)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Updated {json_path}")

    update_site_timestamp()
    return new_entry

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Alex's Portfolio Content Manager")
    parser.add_argument("--file", required=True, help="Path to the media file")
    parser.add_argument("--title", required=True, help="Title of the work")
    parser.add_argument("--cat", required=True, choices=list(JSON_MAP.keys()), help="Category")
    parser.add_argument("--medium", help="Medium (for art/sculpting)")
    parser.add_argument("--genre", help="Genre (for music/video)")
    parser.add_argument("--description", help="Description of the work")

    args = parser.parse_args()
    try:
        upload_and_save(args.file, args.title, args.cat, args.medium, args.genre, args.description)
    except Exception as e:
        print(f"Error: {e}")
