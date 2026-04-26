const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/naron/public';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('index_test'));

const descriptions = {
    'index.html': 'พรรคนักเรียน — เสียงของนักเรียน เพื่อโรงเรียนที่ดีกว่า เราพร้อมนำพานโยบายที่ตอบโจทย์ชีวิตในโรงเรียนไปปฏิบัติจริง',
    'policy.html': 'นโยบายพรรคนักเรียน — จัดการแข่งขัน E-sports, ห้องน้ำสะอาด, รับฟังความเห็นนักเรียน และกิจกรรมสร้างสรรค์เพื่อทุกคน',
    'about.html': 'ทำความรู้จักกับพรรคนักเรียน — ตัวแทนที่จะมาสร้างการเปลี่ยนแปลงและเป็นเสียงที่แท้จริงของนักเรียนทุกคน',
    'contact.html': 'ติดต่อพรรคนักเรียน — แจ้งปัญหา เสนอความเห็น หรือร่วมงานกับเราผ่านช่องทางต่างๆ',
    'members.html': 'คณะทำงานพรรคนักเรียน — ทีมงานที่มุ่งมั่นตั้งใจทำงานเพื่อประโยชน์ของเพื่อนนักเรียนทุกคน',
    'esports.html': 'E-sports พรรคนักเรียน — ข้อมูลการแข่งขัน ข่าวสาร และศูนย์รวมกิจกรรมเกมเมอร์ในโรงเรียน',
    'efootball.html': 'eFootball Student League — ตารางคะแนนและข่าวสารการแข่งขันลีคเกมฟุตบอลของนักเรียน',
    'news-general.html': 'ข่าวสารทั่วไป — ข้อมูลประกาศสำคัญ กิจกรรม และความเคลื่อนไหวล่าสุดจากพรรคนักเรียน',
    'news-efootball.html': 'ข่าวสาร Efootball — รายละเอียดการแข่งขัน ผลการแข่ง และประกาศต่างๆ เกี่ยวกับลีกอีสปอร์ตฟุตบอล',
    'news-classroom.html': 'ประกาศประกวดห้องเรียนสะอาด — ข้อมูลเกณฑ์การตัดสินและผลการประกวดห้องเรียนสะอาดประจำเดือน',
    'policy-democracy.html': 'นโยบายประชาธิปไตยในโรงเรียน — ส่งเสริมสิทธิและเสียงของนักเรียนให้มีส่วนร่วมในการตัดสินใจ',
    'policy-quality.html': 'นโยบายการเรียนการสอน — พัฒนาคุณภาพการเรียนและสิ่งแวดล้อมที่เหมาะสมกับการเติบโตของนักเรียน',
    'policy-student.html': 'นโยบายความสวัสดิการนักเรียน — ดูแลความเป็นอยู่และสวัสดิภาพเพื่อให้ชีวิตในโรงเรียนดีขึ้น',
    'living-policy.html': 'นโยบายการใช้ชีวิตในโรงเรียน — ห้องน้ำสะอาด พื้นที่พักผ่อน และสิ่งอำนวยความสะดวกสำหรับทุกคน'
};

const defaultDesc = 'พรรคนักเรียน — เสียงของนักเรียน เพื่อโรงเรียนที่ดีกว่า มุ่งสร้างสรรค์กิจกรรมและนโยบายที่เป็นประโยชน์กับนักเรียนทุกคน';

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('name="description"')) continue; // skip if already has description

    const desc = descriptions[file] || defaultDesc;
    const metaTag = `\n  <meta name="description" content="${desc}">`;

    // Try to insert after <title> or <meta charset>
    if (content.includes('</title>')) {
        content = content.replace('</title>', `</title>${metaTag}`);
    } else if (content.includes('<meta charset="UTF-8">')) {
        content = content.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">${metaTag}`);
    } else {
        content = content.replace('<head>', `<head>${metaTag}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated meta description for ${file}`);
}
