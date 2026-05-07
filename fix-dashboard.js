import fs from 'fs';

let html = fs.readFileSync('static-dashboard.html', 'utf8');

// 1. Fix Sidebar Links
html = html.replace(/href="Dummy Data"/g, 'href="#"');

// 2. Fix Profile Photo in Personal Info block (dashboard)
html = html.replace(/<img id=profilePicture"[^>]+>/, '<img src="https://ui-avatars.com/api/?name=Somchai+Jaidee&background=random" class="img-responsive pic-bordered" alt="Profile Picture" style="width: 100%; max-width: 150px; border-radius: 4px; margin: 0 auto;">');

// 3. Fix Outstanding Payments (Blacklist) Table
html = html.replace(/<tr Dummy Data>[\s\S]*?<\/tr>/g, `
              <tr>
                <td>ค่าลงทะเบียนเรียน ภาคเรียนที่ 1/2569</td>
                <td style="text-align: right;">5,000.00</td>
              </tr>
              <tr>
                <td>ค่าบำรุงมหาวิทยาลัย</td>
                <td style="text-align: right;">2,500.00</td>
              </tr>
`);

// 4. Fix Outstanding Payments Header Color
html = html.replace(/class="tile-header dvd dvd-btm" Dummy Data/, 'class="tile-header dvd dvd-btm bg-danger"');

// 5. Fix Grades Table
html = html.replace(/<tr Dummy Data>[\s\S]*?<td style="text-align: center;"> Dummy Data <\/td>[\s\S]*?<\/tr>/g, `
                  <tr>
                    <td style="text-align: center;"> 1</td>
                    <td style="text-align: center;"> DT101</td>
                    <td> General Anatomy</td>
                    <td style="text-align: center;"> B+</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 2</td>
                    <td style="text-align: center;"> DT102</td>
                    <td> Dental Materials</td>
                    <td style="text-align: center;"> A</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;"> 3</td>
                    <td style="text-align: center;"> DT103</td>
                    <td> Oral Biology</td>
                    <td style="text-align: center;"> B</td>
                  </tr>
`);

// 6. Fix Exam Table (Removing the first Dummy Data row to inject the real one)
html = html.replace(/<tr Dummy Data>[\s\S]*?<\/tr>/, `
                  <tr>
                    <td style="text-align: center;white-space: nowrap;">
                      DT101
                      <div>
                        <span class="label label-success"> มีสิทธิ์สอบ </span>
                      </div>
                    </td>
                    <td>General Anatomy</td>
                    <td style="text-align: center;">3</td>
                    <td style="text-align: center;white-space: nowrap;">
                      15 พ.ค. 2569
                      <br>
                      09:00 - 12:00
                    </td>
                    <td style="text-align: center;">อาคารเรียนรวม</td>
                  </tr>
`);

// 7. Fix Footer Warning Text
html = html.replace(/งานประสานนิสิต Dummy Data/g, 'งานประสานนิสิต 02-123-4567');

// 8. Fix Header Profile
html = html.replace(/<span Dummy Data> <\/span>/, '<span>Somchai Jaidee</span>');
html = html.replace(/<img src="https:\/\/ui-avatars\.com\/api\/\?name=Somchai\+Jaidee&background=random" alt="" class="img-circle size-30x30">/, '<img src="https://ui-avatars.com/api/?name=Somchai+Jaidee&background=random" alt="" class="img-circle size-30x30">');

// 9. Remove any leftover "Dummy Data" in attributes (like class="Dummy Data")
html = html.replace(/class="([^"]*)Dummy Data([^"]*)"/g, 'class="$1$2"');
html = html.replace(/class="Dummy Data header-fixed aside-fixed rightbar-hidden appWrapper"/, 'class="header-fixed aside-fixed rightbar-hidden appWrapper"');
html = html.replace(/class="  header-fixed aside-fixed rightbar-hidden appWrapper"/, 'class="header-fixed aside-fixed rightbar-hidden appWrapper"');

fs.writeFileSync('static-dashboard.html', html);
console.log("Fixes applied.");
