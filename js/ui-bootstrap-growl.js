/// sarunrd customize
var UIBootstrapGrowl = function () {
    return {
        info: function (message) {
            $.bootstrapGrowl(message, {
                ele: 'body', // which element to append to
                type: 'info', // (null, 'info', 'danger', 'success', 'warning')
                offset: { from: 'top', amount: 20 }, // 'top', or 'bottom'
                align: 'right', // ('left', 'right', or 'center')
                width: 350, // (integer, or 'auto')
                delay: 3000, // 3s Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                allow_dismiss: true,  // If true then will display a cross to close the popup.
                stackup_spacing: 10 // spacing between consecutively stacked growls.
            });
        },
        danger: function (message) {
            $.bootstrapGrowl(message, {
                ele: 'body', // which element to append to
                type: 'danger', // (null, 'info', 'danger', 'success', 'warning')
                offset: { from: 'top', amount: 20 }, // 'top', or 'bottom'
                align: 'right', // ('left', 'right', or 'center')
                width: 350, // (integer, or 'auto')
                delay: 4000, // 3s Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                allow_dismiss: true,  // If true then will display a cross to close the popup.
                stackup_spacing: 10 // spacing between consecutively stacked growls.
            });
        },
        success: function (message) {
            $.bootstrapGrowl(message, {
                ele: 'body', // which element to append to
                type: 'success', // (null, 'info', 'danger', 'success', 'warning')
                offset: { from: 'top', amount: 20 }, // 'top', or 'bottom'
                align: 'right', // ('left', 'right', or 'center')
                width: 350, // (integer, or 'auto')
                delay: 3000, // 3s Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                allow_dismiss: true,  // If true then will display a cross to close the popup.
                stackup_spacing: 10 // spacing between consecutively stacked growls.
            });
        },
    };
}();

var Notify = function () {
    return {
        info: function (message) {
            $.notify({
                title: '<strong>Heads up!</strong>',
                message: message
            });
        },
        danger: function (message) {
            $.notify({
                title: '<strong>Heads up!</strong>',
                message: message
            }, {
                type: 'danger'
            });
        },
        success: function (message) {
            $.notify({
                title: '<strong>Heads up!</strong>',
                message: message
            }, {
                type: 'success'
            });
        }
    };
}();

// bootstrap-ckeditor-fix.js
// hack to fix ckeditor/bootstrap compatiability bug when ckeditor appears in a bootstrap modal dialog
//
// Include this file AFTER both jQuery and bootstrap are loaded.

$.fn.modal.Constructor.prototype.enforceFocus = function () {
    modal_this = this
    $(document).on('focusin.modal', function (e) {
        if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select')
        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
            modal_this.$element.focus()
        }
    })
};
