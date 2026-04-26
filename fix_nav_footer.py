#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix remaining HTML files:
1. Replace school-logo.png -> favicon.png in nav
2. Replace old Instagram link @n.xrongritt_ -> @students.party_
3. Replace [ทำเพื่อนักเรียน] tags -> คุณภาพชีวิต
4. Also fix about.html remaining [ทำเพื่อนักเรียน]
"""

import os
import re

PUBLIC_DIR = r"c:\Users\naron\public"

# Files that still need the logo fix (from grep results, excluding admin files)
FILES_TO_FIX_LOGO = [
    "news-general.html",
    "news-efootball.html",
    "news-classroom.html",
    "gallery.html",
    "feedback.html",
    "esports.html",
    "efootball.html",
    "efootball-register.html",
    "efootball-players.html",
    "contact.html",
]

# Files that need [ทำเพื่อนักเรียน] fixed
FILES_TO_FIX_TAG = [
    "about.html",
    "news-classroom.html",
]

fixed_files = []

for filename in FILES_TO_FIX_LOGO:
    filepath = os.path.join(PUBLIC_DIR, filename)
    if not os.path.exists(filepath):
        print(f"SKIP (not found): {filename}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    # Fix logo
    content = content.replace(
        'src="assets/school-logo.png" alt="โลโก้พรรคนักเรียน" class="nav-logo-img"',
        'src="assets/favicon.png" alt="โลโก้พรรคนักเรียน" class="nav-logo-img"'
    )
    # Fix Instagram
    content = content.replace(
        'href="https://www.instagram.com/n.xrongritt_/"',
        'href="https://www.instagram.com/students.party_?igsh=NjV6NWlrMzR4dXJu"'
    )
    content = content.replace('>@n.xrongritt_<', '>@students.party_<')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_files.append(filename)
        print(f"Fixed logo/footer: {filename}")
    else:
        print(f"No changes needed: {filename}")

for filename in FILES_TO_FIX_TAG:
    filepath = os.path.join(PUBLIC_DIR, filename)
    if not os.path.exists(filepath):
        print(f"SKIP (not found): {filename}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = content.replace('[ทำเพื่อนักเรียน]', 'คุณภาพชีวิต')
    content = content.replace('นโยบาย คุณภาพชีวิต', 'นโยบายคุณภาพชีวิต')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        if filename not in fixed_files:
            fixed_files.append(filename)
        print(f"Fixed tags: {filename}")
    else:
        print(f"No tag changes needed: {filename}")

print(f"\nDone! Fixed {len(fixed_files)} files: {', '.join(fixed_files)}")
