import re

with open('index_backup.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_table = """    <!-- ===== eFootball League Table Section ===== -->
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
    </section>"""

pattern = re.compile(r'(\s*</section>\s*)(\s*<footer class="footer">)', re.DOTALL)
if pattern.search(content):
    fixed_content = pattern.sub(r'\1' + new_table + r'\2', content)
    with open('index.html', 'w', encoding='utf-8-sig') as f:
        f.write(fixed_content)
    print('Repaired index.html encoding and table!')
else:
    print('Regex failed to match.')
