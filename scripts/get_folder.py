import os
import json

# Load the configuration
with open('configure.json', 'r') as config_file:
    config = json.load(config_file)

folder_path = config.get('folder_path')

if not folder_path:
    print("No folder path specified in the configuration.")
    exit(1)

# Get the list of folders
folder_names = [f for f in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, f))]

# Save the folder names to select_folder.json
with open('select_folder.json', 'w') as output_file:
    json.dump(folder_names, output_file, indent=4)

print(f"Successfully saved {len(folder_names)} folders to select_folder.json")
