import pytest
import os
import sys
import tempfile
import shutil

# Add the project root to the python path so imports work
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../scripts')))

from admin_api import app

@pytest.fixture
def client():
    """Flask test client"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def mock_fs(mocker):
    """Mocks common file system operations"""
    mocker.patch('os.makedirs')
    mocker.patch('os.path.exists', return_value=True)
    return mocker
