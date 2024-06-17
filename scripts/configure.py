import sys
import json
import os


#constant variable CONFIG_FILE that holds the name of the configuration 
CONFIG_FILE = 'configure.json'



def create_config(folder_path):
    
    #configuration file is exists
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
    else:
        config = {}


  #valid directory path for checking is corect
    if os.path.isdir(folder_path): 
        if 'folder_path' in config and config['folder_path'] == folder_path:
            print(f"Folder path {folder_path} is already added.")
        else:
            config['folder_path'] = folder_path
            with open(CONFIG_FILE, 'w') as f:
                json.dump(config, f, indent=4)
            print(f"Folder path {folder_path} added successfully to the {CONFIG_FILE}")
    else:
        print(f"Error: {folder_path} is not a valid directory path.")


if __name__ == '__main__':
    if len(sys.argv) > 1:
        folder_path = sys.argv[1]
        create_config(folder_path)
    else:
        print("No folder path provided.")
