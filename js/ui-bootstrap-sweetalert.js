/// miloa customize
const sweetAlert = function () {
  return {
    alert: function (title,message) {
      if(title){
        swal(title, message, 'warning');
      }else{
        swal(message);
      }
    },
    success: function (title,message) {
      if(title){
        swal(title, message, 'success');
      }else{
        swal(message);
      }
    },
    error: function (title,message) {
      if(title){
        swal(title, message, 'error');
      }else{
        swal(message);
      }
    },
    info: function (title,message) {
      if(title){
        swal(title, message, 'info');
      }else{
        swal(message);
      }
    },
    confirm: function (message, confirmFunc, title) {
      swal({
          title: title || "ยืนยันการดำเนิการ",
          text: message,
          type: "warning",
          dangerMode: true,
          showCancelButton: true,
          confirmButtonText: "ดำเนินการต่อ",
          cancelButtonText: "ยกเลิก",
        },
        function (isConfirm) {
          if (isConfirm) {
            confirmFunc();
          }
        });
    },
    close: function () {
      swal.close();
    },
  };
}();
