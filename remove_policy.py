import os
import re

def remove_policy_nav():
    # Matches <li> tags containing <a href="policy.html"...>นโยบาย</a> and removes the entire <li> block.
    nav_pattern = re.compile(r'\s*<li[^>]*>\s*<a href="policy\.html"[^>]*>นโยบาย</a>\s*</li>')
    count = 0
    
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        text = f.read()
                    
                    if nav_pattern.search(text):
                        new_text = nav_pattern.sub('', text)
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_text)
                        print(f"Removed from {filepath}")
                        count += 1
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")
                    
    print(f"Successfully updated {count} files.")

if __name__ == "__main__":
    remove_policy_nav()
