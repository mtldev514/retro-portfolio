from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys
import json

# Add scripts directory to path to import manager and config loader
sys.path.append(os.path.join(os.getcwd(), 'scripts'))
import manager
from config_loader import config

# Load configuration
config.load_all()

app = Flask(__name__)
CORS(app) # Broadest possible CORS for local dev

UPLOAD_FOLDER = 'temp_uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    title = request.form.get('title')
    category = request.form.get('category')
    medium = request.form.get('medium')
    genre = request.form.get('genre')
    description = request.form.get('description')
    created = request.form.get('created')

    if not title or not category:
        return jsonify({"error": "Title and Category are required"}), 400

    # Save file temporarily
    temp_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(temp_path)

    try:
        # Use manager logic to upload to Cloudinary and update JSON
        result = manager.upload_and_save(
            temp_path,
            title,
            category,
            medium=medium,
            genre=genre,
            description=description,
            created=created
        )
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Cleanup temp file
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.route('/api/upload-bulk', methods=['POST'])
def upload_bulk():
    """Handle bulk file uploads. Each file is sent with per-file metadata
    encoded as form fields: category_0, title_0, medium_0, etc."""
    results = []
    errors = []
    file_keys = [k for k in request.files if k.startswith('file_')]
    file_keys.sort(key=lambda k: int(k.split('_')[1]))

    for key in file_keys:
        idx = key.split('_')[1]
        file = request.files[key]
        title = request.form.get(f'title_{idx}', file.filename)
        category = request.form.get(f'category_{idx}')
        medium = request.form.get(f'medium_{idx}')
        genre = request.form.get(f'genre_{idx}')
        description = request.form.get(f'description_{idx}')
        created = request.form.get(f'created_{idx}')

        if not category:
            errors.append({"file": file.filename, "error": "Missing category"})
            continue

        temp_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(temp_path)

        try:
            result = manager.upload_and_save(
                temp_path, title, category,
                medium=medium, genre=genre,
                description=description, created=created
            )
            results.append({"file": file.filename, "success": True, "data": result})
        except Exception as e:
            errors.append({"file": file.filename, "error": str(e)})
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

    return jsonify({
        "success": len(errors) == 0,
        "uploaded": len(results),
        "failed": len(errors),
        "results": results,
        "errors": errors
    })

