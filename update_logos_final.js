const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/naron/public';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

const replacements = [
    // Logo replacements
    { from: /src="logo-mark\.svg"/g, to: 'src="assets/favicon.png"' },
    { from: /src="assets\/school-logo\.png"/g, to: 'src="assets/favicon.png"' },
    { from: /src="logo\.svg"/g, to: 'src="assets/favicon.png"' },

    // Favicon replacements
    { from: /href="favicon\.svg"/g, to: 'href="assets/favicon.png"' },
    { from: /type="image\/svg\+xml"/g, to: 'type="image/png"' },

    // Script replacements (just in case they appear in files)
    { from: /this\.src='assets\/school-logo\.png'/g, to: "this.src='assets/favicon.png'" }
];

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    for (const r of replacements) {
        if (r.from.test(content)) {
            content = content.replace(r.from, r.to);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        count++;
        console.log(`Updated ${file}`);
    }
}

console.log(`Total updated files: ${count}`);
