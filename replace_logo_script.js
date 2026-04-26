const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/naron/public';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace favicon
    if (content.includes('favicon.svg" type="image/svg+xml"')) {
        content = content.replace(/favicon\.svg" type="image\/svg\+xml"/g, 'assets/student.png" type="image/png"');
        changed = true;
    }
    if (content.includes('href="favicon.svg"')) {
        content = content.replace(/href="favicon\.svg"/g, 'href="assets/student.png"');
        changed = true;
    }

    // Replace logo
    if (content.includes('src="logo-mark.svg"')) {
        content = content.replace(/src="logo\-mark\.svg"/g, 'src="assets/student.png"');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        count++;
    }
}
console.log(`Updated ${count} files.`);
