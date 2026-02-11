#!/usr/bin/env python3
"""
Configuration Validator
Validates all configuration files and reports any issues
"""

import json
import os
import sys
from pathlib import Path


class Colors:
    """ANSI color codes"""
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    END = '\033[0m'
    BOLD = '\033[1m'


def print_success(msg):
    print(f"{Colors.GREEN}✅ {msg}{Colors.END}")


def print_warning(msg):
    print(f"{Colors.YELLOW}⚠️  {msg}{Colors.END}")


def print_error(msg):
    print(f"{Colors.RED}❌ {msg}{Colors.END}")


def print_info(msg):
    print(f"{Colors.BLUE}ℹ️  {msg}{Colors.END}")


def validate_json_file(filepath):
    """Validate that a file contains valid JSON"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            json.load(f)
        return True, None
    except json.JSONDecodeError as e:
        return False, f"JSON syntax error: {e}"
    except Exception as e:
        return False, f"Error reading file: {e}"


def validate_app_config(config):
    """Validate app.json structure"""
    errors = []
    warnings = []

    # Check required sections
    required_sections = ['app', 'api', 'paths']
    for section in required_sections:
        if section not in config:
            errors.append(f"Missing required section: '{section}'")

    # Validate API config
    if 'api' in config:
        api = config['api']
        if 'port' not in api:
            errors.append("Missing 'api.port'")
        elif not isinstance(api['port'], int):
            errors.append("'api.port' must be an integer")

        if 'host' not in api:
            warnings.append("Missing 'api.host', will default to '127.0.0.1'")

        if 'baseUrl' not in api:
            warnings.append("Missing 'api.baseUrl'")

    # Validate paths
    if 'paths' in config:
        paths = config['paths']
        for path_key in ['dataDir', 'langDir']:
            if path_key not in paths:
                warnings.append(f"Missing 'paths.{path_key}'")

    return errors, warnings


def validate_languages_config(config):
    """Validate languages.json structure"""
    errors = []
    warnings = []

    if 'defaultLanguage' not in config:
        errors.append("Missing 'defaultLanguage'")

    if 'supportedLanguages' not in config:
        errors.append("Missing 'supportedLanguages'")
    elif not isinstance(config['supportedLanguages'], list):
        errors.append("'supportedLanguages' must be an array")
    else:
        lang_codes = set()
        for i, lang in enumerate(config['supportedLanguages']):
            if not isinstance(lang, dict):
                errors.append(f"Language at index {i} must be an object")
                continue

            # Check required fields
            for field in ['code', 'name', 'flag']:
                if field not in lang:
                    errors.append(f"Language at index {i} missing '{field}'")

            # Check for duplicate codes
            code = lang.get('code')
            if code:
                if code in lang_codes:
                    errors.append(f"Duplicate language code: '{code}'")
                lang_codes.add(code)

        # Check if default language is in supported languages
        default = config.get('defaultLanguage')
        if default and default not in lang_codes:
            errors.append(f"Default language '{default}' not in supported languages")

    return errors, warnings


def validate_categories_config(config):
    """Validate categories.json structure"""
    errors = []
    warnings = []

    if 'categories' not in config:
        errors.append("Missing 'categories'")
        return errors, warnings

    if not isinstance(config['categories'], list):
        errors.append("'categories' must be an array")
        return errors, warnings

    category_ids = set()
    for i, cat in enumerate(config['categories']):
        if not isinstance(cat, dict):
            errors.append(f"Category at index {i} must be an object")
            continue

        # Check required fields
        required = ['id', 'name', 'icon', 'dataFile']
        for field in required:
            if field not in cat:
                errors.append(f"Category at index {i} missing '{field}'")

        # Check for duplicate IDs
        cat_id = cat.get('id')
        if cat_id:
            if cat_id in category_ids:
                errors.append(f"Duplicate category id: '{cat_id}'")
            category_ids.add(cat_id)

        # Validate fields structure
        if 'fields' in cat:
            fields = cat['fields']
            if 'optional' in fields and not isinstance(fields['optional'], list):
                errors.append(f"Category '{cat_id}': fields.optional must be an array")

            if 'optional' in fields:
                for j, field in enumerate(fields['optional']):
                    if not isinstance(field, dict):
                        errors.append(f"Category '{cat_id}': field at index {j} must be an object")
                        continue

                    for f in ['name', 'type', 'label']:
                        if f not in field:
                            errors.append(f"Category '{cat_id}': field at index {j} missing '{f}'")

                    if field.get('type') not in ['text', 'textarea', None]:
                        warnings.append(f"Category '{cat_id}': unknown field type '{field.get('type')}'")

    return errors, warnings


def check_file_references(config_dir):
    """Check that referenced files exist"""
    errors = []
    warnings = []

    # Load categories config
    try:
        with open(config_dir / 'categories.json', 'r') as f:
            cat_config = json.load(f)

        for cat in cat_config.get('categories', []):
            data_file = cat.get('dataFile')
            if data_file:
                full_path = config_dir.parent / data_file
                if not full_path.exists():
                    warnings.append(f"Data file not found: {data_file}")

    except Exception as e:
        errors.append(f"Could not check file references: {e}")

    # Load languages config
    try:
        with open(config_dir / 'languages.json', 'r') as f:
            lang_config = json.load(f)

        for lang in lang_config.get('supportedLanguages', []):
            code = lang.get('code')
            if code:
                lang_file = config_dir.parent / 'lang' / f'{code}.json'
                if not lang_file.exists():
                    warnings.append(f"Translation file not found: lang/{code}.json")

    except Exception as e:
        errors.append(f"Could not check language files: {e}")

    return errors, warnings


def main():
    """Main validation function"""
    print(f"\n{Colors.BOLD}{'=' * 60}{Colors.END}")
    print(f"{Colors.BOLD}Configuration Validator{Colors.END}")
    print(f"{Colors.BOLD}{'=' * 60}{Colors.END}\n")

    config_dir = Path('config')
    if not config_dir.exists():
        print_error("Configuration directory 'config/' not found!")
        sys.exit(1)

    all_errors = []
    all_warnings = []

    # Validate app.json
    print_info("Validating app.json...")
    app_path = config_dir / 'app.json'
    valid, error = validate_json_file(app_path)
    if not valid:
        print_error(f"app.json: {error}")
        all_errors.append(error)
    else:
        with open(app_path, 'r') as f:
            app_config = json.load(f)
        errors, warnings = validate_app_config(app_config)
        all_errors.extend(errors)
        all_warnings.extend(warnings)
        if not errors and not warnings:
            print_success("app.json is valid")

    # Validate languages.json
    print_info("Validating languages.json...")
    lang_path = config_dir / 'languages.json'
    valid, error = validate_json_file(lang_path)
    if not valid:
        print_error(f"languages.json: {error}")
        all_errors.append(error)
    else:
        with open(lang_path, 'r') as f:
            lang_config = json.load(f)
        errors, warnings = validate_languages_config(lang_config)
        all_errors.extend(errors)
        all_warnings.extend(warnings)
        if not errors and not warnings:
            print_success("languages.json is valid")

    # Validate categories.json
    print_info("Validating categories.json...")
    cat_path = config_dir / 'categories.json'
    valid, error = validate_json_file(cat_path)
    if not valid:
        print_error(f"categories.json: {error}")
        all_errors.append(error)
    else:
        with open(cat_path, 'r') as f:
            cat_config = json.load(f)
        errors, warnings = validate_categories_config(cat_config)
        all_errors.extend(errors)
        all_warnings.extend(warnings)
        if not errors and not warnings:
            print_success("categories.json is valid")

    # Check file references
    print_info("Checking file references...")
    errors, warnings = check_file_references(config_dir)
    all_errors.extend(errors)
    all_warnings.extend(warnings)
    if not errors and not warnings:
        print_success("All file references are valid")

    # Summary
    print(f"\n{Colors.BOLD}{'=' * 60}{Colors.END}")
    print(f"{Colors.BOLD}Validation Summary{Colors.END}")
    print(f"{Colors.BOLD}{'=' * 60}{Colors.END}\n")

    # Print all errors
    if all_errors:
        print(f"{Colors.RED}{Colors.BOLD}Errors ({len(all_errors)}):{Colors.END}")
        for error in all_errors:
            print_error(error)
        print()

    # Print all warnings
    if all_warnings:
        print(f"{Colors.YELLOW}{Colors.BOLD}Warnings ({len(all_warnings)}):{Colors.END}")
        for warning in all_warnings:
            print_warning(warning)
        print()

    # Final status
    if not all_errors and not all_warnings:
        print_success("All configuration files are valid! 🎉\n")
        sys.exit(0)
    elif all_errors:
        print_error("Configuration validation failed! Please fix errors above.\n")
        sys.exit(1)
    else:
        print_warning("Configuration is valid but has warnings. Please review.\n")
        sys.exit(0)


if __name__ == '__main__':
    main()
