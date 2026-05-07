import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

// 1. Extract the summary block from the left column
const summaryBlock = `
                    <div style="font-size: 12px; line-height: 1.5; color: #666; margin-top: 15px; background: #f9f9f9; padding: 10px; border-radius: 4px; border: 1px solid #eee;">
                      <ul class="list-unstyled mb-0">
                        <li><strong>เฉลี่ยภาคนี้:</strong> CR=18 CE=18 CD=18 GP=49.50 GPA=2.75</li>
                        <li><strong>เฉลี่ยสะสม:</strong> CR=18 CE=18 CD=18 GP=49.50 GPA=2.75</li>
                        <hr style="margin: 5px 0;">
                        <li><strong>หน่วยกิตที่ลงทะเบียนสะสม:</strong> 18</li>
                        <li><strong>จำนวนหน่วยกิตที่สอบได้:</strong> 18</li>
                        <li><strong>คะแนนเฉลี่ยสะสม:</strong> 2.92</li>
                      </ul>
                    </div>`;

// Remove it from the current location
html = html.replace(summaryBlock, '');

// 2. We want to place it below the table. The table is inside <div class="table-scrollable table-responsive">
// Let's add it right after the table inside that div, or right after the div itself.
// The structure is:
// <div class="table-scrollable table-responsive" style="height: 230px; overflow-y: auto;">
//   <table ...>
//     ...
//   </table>
// </div>
// Let's replace the closing </div> of that section with our summary block and then close the div.
// Wait, replacing '</div>' globally is dangerous. 
// We know it's right after `</tbody>\n                </table>\n              </div>`

html = html.replace(/<\/tbody>\s*<\/table>\s*<\/div>/, '</tbody>\n                </table>\n' + summaryBlock + '\n              </div>');

fs.writeFileSync('static-dashboard.html', html);
console.log("Summary moved to grades table section.");
