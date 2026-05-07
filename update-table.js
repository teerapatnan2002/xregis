import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

const newRows = `
                  <tr>
                    <td style="text-align: center;"> 1</td>
                    <td style="text-align: center;"> DNT1205</td>
                    <td> โภชนาการอย่างยั่งยืนเพื่อสุขภาพ 1</td>
                    <td style="text-align: center;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 2</td>
                    <td style="text-align: center;"> DNT1401</td>
                    <td> การพัฒนาทักษะและการเรียนรู้ตลอดชีวิต 2</td>
                    <td style="text-align: center;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 3</td>
                    <td style="text-align: center;"> GEE1101</td>
                    <td> ภาษาอังกฤษเพื่อการสื่อสาร 1</td>
                    <td style="text-align: center;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 4</td>
                    <td style="text-align: center;"> GEM1116</td>
                    <td> คอมพิวเตอร์เบื้องต้นและเทคโนโลยีสารสนเทศ 3</td>
                    <td style="text-align: center;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 5</td>
                    <td style="text-align: center;"> GES1106</td>
                    <td> การคิด การสื่อสาร และการแก้ปัญหา 3</td>
                    <td style="text-align: center;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 6</td>
                    <td style="text-align: center;"> SCD1101</td>
                    <td> วิทยาศาสตร์บูรณาการ 1</td>
                    <td style="text-align: center;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 7</td>
                    <td style="text-align: center;"> SCD1102</td>
                    <td> วิทยาศาสตร์บูรณาการ 2</td>
                    <td style="text-align: center;">&nbsp;</td>
                  </tr>
`;

// Replace the old grades table rows
html = html.replace(/<tbody>\s*<tr>\s*<td style="text-align: center;"> 1<\/td>[\s\S]*?<\/tbody>/, '<tbody>\n' + newRows + '                  </tbody>');

fs.writeFileSync('static-dashboard.html', html);
console.log("Grades table updated with new course names and blank grades.");
