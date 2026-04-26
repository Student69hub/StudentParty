import os, glob, re

directory = r"c:\Users\naron\public"

# ============================================================
# nav สำหรับหน้าที่ไม่มี active class ใดๆ (จะใส่ active โดย JS)
# ============================================================
def build_nav(active_page=""):
    def a(href, label):
        cls = ' class="active"' if href == active_page else ''
        return f'<a href="{href}"{cls}>{label}</a>'

    return f'''        <ul class="nav-links" id="nav-links">
                <li>{a("index.html","หน้าแรก")}</li>
                <li>{a("policy.html","นโยบาย")}</li>
                <li class="nav-item-dropdown">
                    <a href="#" class="nav-dropdown-toggle">กิจกรรม ▾</a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="esports.html">E-Sports</a></li>
                        <li><a href="achievements.html">ผลงาน</a></li>
                    </ul>
                </li>

                <li>{a("feedback.html","ความคิดเห็น")}</li>
            </ul>'''

# Pattern ครอบ <ul class="nav-links" ...> ... </ul> (รวม nested)
NAV_UL_PATTERN = re.compile(
    r'<ul class="nav-links"[^>]*>.*?</ul>\s*\n?\s*</div>\s*\n?\s*</nav>',
    re.DOTALL
)

# page → active href
PAGE_ACTIVE = {
    "index.html":          "index.html",
    "policy.html":         "policy.html",
    "about.html":          "about.html",
    "contact.html":        "contact.html",
    "members.html":        "members.html",
    "esports.html":        "esports.html",
    "achievements.html":   "achievements.html",
    "gallery.html":        "gallery.html",
    "feedback.html":       "feedback.html",
    "news-efootball.html": "news-efootball.html",
    "news-classroom.html": "news-classroom.html",
    "news-general.html":   "news-general.html",
    "living-policy.html":  "policy.html",
    "policy-democracy.html":"policy.html",
    "policy-quality.html": "policy.html",
    "policy-student.html": "policy.html",
    "logo-meaning.html":   "",
    "efootball.html":      "esports.html",
    "efootball-register.html": "esports.html",
    "efootball-players.html":  "esports.html",
}

SKIP = {"admin-efootball.html", "admin-feedback.html", "index_test.html"}

updated = []

for filepath in glob.glob(os.path.join(directory, "*.html")):
    fname = os.path.basename(filepath)
    if fname in SKIP:
        continue

    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    if 'class="nav-links"' not in content:
        continue

    active = PAGE_ACTIVE.get(fname, "")
    new_ul = build_nav(active)

    # Replace entire <ul class="nav-links"...>...</ul></div></nav>
    def replacer(m):
        original_end = m.group(0)
        # keep the closing </div></nav>
        closing = original_end[original_end.rfind("</ul>") + 5:]
        return new_ul + "\n        </div>\n    </nav>"

    new_content = NAV_UL_PATTERN.sub(replacer, content)

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated.append(fname)
        print(f"  Updated: {fname}")

print(f"\nDone — {len(updated)} files updated.")
print("Files:", ", ".join(updated))
