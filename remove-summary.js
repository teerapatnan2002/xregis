import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

// Regex to remove the summary block we added previously
const regex = /<div style="font-size: 12px; line-height: 1\.5; color: #666; margin-top: 15px; background: #f9f9f9; padding: 10px; border-radius: 4px; border: 1px solid #eee;">[\s\S]*?<\/div>/;

html = html.replace(regex, '');

fs.writeFileSync('static-dashboard.html', html);
console.log("Summary block removed.");
