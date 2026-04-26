import os
import glob

directory = r"c:\Users\naron\public"
extensions = ["*.html", "*.js"]

replace_pairs = [
    ("https://www.instagram.com/n.xrongritt_/", "https://www.instagram.com/students.party_?igsh=NjV6NWlrMzR4dXJu"),
    ("@n.xrongritt_", "@students.party_")
]

for ext in extensions:
    for filepath in glob.glob(os.path.join(directory, ext)):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for old, new in replace_pairs:
            new_content = new_content.replace(old, new)
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")

print("Done.")
