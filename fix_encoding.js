const fs = require('fs');

const rawHtml = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>พรรคนักเรียน | หน้าแรก</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="assets/school-logo.png" alt="โลโก้พรรคนักเรียน" class="nav-logo-img">
        <span class="nav-logo-text">พรรคนักเรียน</span>
      </a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-label="เปิดเมนู">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul class="nav-links" id="nav-links">
        <li><a href="index.html" class="active">หน้าแรก</a></li>
        <li><a href="policy.html">นโยบาย</a></li>
        <li><a href="about.html">เกี่ยวกับเรา</a></li>
        <li><a href="contact.html">ติดต่อ</a></li>
        <li><a href="members.html">สมาชิก</a></li>
      </ul>
    </div>
  </nav>

  <main id="main-content" class="page-enter">
    <section class="page-hero">
      <div class="container">
        <h1>พรรคนักเรียน</h1>
        <p>เสียงของนักเรียน เพื่อโรงเรียนที่ดีกว่า เราพร้อมนำพานโยบายที่ตอบโจทย์ชีวิตในโรงเรียนไปปฏิบัติจริง</p>
        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
          <a href="policy.html" class="btn btn-primary">ดูนโยบายทั้งหมด</a>
          <a href="contact.html" class="btn btn-outline">ติดต่อเรา</a>
        </div>
      </div>
    </section>

    <!-- ===== eFootball League Table Section ===== -->
    <section class="content-section table-section">
      <div class="container">
        <h2 class="section-title" style="text-align: center; margin-bottom: 2rem;">ตารางคะแนน eFootball Student League</h2>
        
        <div class="league-table-container">
          <table class="league-table">
            <thead>
              <tr>
                <th class="col-pos">อันดับ</th>
                <th class="col-club">ผู้เข้าแข่งขัน (ทีม)</th>
                <th class="col-stat" title="แข่ง (Played)">แข่ง</th>
                <th class="col-stat" title="ชนะ (Won)">ชนะ</th>
                <th class="col-stat" title="เสมอ (Drawn)">เสมอ</th>
                <th class="col-stat" title="แพ้ (Lost)">แพ้</th>
                <th class="col-stat hide-mobile" title="ประตูได้เสีย (Goal Difference)">ได้/เสีย</th>
                <th class="col-pts" title="คะแนน (Points)">แต้ม</th>
              </tr>
            </thead>
            <tbody>
              <!-- อันดับ 1 (แชมป์เปี้ยน) -->
              <tr class="row-champion">
                <td class="col-pos"><span class="pos-badge pos-1">1</span></td>
                <td class="col-club">
                  <div class="club-info">
                    <div class="club-logo bg-primary" style="width:24px;height:24px;border-radius:50%;background:var(--color-primary)"></div>
                    <span class="club-name">นราวิชญ์ (FC Bayern)</span>
                  </div>
                </td>
                <td class="col-stat">5</td>
                <td class="col-stat">4</td>
                <td class="col-stat">1</td>
                <td class="col-stat">0</td>
                <td class="col-stat hide-mobile">+12</td>
                <td class="col-pts">13</td>
              </tr>
              <!-- อันดับ 2 -->
              <tr class="row-runnerup">
                <td class="col-pos"><span class="pos-badge pos-2">2</span></td>
                <td class="col-club">
                  <div class="club-info">
                    <div class="club-logo bg-secondary" style="width:24px;height:24px;border-radius:50%;background:var(--color-secondary)"></div>
                    <span class="club-name">ชานอล (Man City)</span>
                  </div>
                </td>
                <td class="col-stat">5</td>
                <td class="col-stat">3</td>
                <td class="col-stat">2</td>
                <td class="col-stat">0</td>
                <td class="col-stat hide-mobile">+8</td>
                <td class="col-pts">11</td>
              </tr>
              <!-- อันดับ 3 -->
              <tr>
                <td class="col-pos"><span class="pos-badge">3</span></td>
                <td class="col-club">
                  <div class="club-info">
                    <div class="club-logo bg-accent" style="width:24px;height:24px;border-radius:50%;background:var(--color-accent)"></div>
                    <span class="club-name">ธีรภัทร (Real Madrid)</span>
                  </div>
                </td>
                <td class="col-stat">5</td>
                <td class="col-stat">3</td>
                <td class="col-stat">0</td>
                <td class="col-stat">2</td>
                <td class="col-stat hide-mobile">+2</td>
                <td class="col-pts">9</td>
              </tr>
              <!-- อันดับ 4 -->
              <tr>
                <td class="col-pos"><span class="pos-badge">4</span></td>
                <td class="col-club">
                  <div class="club-info">
                    <div class="club-logo bg-dark" style="width:24px;height:24px;border-radius:50%;background:var(--color-dark)"></div>
                    <span class="club-name">นพัสกร (Arsenal)</span>
                  </div>
                </td>
                <td class="col-stat">5</td>
                <td class="col-stat">2</td>
                <td class="col-stat">1</td>
                <td class="col-stat">2</td>
                <td class="col-stat hide-mobile">0</td>
                <td class="col-pts">7</td>
              </tr>
              <!-- อันดับ 5 -->
              <tr>
                <td class="col-pos"><span class="pos-badge">5</span></td>
                <td class="col-club">
                  <div class="club-info">
                    <div class="club-logo" style="width:24px;height:24px;border-radius:50%;background:var(--color-gray-500)"></div>
                    <span class="club-name">มีญวน (Liverpool)</span>
                  </div>
                </td>
                <td class="col-stat">5</td>
                <td class="col-stat">0</td>
                <td class="col-stat">0</td>
                <td class="col-stat">5</td>
                <td class="col-stat hide-mobile">-22</td>
                <td class="col-pts">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 1.5rem;">
          <a href="#" class="btn btn-outline" style="color: var(--color-dark); border-color: rgba(0,0,0,0.2);">ดูรายละเอียดการแข่งทั้งหมด</a>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">พรรคนักเรียน</div>
          <div class="footer-social">
            <a href="https://www.instagram.com/students.party_?igsh=NjV6NWlrMzR4dXJu" target="_blank" rel="noopener noreferrer" class="instagram" title="Instagram">@students.party_</a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Line">LINE</a>
          </div>
        </div>
        <div class="footer-bottom">
          &copy; พรรคนักเรียน &mdash; สร้างสรรค์เพื่อนักเรียน โดยนักเรียน
        </div>
      </div>
    </footer>
  </main>

  <script src="script.js"></script>
</body>
</html>`;

const bom = Buffer.from([0xEF, 0xBB, 0xBF]);
const content = Buffer.from(rawHtml, 'utf-8');

fs.writeFileSync('index.html', Buffer.concat([bom, content]));
console.log('Saved index.html with UTF-8 BOM!');
