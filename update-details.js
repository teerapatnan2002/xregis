import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

// Replace Previous Data -> New Data
html = html.replace(/<span class="bold">เภสัชศาสตร์<\/span>/g, '<span class="bold">ทันตแพทยศาสตร์</span>');
html = html.replace(/<span class="bold">1118010001 \(101\)<\/span>/g, '<span class="bold">1116010001 (101)</span>');
html = html.replace(/ดร\.อรพินธุ์ เพียรรุ่งเรือง/g, 'พ.ต.ดร.ทพ.อานันท์ จักรอิศราพ');
html = html.replace(/มหาวิทยาลัยเนชั่น \(สำหรับนิสิตระดับปริญญาตรี\)/g, 'มหาวิทยาลัยเนชั่น (สำหรับนิสิตระดับปริญญาตรี)'); // Ensure this line matches exactly if it was broken into 2 lines

fs.writeFileSync('static-dashboard.html', html);
console.log("Details updated.");
