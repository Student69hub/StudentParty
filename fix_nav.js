const fs = require('fs');
const path = require('path');

const filesToUpdate = ['efootball-players.html', 'efootball-register.html'];

const newNavLinks = `<ul class="nav-links" id="nav-links">
                <li><a href="index.html">หน้าแรก</a></li>
                <li><a href="policy.html">นโยบาย</a></li>
                <li class="nav-item-dropdown">
                    <a href="#" class="nav-dropdown-toggle active">กิจกรรม ▾</a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="esports.html" class="active">E-Sports</a></li>
                        <li><a href="achievements.html">ผลงาน</a></li>
                        <li><a href="gallery.html">แกลเลอรี</a></li>
                    </ul>
                </li>
                <li class="nav-item-dropdown">
                    <a href="#" class="nav-dropdown-toggle">ข่าวสาร ▾</a>
                    <ul class="nav-dropdown-menu">
                        <li><a href="news-efootball.html">ข่าวสาร Efootball</a></li>
                        <li><a href="news-classroom.html">ประกวดห้องเรียน</a></li>
                        <li><a href="news-general.html">ข่าวสารทั่วไป</a></li>
                    </ul>
                </li>

                <li><a href="feedback.html">ความคิดเห็น</a></li>
            </ul>`;

for (const file of filesToUpdate) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${file}`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the complete ul#nav-links block
    const regex = /<ul class="nav-links" id="nav-links">[\s\S]*?<\/ul>/;

    if (regex.test(content)) {
        content = content.replace(regex, newNavLinks);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated ${file}`);
    } else {
        console.log(`Could not find nav-links block in ${file}`);
    }
}
