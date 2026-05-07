/**
 * Created by aem on 10/31/2016 AD.
 */
var Grid = (function () {
    function Grid() {
        this.config = {
            height: 450,
            miniHight: 200,
            sortable: true,
            scrollable: true,
            selectable: "row",
            filterable: true,
            // filterable: {
            //     extra: false,
            //     operators: {
            //         string: {
            //             startswith: "เริ่มต้นด้วย",
            //             contains: "ประกอบไปด้วย"
            //         }
            //     }
            // },
            pageable: {
                buttonCount: 5,
                refresh: true,
                messages: {
                    morePages: "หน้าอื่น ๆ"
                }
            },
            pageSize: 20,
            checkBoxesColumnWidth: 50,
            statusColumnWidth: 100,
            roleCheckBoxColumnWidth: 100
        };
    }

    /*
     Grid.prototype.config = function () {
     return this.config;
     };

     Grid.prototype.height = function () {
     return this.config.height;
     };

     Grid.prototype.sortable = function () {
     return this.config.sortable;
     };

     Grid.prototype.scrollable = function () {
     return this.config.scrollable;
     };

     Grid.prototype.selectable = function () {
     return this.config.selectable;
     };

     Grid.prototype.filterable = function () {
     return this.config.filterable
     };

     Grid.prototype.pageable = function () {
     return this.config.pageable
     };*/

    Grid.prototype.createDataSource = function(object) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(object);
                }
            },
            pageSize: this.config.pageSize
        });
    };

    Grid.prototype.createDataSourceNoPageSize = function(object) {
        return new kendo.data.DataSource({
            transport: {
                read: function (e) {
                    e.success(object);
                }
            }
        });
    };

    Grid.prototype.selectAllTemplate = function () {
        return '<label class="checkbox checkbox-custom-alt"><input class="checkbox-all" name="chkSelectAll" type="checkbox" ng-click="grid.selectAllItems($event)"><i></i></label>';
    };

    Grid.prototype.selectItemTemplate = function () {
        return '<label class="checkbox checkbox-custom-alt"><input data-index="0" class="checkbox-item" id="chkSelectedItem" name="chkSelectItem" type="checkbox" ng-click="grid.selectItem($event)"><i></i></label>'
    };

    Grid.prototype.options = function () {
        return {
            height: this.config.height,
            sortable: this.config.sortable,
            scrollable: this.config.scrollable,
            selectable: this.config.selectable,
            filterable: this.config.filterable,
            pageable: this.config.pageable
        };
    };

    Grid.prototype.checkBoxesColumns = function () {
        return {
            headerTemplate: Grid.prototype.selectAllTemplate(),
            template: Grid.prototype.selectItemTemplate(),
            headerAttributes: {style: "text-align:center"},
            attributes: {"class": "text-center"},
            width: this.config.checkBoxesColumnWidth
        };
    };

    Grid.prototype.checkBoxesColumnsWithNotSelect = function (columnName, value) {
        return {
            headerTemplate: Grid.prototype.selectAllTemplate(),
            template: "# if (" + columnName + " == '" + value + "') {##} else {#" + Grid.prototype.selectItemTemplate() + "#}#",
            headerAttributes: {style: "text-align:center"},
            attributes: {"class": "text-center"},
            width: this.config.checkBoxesColumnWidth
        };
    };

    Grid.prototype.selectAllItems = function (e) {
        var element = $(e.currentTarget);
        var checked = element.is(':checked');
        var grid = element.closest("div[kendo-grid]").getKendoGrid();
        var selectedItems = element.closest("div[kendo-grid]").find(".checkbox-item");

        selectedItems.each(function (index, selectedItem) {
            var checkBox = $(selectedItem);
            var selectedRow = checkBox.closest("tr");

            checkBox.prop('checked', checked);

            if (checked) {
                Grid.prototype.disableDelete(false);
                selectedRow.addClass("k-state-selected");
            } else {
                Grid.prototype.disableDelete(true);
                selectedRow.removeClass("k-state-selected");
            }
        });
    };

    Grid.prototype.selectedChange = function (grid) {
        /*    var selector = grid.element.find(".checkbox-item");
        var selectedItems = grid.element.find(".k-state-selected");


        selector.each(function (index, checkbox) {
            $(checkbox).prop('checked', false);
        });


        Grid.prototype.disableDelete(selectedItems.length == 1);

        selectedItems.each(function (index, selectedRow) {
            var checkbox = $(selectedRow).find('.checkbox-item');

            if (checkbox.length > 0) {
                $(checkbox[0]).prop('checked', true);
            }
        });

        $("input[name*='chkSelectAll']").prop('checked', grid.dataSource.total() == grid.select().length);*/
    };

    Grid.prototype.selectItem = function (e) {
        var element = $(e.currentTarget);
        var grid = element.closest("div[kendo-grid]").getKendoGrid();

        var selectedItems = grid.element.find(".checkbox-item");
        var selectedAll = true;

        Grid.prototype.disableDelete(true);

        selectedItems.each(function (index, selectedItem) {
            var selectedRow = $(selectedItem).closest("tr");

            if ($(selectedItem).is(':checked')) {
                Grid.prototype.disableDelete(false);
                selectedRow.addClass("k-state-selected");
            } else {
                selectedAll = false;
                selectedRow.removeClass("k-state-selected");
            }
        });

        $("input[name*='chkSelectAll']").prop('checked', selectedAll);
    };

    Grid.prototype.disableDelete = function (disable) {
        $('#btnDelete').prop('disabled', disable);
    };

    return Grid;
}());