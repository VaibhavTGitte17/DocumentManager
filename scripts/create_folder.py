import json
import sys
import os

CONFIG_FILE = 'configure.json'
FOLDER_FILE = 'folder.json'


def create_folder(folder_name):
    # Load the configure.json file
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
    else:
        print(f"Error: {CONFIG_FILE} does not exist.")
        return

    folder_path = config.get('folder_path')
    if folder_path is None:
        print("Error: 'folder_path' not found in the configuration.")
        return

    new_folder_path = os.path.join(folder_path, folder_name)

    # Create the new folder if it doesn't exist
    if not os.path.exists(new_folder_path):
        os.makedirs(new_folder_path)
        print(f"Folder created: {new_folder_path}")
        update_folder_file(folder_path, new_folder_path)
    else:
        print(f"Folder already exists: {new_folder_path}")
        update_folder_file(folder_path, new_folder_path)




def update_folder_file(config_folder_path, folder_path):
    if os.path.exists(FOLDER_FILE):
        with open(FOLDER_FILE, 'r') as f:
            folder_data = json.load(f)
    else:
        folder_data = {}

    # Ensure there is an array for the current config_folder_path
    if config_folder_path not in folder_data:
        folder_data[config_folder_path] = []

    # Add the new folder path to the array
    folder_data[config_folder_path].append(folder_path)

    with open(FOLDER_FILE, 'w') as f:
        json.dump(folder_data, f, indent=4)
    print(f"Folder path {folder_path} written to {FOLDER_FILE}")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        folder_name = sys.argv[1]
        create_folder(folder_name)
    else:
        print("No folder name provided.")