@app.route('/api/upload-url', methods=['POST'])
def upload_from_url():
    """Add a media entry using a direct URL (no Cloudinary upload).
    For audio hosted on Internet Archive, GitHub Releases, etc."""
    data = request.json
    url = data.get('url')
    title = data.get('title')
    category = data.get('category')
    genre = data.get('genre')
    medium = data.get('medium')
    description = data.get('description')
    created = data.get('created')

    if not url or not title or not category:
        return jsonify({"error": "URL, Title, and Category are required"}), 400

    try:
        result = manager.save_from_url(
            url, title, category,
            medium=medium,
            genre=genre,
            description=description,
            created=created
        )
        return jsonify({"success": True, "data": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/translations', methods=['GET'])
def get_translations():
    lang_dir = 'lang'
    translations = {}
    for filename in os.listdir(lang_dir):
        if filename.endswith('.json'):
            lang_code = filename.split('.')[0]
            with open(os.path.join(lang_dir, filename), 'r', encoding='utf-8') as f:
                translations[lang_code] = json.load(f)
    return jsonify(translations)

@app.route('/api/translations/update', methods=['POST'])
def update_translations():
    data = request.json
    lang_code = data.get('lang')
    key = data.get('key')
    value = data.get('value')

    if not lang_code or not key or not value:
        return jsonify({"error": "Lang, Key, and Value are required"}), 400

    file_path = f'lang/{lang_code}.json'
    if not os.path.exists(file_path):
        return jsonify({"error": f"Language file {lang_code}.json not found"}), 404

    with open(file_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)

    translations[key] = value

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(translations, f, indent=4, ensure_ascii=False)

    return jsonify({"success": True})
@app.route('/api/translations/missing', methods=['GET'])
def get_missing_translations():
    lang_dir = 'lang'
    with open(os.path.join(lang_dir, 'en.json'), 'r', encoding='utf-8') as f:
        en_keys = set(json.load(f).keys())
    
    missing = {}
    for filename in os.listdir(lang_dir):
        if filename.endswith('.json') and filename != 'en.json':
            lang_code = filename.split('.')[0]
            with open(os.path.join(lang_dir, filename), 'r', encoding='utf-8') as f:
                lang_keys = set(json.load(f).keys())
            
            diff = en_keys - lang_keys
            if diff:
                missing[lang_code] = list(diff)
    
    return jsonify(missing)

@app.route('/api/github/sync', methods=['POST'])
def sync_github():
    token = os.getenv('GITHUB_TOKEN')
    username = 'mtldev514'
    headers = {'Accept': 'application/vnd.github.v3+json'}
    if token:
        headers['Authorization'] = f'token {token}'
    
    try:
        url = f'https://api.github.com/users/{username}/repos?sort=updated&per_page=100'
        # If token is provided, we use the authenticated user's repos endpoint to get private ones
        if token:
            url = f'https://api.github.com/user/repos?sort=updated&per_page=100'
            
        import requests
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        repos = response.json()
        
        no_desc = {"en": "No description provided.", "fr": "Aucune description fournie.", "mx": "No se proporcionó descripción.", "ht": "Pa gen deskripsyon."}
        projects = []
        for repo in repos:
            # Filter if needed (repo must be owned by the user if we used /user/repos)
            if not token or repo['owner']['login'].lower() == username.lower():
                desc_text = repo['description']
                description = {"en": desc_text, "fr": desc_text, "mx": desc_text, "ht": desc_text} if desc_text else no_desc
                projects.append({
                    "title": repo['name'],
                    "description": description,
                    "url": repo['html_url'],
                    "visibility": "private" if repo['private'] else "public",
                    "date": repo['updated_at'].split('T')[0],
                    "category": "projects"
                })
        
        # Ensure data directory exists
        if not os.path.exists('data'):
            os.makedirs('data')
            
        with open('data/projects.json', 'w', encoding='utf-8') as f:
            json.dump(projects, f, indent=4)
            
        return jsonify({"success": True, "count": len(projects)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/content', methods=['GET'])
def get_all_content():
    content = {}
    for cat, path in manager.JSON_MAP.items():
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                try:
                    content[cat] = json.load(f)
                except json.JSONDecodeError:
                    content[cat] = []
        else:
            content[cat] = []
    return jsonify(content)

@app.route('/api/content/item', methods=['GET'])
def get_single_item():
    category = request.args.get('category')
    item_id = request.args.get('id')

    if not category or not item_id:
        return jsonify({"error": "Category and ID are required"}), 400

    json_path = manager.JSON_MAP.get(category)
    if not json_path or not os.path.exists(json_path):
        return jsonify({"error": f"Invalid category or file not found: {category}"}), 404

    with open(json_path, 'r', encoding='utf-8') as f:
        data_list = json.load(f)

    for item in data_list:
        if item.get('id') == item_id or (category == 'projects' and item.get('title') == item_id):
            return jsonify({"success": True, "item": item, "category": category})

    return jsonify({"error": "Item not found"}), 404

@app.route('/api/content/delete', methods=['POST'])
def delete_content():
    data = request.json
    category = data.get('category')
    item_id = data.get('id')
    
    if not category or not item_id:
        return jsonify({"error": "Category and ID are required"}), 400
        
    json_path = manager.JSON_MAP.get(category)
    if not json_path or not os.path.exists(json_path):
        return jsonify({"error": f"Invalid category or file not found: {category}"}), 404
        
    with open(json_path, 'r', encoding='utf-8') as f:
        data_list = json.load(f)
    
    # Filter out the item. For projects, we might match by title if id is missing
    original_len = len(data_list)
    if category == 'projects':
        data_list = [item for item in data_list if item.get('id') != item_id and item.get('title') != item_id]
    else:
        data_list = [item for item in data_list if item.get('id') != item_id]
        
    if len(data_list) == original_len:
        return jsonify({"error": "Item not found"}), 404
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data_list, f, indent=4, ensure_ascii=False)
        
    manager.update_site_timestamp()
    return jsonify({"success": True})

@app.route('/api/content/update', methods=['POST'])
def update_content():
    data = request.json
    category = data.get('category')
    item_id = data.get('id')
    updates = data.get('updates')
    
    if not category or not item_id or not updates:
        return jsonify({"error": "Category, ID, and Updates are required"}), 400
        
    json_path = manager.JSON_MAP.get(category)
    if not json_path or not os.path.exists(json_path):
        return jsonify({"error": f"Invalid category or file not found: {category}"}), 404
        
    with open(json_path, 'r', encoding='utf-8') as f:
        data_list = json.load(f)
        
    updated = False
    for item in data_list:
        # Match by ID or Title for projects
        if item.get('id') == item_id or (category == 'projects' and item.get('title') == item_id):
            item.update(updates)
            updated = True
            break
            
    if not updated:
        return jsonify({"error": "Item not found"}), 404
        
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data_list, f, indent=4, ensure_ascii=False)
        
    manager.update_site_timestamp()
    return jsonify({"success": True})

@app.route('/api/content/move-to-pile', methods=['POST'])
def move_to_pile():
    """Move a source item's image into a target item's gallery array,
    then delete the source item."""
    data = request.json
    category = data.get('category')
    source_id = data.get('sourceId')
    target_id = data.get('targetId')

    if not category or not source_id or not target_id:
        return jsonify({"error": "category, sourceId, and targetId are required"}), 400

    if source_id == target_id:
        return jsonify({"error": "Source and target cannot be the same item"}), 400

    json_path = manager.JSON_MAP.get(category)
    if not json_path or not os.path.exists(json_path):
        return jsonify({"error": f"Invalid category: {category}"}), 404

    with open(json_path, 'r', encoding='utf-8') as f:
        data_list = json.load(f)

    source_item = None
    target_item = None
    for item in data_list:
        if item.get('id') == source_id:
            source_item = item
        if item.get('id') == target_id:
            target_item = item

    if not source_item:
        return jsonify({"error": "Source item not found"}), 404
    if not target_item:
        return jsonify({"error": "Target item not found"}), 404

    source_url = source_item.get('url')
    if not source_url:
        return jsonify({"error": "Source item has no URL"}), 400

    # Append source URL (and its own gallery images) into target's gallery
    if 'gallery' not in target_item:
        target_item['gallery'] = []
    target_item['gallery'].append(source_url)
    # Also move any gallery images the source already had
    for img in source_item.get('gallery', []):
        target_item['gallery'].append(img)

    # Remove source item
    data_list = [item for item in data_list if item.get('id') != source_id]

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data_list, f, indent=4, ensure_ascii=False)

    manager.update_site_timestamp()
    return jsonify({
        "success": True,
        "targetGalleryCount": len(target_item.get('gallery', []))
    })

@app.route('/api/content/extract-from-pile', methods=['POST'])
def extract_from_pile():
    """Extract a single image from a pile's gallery and create a new standalone item."""
    data = request.json
    category = data.get('category')
    source_id = data.get('sourceId')
    image_url = data.get('imageUrl')
    image_index = data.get('imageIndex')
    custom_title = data.get('customTitle')
    custom_description = data.get('customDescription', '')

    if not category or not source_id or image_url is None or image_index is None:
        return jsonify({"error": "category, sourceId, imageUrl, and imageIndex are required"}), 400

    json_path = manager.JSON_MAP.get(category)
    if not json_path or not os.path.exists(json_path):
        return jsonify({"error": f"Invalid category: {category}"}), 404

    with open(json_path, 'r', encoding='utf-8') as f:
        data_list = json.load(f)

    source_item = None
    for item in data_list:
        if item.get('id') == source_id:
            source_item = item
            break

    if not source_item:
        return jsonify({"error": "Source item not found"}), 404

    if 'gallery' not in source_item or image_index >= len(source_item['gallery']):
        return jsonify({"error": "Invalid image index"}), 400

    # Remove the image from the gallery
    extracted_url = source_item['gallery'].pop(image_index)

    # Remove metadata for this image if it exists
    if 'galleryMetadata' in source_item and extracted_url in source_item['galleryMetadata']:
        del source_item['galleryMetadata'][extracted_url]

    # Create a new item with the extracted image
    import time
    new_id = f"{category}_extracted_{int(time.time())}"

    # Use custom title if provided, otherwise generate default
    if custom_title:
        new_title = custom_title
    else:
        # Get source title for naming
        source_title = source_item.get('title', {})
        if isinstance(source_title, dict):
            source_title_en = source_title.get('en', 'Untitled')
        else:
            source_title_en = source_title or 'Untitled'
        new_title = f"Photo {image_index + 1} from {source_title_en}"

    new_item = {
        "id": new_id,
        "title": {
            "en": new_title,
            "fr": new_title,
            "mx": new_title,
            "ht": new_title
        },
        "url": extracted_url,
        "date": source_item.get('date', time.strftime('%Y-%m-%d')),
        "created": time.strftime('%Y-%m-%d'),
        "description": {
            "en": custom_description,
            "fr": custom_description,
            "mx": custom_description,
            "ht": custom_description
        }
    }

    # Add the new item to the list
    data_list.append(new_item)

    # Save the updated list
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data_list, f, indent=4, ensure_ascii=False)

    manager.update_site_timestamp()
    return jsonify({
        "success": True,
        "newTitle": new_title,
        "newId": new_id
    })

