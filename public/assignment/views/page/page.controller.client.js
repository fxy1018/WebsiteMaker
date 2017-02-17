(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        console.log(vm.pages);
    }

    function NewPageController() {
        var vm = this;

    }

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.useId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
        console.log(vm.page);

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            var page = PageService.updatePage(vm.pageId, vm.page);
            if (page != null){
                vm.message = "sucessfully update page"
            } else {
                vm.error = "can't update page"
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }




    }


})();