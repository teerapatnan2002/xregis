import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

// Replace previous dummy data with the EXACT data from the real dashboard
html = html.replace(/Somchai Jaidee/g, 'นายธีรภัทร นันท์ตา');
html = html.replace(/641234567/g, '6416010008');
html = html.replace(/2569\/1/g, '2568/2');
html = html.replace(/3\.85/g, '3.55');
html = html.replace(/กำลังศึกษา/g, 'ปกติ');
// Faculty was already 'คณะทันตแพทยศาสตร์' but let's make sure
// Outstanding payment fix:
html = html.replace(/ค่าลงทะเบียนเรียน ภาคเรียนที่ 1\/2569/g, 'ค้างชำระค่าลงทะเบียนเรียน 2567/1');
html = html.replace(/5,000\.00/g, '4,000.00');

// Remove the second dummy payment row to match the exact look
html = html.replace(/<tr>\s*<td>ค่าบำรุงมหาวิทยาลัย<\/td>\s*<td style="text-align: right;">2,500\.00<\/td>\s*<\/tr>/, '');

fs.writeFileSync('static-dashboard.html', html);
console.log("Real data injected.");
