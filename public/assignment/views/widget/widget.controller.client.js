(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;


    }

    function NewWidgetController() {
        var vm = this;

    }

    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;




    }


})();