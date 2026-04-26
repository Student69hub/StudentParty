const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/naron/public';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('index_test'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix generic titles
    if (content.includes('<title>พรรคนักเรียน | หน้าแรก</title>')) {
        content = content.replace('<title>พรรคนักเรียน | หน้าแรก</title>', '<title>พรรคนักเรียน - เสียงของนักเรียน เพื่อโรงเรียนที่ดีกว่า</title>');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated title for ${file}`);
    }
}
