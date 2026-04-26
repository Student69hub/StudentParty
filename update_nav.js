const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('admin') && !f.startsWith('news-'));

const menuHTML = `        <li class="nav-item-dropdown">
          <a href="#" class="nav-dropdown-toggle">ประกาศข่าวสาร ▾</a>
          <ul class="nav-dropdown-menu">
            <li><a href="news-general.html">ข่าวสารทั่วไป</a></li>
            <li><a href="news-efootball.html">ข่าวสาร Efootball</a></li>
            <li><a href="news-classroom.html">ประกวดห้องเรียน</a></li>
          </ul>
        </li>`;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('href="news-general.html"')) {
    const regex = /(\s*<li class="nav-item-dropdown">\s*<a href="efootball\.html")/g;
    content = content.replace(regex, `\n${menuHTML}$1`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Already updated ${file}`);
  }
}
