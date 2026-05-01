
import os
import re

def get_files_in_dir(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            rel_path = os.path.relpath(os.path.join(root, file), directory)
            file_list.append(rel_path.replace('\\', '/'))
    return file_list

def get_files_in_app_js(app_js_path):
    with open(app_js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Find all strings like 'file: "path/to/file"' or 'file: 'path/to/file''
    matches = re.findall(r"file:\s*['\"]([^'\"]+)['\"]", content)
    return set(matches)

aed_parciales_path = r'c:\Users\Thiago Castillo\Desktop\Algoritmos\Codigos\Estudio\aed-estudio-interactivo\aed-parciales'
app_js_path = r'c:\Users\Thiago Castillo\Desktop\Algoritmos\Codigos\Estudio\aed-estudio-interactivo\app.js'

parciales_files = get_files_in_dir(aed_parciales_path)
app_files = get_files_in_app_js(app_js_path)

print("Files in aed-parciales but NOT in app.js:")
for f in parciales_files:
    if f in ['.gitignore', 'README.md'] or f.startswith('.git/') or f.startswith('.obsidian/'):
        continue
    # Many files in app.js don't have the directory prefix if they are in root
    # but the ones in subdirectories do.
    if f not in app_files:
        print(f)
