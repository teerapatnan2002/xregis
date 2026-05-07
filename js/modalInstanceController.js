angular.module('MetronicApp')
  .controller('modalInstanceController', function ($scope, $uibModalInstance
    , updateModeDesc, pageTitle
    , rowDataEdit, doneSubmitFormModal
    , isEditMode, isInsertMode) {

    $scope.pageTitle = pageTitle;
    $scope.updateModeDesc = updateModeDesc;
    $scope.rowDataEdit = rowDataEdit;
    $scope.ddlOptions = rowDataEdit ? rowDataEdit.ddlOptions:{};

    $scope.isEditMode = isEditMode;
    $scope.isInsertMode = isInsertMode;

    $scope.doneSubmitFormModal = function () {
      doneSubmitFormModal();
      // $uibModalInstance.close($scope.rowDataEdit);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })
