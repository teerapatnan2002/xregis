import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

html = html.replace(/6416010008/g, '6818010003');
html = html.replace(/นายธีรภัทร นันท์ตา/g, 'นายชนาธิป ผาสุตะ');
html = html.replace(/คณะทันตแพทยศาสตร์/g, 'เภสัชศาสตร์');
html = html.replace(/ทันตกรรม/g, 'เภสัชศาสตร์');
html = html.replace(/ภาคปกติ/g, 'ปริญญาตรี (6 ปี)');
html = html.replace(/ทันตแพทยศาสตรบัณฑิต \(วิทยาเขตหลัก\)/g, '1118010001 (101)');
html = html.replace(/อ\.สมหญิง ใจดี/g, 'ดร.อรพินธุ์ เพียรรุ่งเรือง');
html = html.replace(/<span class="bold">ปกติ<\/span>/g, '<span class="bold">เรียนปกติ</span>');
html = html.replace(/ศูนย์การศึกษา/g, 'มหาวิทยาลัยเนชั่น (สำหรับนิสิตระดับปริญญาตรี)');

// Fix image URLs to point directly to the university's server for this student ID
html = html.replace(/src="images\/profile\.jpg"/g, 'src="https://xregis.nation.ac.th/stdphoto/6818010003" onerror="this.src=\'https://ui-avatars.com/api/?name=Chanathip+Pasuta&background=random\'"');

fs.writeFileSync('static-dashboard.html', html);
console.log("Data updated.");
