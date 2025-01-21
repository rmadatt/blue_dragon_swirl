import os

def create_directory(path):
    if not os.path.exists(path):
        os.makedirs(path)

def load_config(config_path):
    with open(config_path, 'r') as file:
        config = json.load(file)
    return config

# Example usage:
# create_directory('path/to/directory')
# config = load_config('path/to/config.json')
# print(config)

