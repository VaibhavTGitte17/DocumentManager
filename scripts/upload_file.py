import sys
import shutil
import json
import os

FOLDER_FILE = 'folder.json'
CONFIG_FILE = 'configure.json'

def load_folder_paths():
    with open(FOLDER_FILE, 'r') as file:
        data = json.load(file)
    return data

def load_config_folder_path():
    with open(CONFIG_FILE, 'r') as file:
        config = json.load(file)
    return config['folder_path']

def copy_files(file_paths, destination_folder):
    for file_path in file_paths:
        if os.path.isfile(file_path):
            shutil.copy(file_path, destination_folder)
            print(f'Copied {file_path} to {destination_folder}')
        else:
            print(f'File {file_path} not found')

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('No files to copy.')
        sys.exit(1)

    file_paths = sys.argv[1:-1]
    selected_folder_name = sys.argv[-1] if len(sys.argv) > 1 else None

    folder_data = load_folder_paths()

    # Flatten the nested dictionary to map folder names to their full paths
    folder_mapping = {}
    for parent_path, subfolders in folder_data.items():
        for subfolder in subfolders:
            folder_name = os.path.basename(subfolder)
            folder_mapping[folder_name] = subfolder

    if selected_folder_name in folder_mapping:
        destination_folder = folder_mapping[selected_folder_name]
    else:
        destination_folder = load_config_folder_path()

    copy_files(file_paths, destination_folder)
