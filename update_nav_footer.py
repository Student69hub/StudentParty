import os
import glob
import re

directory = r"c:\Users\naron\public"

# New nav items to inject after E-sports link
NEW_NAV_ITEMS = '''        <li><a href="achievements.html">ผลงาน</a></li>
        <li><a href="gallery.html">แกลเลอรี</a></li>
        <li><a href="feedback.html">แสดงความคิดเห็น</a></li>'''

# Old footer social block (with placeholders)
OLD_FOOTER_SOCIAL = re.compile(
    r'<a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>\s*'
    r'<a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</a>\s*'
    r'<a href="#" target="_blank" rel="noopener noreferrer" aria-label="Line">LINE</a>',
    re.DOTALL
)

NEW_FOOTER_SOCIAL = '''<a href="https://www.facebook.com/share/1AHrBoBGrp/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>'''

# Skip these files (already updated or utility scripts)
SKIP_FILES = {
    'index.html', 'about.html', 'achievements.html', 'gallery.html',
    'feedback.html', 'fix_encoding.jshtmlml', 'index_test.html',
    'admin-efootball.html'
}

updated = []

for filepath in glob.glob(os.path.join(directory, "*.html")):
    filename = os.path.basename(filepath)
    if filename in SKIP_FILES:
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Add new nav items after E-sports link (only if not already present)
    if 'achievements.html' not in content:
        # Find E-sports nav item and inject after it
        esports_pattern = re.compile(
            r'(<li><a href="esports\.html">E-sports</a></li>)',
            re.DOTALL
        )
        content = esports_pattern.sub(
            r'\1\n' + NEW_NAV_ITEMS,
            content
        )

    # 2. Update footer: replace old social placeholders with FB icon
    if OLD_FOOTER_SOCIAL.search(content):
        content = OLD_FOOTER_SOCIAL.sub(NEW_FOOTER_SOCIAL, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        updated.append(filename)
        print(f"Updated: {filename}")

print(f"\nDone. Updated {len(updated)} files.")
