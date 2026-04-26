import os
import glob
import re

dir_path = r"c:\Users\naron\public"

old_fb_pattern = re.compile(r'<a href="https://www\.facebook\.com/share/1AHrBoBGrp/"[^>]*>.*?</a>', re.DOTALL)

new_fb = '''<a href="https://www.facebook.com/share/1Gdh4ZEpRo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" style="display: flex; align-items: center; gap: 0.3rem;">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span style="font-size: 0.85rem; font-weight: 600;">มีเพจแล้ว!</span>
            </a>'''

updated_files = []

for filepath in glob.glob(os.path.join(dir_path, "*.html")):
    filename = os.path.basename(filepath)
    if "index_test" in filename: # Skip index_test.html if testing
        pass
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Case 1: The full SVG link
    if "https://www.facebook.com/share/1AHrBoBGrp/" in content:
        content = old_fb_pattern.sub(new_fb, content)
        
    # Case 2: Placeholder link in pages like contact.html if any still exist
    if 'aria-label="Facebook">FB</a>' in content:
        content = re.sub(r'<a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>', new_fb, content)
        
    # Text in contact.html
    text_to_replace = "Facebook, Twitter และ LINE จะเชื่อมโยงเมื่อพร้อม"
    if text_to_replace in content:
        content = content.replace(text_to_replace, "Facebook มีเพจแล้ว! สามารถติดตามได้เลย ส่วน Twitter และ LINE จะเชื่อมโยงเมื่อพร้อม")

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        updated_files.append(filename)

print(f"Updated {len(updated_files)} files: {', '.join(updated_files)}")
