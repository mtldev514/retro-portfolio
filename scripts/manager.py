import os
import json
import argparse
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

def add_item(file_path, title, category, medium=None):
    """Uploads image to Cloudinary and updates the local JSON database."""
    print(f"--- Adding new item: {title} ---")
    
    # 1. Upload to Cloudinary
    print(f"Uploading {file_path} to Cloudinary...")
    upload_result = cloudinary.uploader.upload(file_path, folder=f"portfolio/{category}")
    image_url = upload_result.get("secure_url")
    print(f"Success! Image URL: {image_url}")

    # 2. Determine JSON file
    json_map = {
        "art": "data/art.json",
        "photography": "data/photography.json",
        "sculpting": "data/sculpting.json",
        "projects": "data/projects.json"
    }
    
    json_path = json_map.get(category)
    if not json_path:
        print(f"Error: Category '{category}' not found.")
        return

    # 3. Load existing data
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = []

    # 4. Create new entry
    new_entry = {
        "id": f"{category}_{int(datetime.now().timestamp())}",
        "title": title,
        "url": image_url,
        "date": datetime.now().strftime("%Y-%m-%d")
    }
    if medium:
        new_entry["medium"] = medium

    data.append(new_entry)

    # 5. Save back to JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Updated {json_path}")

    # 6. Update "Last Updated" globally (optional but nice)
    update_site_timestamp()

def update_site_timestamp():
    """Updates the '10 Feb 2026' string in all HTML files to the current date."""
    now = datetime.now().strftime("%d %b %Y")
    print(f"Updating site-wide 'Last Updated' to {now}...")
    
    html_files = ["index.html", "gallery.html", "photography.html", "sculpting.html", "projects.html"]
    for file_name in html_files:
        if os.path.exists(file_name):
            with open(file_name, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Simple replacement logic (assuming the format is consistent)
            # This is a bit naive but works for our retro site
            import re
            new_content = re.sub(r'Last Updated:</span> \d{1,2} \w{3} \d{4}', f'Last Updated:</span> {now}', content)
            
            with open(file_name, "w", encoding="utf-8") as f:
                f.write(new_content)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Alex's Portfolio Content Manager")
    parser.add_argument("--file", help="Path to the image/media file")
    parser.add_argument("--title", help="Title of the work")
    parser.add_argument("--cat", choices=["art", "photography", "sculpting", "projects"], help="Category")
    parser.add_argument("--medium", help="Medium (optional, e.g., 'Oil', 'Clay')")

    args = parser.parse_args()

    if args.file and args.title and args.cat:
        add_item(args.file, args.title, args.cat, args.medium)
    else:
        print("Usage: python scripts/manager.py --file path/to/art.jpg --title 'My Title' --cat art [--medium 'Text']")
