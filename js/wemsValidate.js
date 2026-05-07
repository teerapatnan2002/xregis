/**
 * Created by Aem on 8/25/2016 AD.
 */

"use strict";
angular.module('MetronicApp').directive('wemsValidate', function ($compile) {
    return {
        restrict: "EA",
        template: function (element, attr) {
            var resource = new Resource();
            var control = element.children().first();
            var controlName = control.attr('name');
            var formName = element.parents('form').attr('name');

            var divInputGroup = angular.element("<div id='divInputGroup' class='input-group'></div>");
            var spanInputGroupAddOn = angular.element("<span class='input-group-addon'></span>");
            var iCon = angular.element("<i></i>");
            iCon.attr('ng-class', '{true: "fa fa-warning font-red", false: "fa fa-asterisk"} [(' + formName + '.$submitted || ' + formName + '.' + controlName + '.$touched) && ' + formName + '.' + controlName + '.$invalid]');

            var validateHelpBlock = angular.element("<span class='help-block help-block-error'></span>");
            validateHelpBlock.attr('ng-messages', formName + '.' + controlName + '.$error');
            validateHelpBlock.attr('ng-if', '(' + formName + '.$submitted || ' + formName + '.' + controlName + '.$touched) && ' + formName + '.' + controlName + '.$invalid');

            //-------------- Add ng-messages --------------//
            // add ng-message for display dynamic message to user

            //
            // Get label text of controll
            var labelText = angular.element(element.parents().get(0)).find('label').html();

            //
            // ถ้าไม่สามารถหา Label หรือค่าใน Label เป็นช่องว่าง
            // ให้ใส่คำว่า 'ข้อมูล' แทน
            if (!labelText || labelText == '&nbsp;') {
                labelText = "ข้อมูล";
            }

            //
            // ใช้เฉพาะ pattern และ date เท่านั้น
            // e.g. <input type='text' required pattern='[a-z]{1,15}' example='abc78'>
            // error message : ข้อมูลมีรูปแบบไม่ถูกต้อง ตย. abc78
            var example = "";

            if (control.attr('example')) {
                example = "ตย. " + control.attr('example');
            }

            var controlValidation = angular.element("<div class='validate-messages' role='alert'></div>");
            controlValidation.attr('ng-class', '{"has-error": (' + formName + '.$submitted || ' + formName + '.' + controlName + '.$touched) && ' + formName + '.' + controlName + '.$invalid}');

            var requiredMessage = angular.element("<span>กรุณากรอก <b>" + labelText + "</b></span>");
            requiredMessage.attr('ng-message', 'required');

            var minLengthMessage = angular.element("<span><b>" + labelText + "</b> ต้องมีความยาวไม่น้อยกว่า <b>" + control.attr('ng-minlength') + "</b> ตัวอักษร</span>");
            minLengthMessage.attr('ng-message', 'minlength');

            var maxLengthMessage = angular.element("<span><b>" + labelText + "</b> ต้องมีความยาวไม่เกิน <b>" + control.attr('ng-maxlength') + "</b> ตัวอักษร</span>");
            maxLengthMessage.attr('ng-message', 'maxlength');

            var emailMessage = angular.element("<span><b>" + labelText + "</b> มีรูปแบบอีเมลล์ไม่ถูกต้อง</span>");
            emailMessage.attr('ng-message', 'email');

            var minMessage = angular.element("<span><b>" + labelText + "</b> ต้องมีค่าไม่น้อยกว่า <b>" + control.attr('min') + "</b></span>");
            minMessage.attr('ng-message', 'min');

            var maxMessage = angular.element("<span><b>" + labelText + "</b> ต้องมีค่าไม่มากกว่า <b>" + control.attr('max') + "</b></span>");
            maxMessage.attr('ng-message', 'max');

            var patternMessage = angular.element("<span><b>" + labelText + "</b> มีรูปแบบไม่ถูกต้อง "  + example + "</span>");
            patternMessage.attr('ng-message', 'pattern');

            var dateMessage = angular.element("<span><b>" + labelText + "</b> มีรูปแบบวันที่ไม่ถูกต้อง " + example + "</span>");
            dateMessage.attr('ng-message', 'date');

            validateHelpBlock.append(requiredMessage);
            validateHelpBlock.append(minLengthMessage);
            validateHelpBlock.append(maxLengthMessage);
            validateHelpBlock.append(emailMessage);
            validateHelpBlock.append(minMessage);
            validateHelpBlock.append(maxMessage);
            validateHelpBlock.append(patternMessage);
            validateHelpBlock.append(dateMessage);

            //-------------- End ng-messages --------------//

            spanInputGroupAddOn.append(iCon);


            //-------------- Milo code --------------
            // add icon on left side of control
            // require attr input-left-icon
            // e.g. <div wems-validate input-left-icon="fa fa-envelope">
            if (attr.inputLeftIcon) {
                var spanInputGroupAddOnLeft = angular.element("<span class='input-group-addon input-left'></span>");
                var iConLeft = angular.element("<i class='" + attr.inputLeftIcon + "'></i>");
                spanInputGroupAddOnLeft.append(iConLeft);
                divInputGroup.append(spanInputGroupAddOnLeft);
            }
            //-------------- end Milo code ----------------

            divInputGroup.append(control);

            //-------------- if element is required then add icon * --------------
            if (control[0].required) {
                divInputGroup.append(spanInputGroupAddOn);
            }

            controlValidation.append(divInputGroup);
            controlValidation.append(validateHelpBlock);

            return controlValidation;
        }
    };
});