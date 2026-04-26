const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/naron/public';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to match <span class="policy-card-tag">...</span> including potential whitespace
    const regex = /<span class="policy-card-tag">[\s\S]*?<\/span>/g;

    if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(filePath, content, 'utf8');
        count++;
        console.log(`Removed tags from ${file}`);
    }
}

console.log(`Total files updated: ${count}`);