@app.route('/api/content/add-to-pile', methods=['POST'])
def add_to_pile():
    """Move a single image from one pile's gallery to another pile's gallery."""
    data = request.json
    category = data.get('category')
    source_id = data.get('sourceId')
    target_id = data.get('targetId')
    image_url = data.get('imageUrl')
    image_index = data.get('imageIndex')

    if not category or not source_id or not target_id or image_url is None or image_index is None:
        return jsonify({"error": "category, sourceId, targetId, imageUrl, and imageIndex are required"}), 400

    json_path = manager.JSON_MAP.get(category)
    if not json_path or not os.path.exists(json_path):
        return jsonify({"error": f"Invalid category: {category}"}), 404

    with open(json_path, 'r', encoding='utf-8') as f:
        data_list = json.load(f)

    source_item = None
    target_item = None
    for item in data_list:
        if item.get('id') == source_id:
            source_item = item
        if item.get('id') == target_id:
            target_item = item

    if not source_item:
        return jsonify({"error": "Source item not found"}), 404
    if not target_item:
        return jsonify({"error": "Target item not found"}), 404

    if 'gallery' not in source_item or image_index >= len(source_item['gallery']):
        return jsonify({"error": "Invalid image index"}), 400

    # Remove the image from source gallery
    extracted_url = source_item['gallery'].pop(image_index)

    # Add to target gallery
    if 'gallery' not in target_item:
        target_item['gallery'] = []
    target_item['gallery'].append(extracted_url)

    # Save the updated list
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data_list, f, indent=4, ensure_ascii=False)

    manager.update_site_timestamp()
    return jsonify({
        "success": True,
        "targetGalleryCount": len(target_item.get('gallery', []))
    })

@app.route('/api/config', methods=['GET'])
def get_config():
    """Get application configuration"""
    return jsonify({
        "app": config.app_config,
        "languages": config.languages_config,
        "categories": config.categories_config
    })

if __name__ == '__main__':
    host = config.get_host()
    port = config.get_port()
    print(f"Admin API running on http://{host}:{port}")
    app.run(host=host, port=port, debug=True)
