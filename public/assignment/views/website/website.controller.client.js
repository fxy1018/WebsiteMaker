(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteListController", WebSiteListController)
        .controller("NewWebSiteController", NewWebSiteController)
        .controller("EditWebSiteController", EditWebSiteController)

    function WebSiteListController() {
        var vm = this;
    }

    function NewWebSiteController() {
        var vm = this;
    }

    function EditWebSiteController($routeParams, $location, WebSiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        console.log(vm.websiteId);
        console.log(vm.userId);

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.website = WebSiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebSiteService.findWebsitesByUser(vm.userId);
        }
        init();


        function deleteWebsite(){
            WebSiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        }

        function updateWebsite(){
            var website = WebSiteService.updateWebsite(vm.websiteId,vm.website);
            console.log(vm.website)
            if (website == null){
                vm.error = "fail to update this website";
            } else {
                vm.message = "successfully update the website";
            }

        }

    }


})();