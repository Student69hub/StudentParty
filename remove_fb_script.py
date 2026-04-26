import os
import re

directory = r'c:\Users\naron\public'
fb_url = 'https://www.facebook.com/share/1Gdh4ZEpRo/'

# Regex pattern to match the anchor tag containing the FB URL and its children (svg, etc.)
# This pattern matches <a ... href="fb_url" ...> ... </a>
pattern = re.compile(r'<a\s+[^>]*?href="' + re.escape(fb_url) + r'"[^>]*?>.*?</a>', re.DOTALL)

# Pattern to remove the "Facebook" mentions in text like in contact.html
text_pattern = re.compile(r'<p>Facebook สามารถติดตามได้เลย เราขอขอบคุณทุกเสียงที่ส่งถึงเรา</p>', re.IGNORECASE)

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        path = os.path.join(directory, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove anchor tags
        new_content = pattern.sub('', content)
        
        # Remove specific text mentions
        new_content = text_pattern.sub('', new_content)
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {filename}")
        else:
            print(f"No changes: {filename}")
