import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

// Update GPA
html = html.replace(/<p  class="text-elg text-strong mb-0">3\.55<\/p>/, '<p  class="text-elg text-strong mb-0">2.92</p>');

// Update Credits Progress
html = html.replace(/<strong>120\/144<\/strong>/, '<strong>18/18</strong>');
html = html.replace(/<span>83<\/span>%/, '<span>100</span>%');

// Generate new rows for Grades Table
const gradesHtml = `
                  <tr>
                    <td style="text-align: center;"> 1</td>
                    <td style="text-align: center;"> DNT1205</td>
                    <td> โภชนาการอย่างยั่งยืนเพื่อสุขภาพ</td>
                    <td style="text-align: center;"> A</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 2</td>
                    <td style="text-align: center;"> DNT1401</td>
                    <td> การพัฒนาทักษะและการเรียนรู้ตลอดชีวิต</td>
                    <td style="text-align: center;"> A</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 3</td>
                    <td style="text-align: center;"> GEE1101</td>
                    <td> ภาษาอังกฤษเพื่อการสื่อสาร 1</td>
                    <td style="text-align: center;"> C+</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 4</td>
                    <td style="text-align: center;"> GEM1116</td>
                    <td> คอมพิวเตอร์เบื้องต้นและเทคโนโลยีสารสนเทศ</td>
                    <td style="text-align: center;"> B</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 5</td>
                    <td style="text-align: center;"> GES1106</td>
                    <td> การคิด การสื่อสาร และการแก้ปัญหา</td>
                    <td style="text-align: center;"> A</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 6</td>
                    <td style="text-align: center;"> SCD1101</td>
                    <td> วิทยาศาสตร์บูรณาการ 1</td>
                    <td style="text-align: center;"> D+</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 7</td>
                    <td style="text-align: center;"> SCD1102</td>
                    <td> วิทยาศาสตร์บูรณาการ 2</td>
                    <td style="text-align: center;"> D+</td>
                  </tr>
`;

// Replace the old grades table rows
html = html.replace(/<tbody>\s*<tr>\s*<td style="text-align: center;"> 1<\/td>[\s\S]*?<\/tbody>/, '<tbody>\n' + gradesHtml + '                  </tbody>');

fs.writeFileSync('static-dashboard.html', html);
console.log("Grades and GPA updated.");
