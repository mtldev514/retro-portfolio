import pytest
import subprocess
import sys
import os

def test_cli_help():
    """Test that CLI runs and shows help."""
    result = subprocess.run(
        [sys.executable, 'cli.py', '--help'],
        capture_output=True,
        text=True,
        cwd=os.path.join(os.path.dirname(__file__), '..')
    )
    assert result.returncode == 0
    assert 'usage:' in result.stdout

def test_cli_invalid_arg():
    """Test that CLI fails with invalid argument."""
    result = subprocess.run(
        [sys.executable, 'cli.py', '--invalid'],
        capture_output=True,
        text=True,
        cwd=os.path.join(os.path.dirname(__file__), '..')
    )
    assert result.returncode != 0
