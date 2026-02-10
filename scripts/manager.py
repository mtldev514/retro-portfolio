import os
import json
import argparse
import re
from datetime import datetime
import cloudinary
import cloudinary.uploader
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
    "art": "data/art.json",
    "photography": "data/photography.json",
    "sculpting": "data/sculpting.json",
    "projects": "data/projects.json",
    "music": "data/music.json",
    "video": "data/video.json"
}

def upload_and_save(file_path, title, category, medium=None, genre=None, description=None):
    """Core logic to upload file and update JSON database."""
    print(f"--- Processing: {title} ({category}) ---")
    
    # 1. Determine resource type for Cloudinary
    resource_type = "auto"
    if category == "music":
        resource_type = "video" # Cloudinary handles audio as video resource type
    elif category == "video":
        resource_type = "video"

    # 2. Upload to Cloudinary
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
        "date": datetime.now().strftime("%Y-%m-%d")
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
