const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const esportsLink = '<li><a href="esports.html">E-sports</a></li>';

for (const file of files) {
    if (file === 'esports.html') continue; // skip our new file

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to match the entire eFootball dropdown li element
    const regex = /<li class="nav-item-dropdown">\s*<a href="efootball[a-z\-]*.html"[^>]*>การแข่งขัน Efootball ▾<\/a>[\s\S]*?<\/ul>\s*<\/li>/;

    if (regex.test(content)) {
        content = content.replace(regex, esportsLink);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`Not found in ${file}`);
    }
}
