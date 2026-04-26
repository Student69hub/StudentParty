import os, glob

directory = r"c:\Users\naron\public"
updated = []

for ext in ["*.html", "*.py", "*.js"]:
    for filepath in glob.glob(os.path.join(directory, ext)):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
        except UnicodeDecodeError:
            continue
            
        lines = content.split('\n')
        new_lines = []
        for line in lines:
            if 'gallery.html' in line and 'แกลเลอรี' in line:
                continue
            new_lines.append(line)
            
        new_content = '\n'.join(new_lines)
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            updated.append(filepath)

print("Updated files:", len(updated))
for f in updated:
    print(f)
