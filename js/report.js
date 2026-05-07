/**
 * Created by Narasak Mansurang on 6/2/2017.
 */
var Report = (function () {
    function Report() {
        const url = window.location.href;
        if(url.includes('western')){
            this.config = {
                url: 'https://wems-report.western.ac.th/'
            };
        }else if(url.includes('nation')){
            this.config = {
                url: 'https://wems-report.nation.ac.th/'
            };
        }else {
            this.config = {
                url: 'https://wems-report-dev.western.ac.th/'
            };
        }
    }

    Report.prototype.show = function (url) {
        var win = window.open(this.config.url + url, 'wems-report');
        win.focus();
    };

    return Report;
}());
