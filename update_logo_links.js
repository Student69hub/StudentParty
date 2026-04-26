const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/naron/public';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('index_test'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace navigation logo link
    const oldLink = '<a href="index.html" class="nav-logo">';
    const newLink = '<a href="logo-meaning.html" class="nav-logo">';

    if (content.includes(oldLink)) {
        content = content.split(oldLink).join(newLink);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated nav-logo link in ${file}`);
    }
}
