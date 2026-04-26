import os

# The specific block of HTML to remove from all files
nav_news_html = """                <li class="nav-item-dropdown">
                    <a href="#" class="nav-dropdown-toggle">ข่าวสาร ▾</a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="news-efootball.html">ข่าวสาร Efootball</a></li>
                        <li><a href="news-classroom.html">ประกวดห้องเรียน</a></li>
                        <li><a href="news-general.html">ข่าวสารทั่วไป</a></li>
                    </ul>
                </li>"""

target_directory = r"c:\Users\naron\public"

def remove_news_from_nav():
    count = 0
    for root, dirs, files in os.walk(target_directory):
        if '__backup' in root or '__emergency_recovery' in root or '.git' in root:
            continue
            
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    if nav_news_html in content:
                        new_content = content.replace(nav_news_html, '')
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Removed News from {file}")
                        count += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    remove_news_from_nav()
