import pytest
from unittest.mock import MagicMock
import json

def test_get_config(client):
    """Test getting application configuration."""
    response = client.get('/api/config')
    assert response.status_code == 200
    data = response.get_json()
    assert 'app' in data
    assert 'languages' in data
    assert 'categories' in data

def test_get_content(client, mocker):
    """Test getting all content."""
    # Mock manager.JSON_MAP and file existence
    mocker.patch('os.path.exists', return_value=True)
    mocker.patch('builtins.open', mocker.mock_open(read_data='[{"id": "test_1", "title": "Test"}]'))
    
    response = client.get('/api/content')
    assert response.status_code == 200
    data = response.get_json()
    # Since we mocked open, all categories should return the mocked list
    # Because the loop iterates over JSON_MAP keys
    assert isinstance(data, dict)

def test_upload_file_missing_parts(client):
    """Test upload endpoint with missing file."""
    response = client.post('/api/upload', data={})
    assert response.status_code == 400
    assert 'No file part' in response.get_json()['error']

def test_upload_file_success(client, mocker):
    """Test successful file upload."""
    # Mock manager.upload_and_save
    mock_upload = mocker.patch('manager.upload_and_save', return_value={'id': 'new_id', 'url': 'http://url'})
    
    data = {
        'file': (open(__file__, 'rb'), 'test_image.jpg'), # Send itself as dummy file
        'title': 'Test Upload',
        'category': 'painting'
    }
    
    response = client.post('/api/upload', data=data, content_type='multipart/form-data')
    
    assert response.status_code == 200
    assert response.get_json()['success'] is True
    assert response.get_json()['data']['id'] == 'new_id'
    mock_upload.assert_called_once()
