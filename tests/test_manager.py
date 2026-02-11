import pytest
from unittest.mock import MagicMock, patch, mock_open
import json
import os
import sys

# Add scripts to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
import manager

@pytest.fixture
def mock_cloudinary(mocker):
    return mocker.patch('cloudinary.uploader.upload', return_value={'secure_url': 'http://res.cloudinary.com/demo/image/upload/v1/sample.jpg'})

@pytest.fixture
def mock_json_open(mocker):
    # Mock reading existing JSON data
    read_data = json.dumps([
        {"id": "existing_1", "title": {"en": "Old Item"}, "url": "http://old.url"}
    ])
    return mocker.patch('builtins.open', mock_open(read_data=read_data))

def test_upload_and_save_success(mock_cloudinary, mock_json_open, mocker):
    """Test successful upload and JSON update."""
    mocker.patch('os.path.exists', return_value=True)
    mocker.patch('manager.update_site_timestamp') # mock timestamp update
    
    # Mock the JSON_MAP to point to a fake file
    mocker.patch.dict(manager.JSON_MAP, {'painting': 'data/painting.json'})

    result = manager.upload_and_save(
        file_path='/path/to/image.jpg',
        title='My Masterpiece',
        category='painting',
        medium='Oil',
        description='A great painting'
    )

    # Verify upload was called
    mock_cloudinary.assert_called_once()
    
    # Verify result structure
    assert result['title']['en'] == 'My Masterpiece'
    assert result['url'] == 'http://res.cloudinary.com/demo/image/upload/v1/sample.jpg'
    assert result['medium']['en'] == 'Oil'
    assert 'id' in result

def test_upload_and_save_invalid_category():
    """Test that invalid category raises ValueError."""
    with pytest.raises(ValueError, match="Category 'invalid' is invalid"):
        manager.upload_and_save(
            file_path='/path/to/image.jpg',
            title='Fail',
            category='invalid'
        )

def test_save_from_url_success(mock_json_open, mocker):
    """Test saving an item from a direct URL."""
    mocker.patch('os.path.exists', return_value=True)
    mocker.patch('manager.update_site_timestamp')
    mocker.patch.dict(manager.JSON_MAP, {'music': 'data/music.json'})

    result = manager.save_from_url(
        url='http://archive.org/song.mp3',
        title='Retro Jam',
        category='music',
        genre='Synthwave'
    )

    assert result['url'] == 'http://archive.org/song.mp3'
    assert result['title']['en'] == 'Retro Jam'
    assert result['genre']['en'] == 'Synthwave'
