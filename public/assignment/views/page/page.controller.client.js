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

        PageService
            .findPagesByWebsiteId(vm.websiteId)
            .success(function (pages) {
                vm.pages = pages;
            });
    };

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        // vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        function init(){
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages){
                    vm.pages = pages;
                });
        }
        init();

        vm.createPage = createPage;

        function createPage(page){
            PageService
                .createPage(vm.websiteId, page)
                .success(function (page){
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    };

    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });

            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page
                });
        }
        init();


        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function updatePage() {
            PageService
                .updatePage(vm.pageId, vm.page)
                .success(function () {
                    vm.message = "sucessfully update page";
                })
        };

        function deletePage() {
            var answer = confirm("Are you sure to delete the page? ");
            if (answer){
                PageService
                    .deletePage(vm.pageId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    });
            }
        }
    }
})();