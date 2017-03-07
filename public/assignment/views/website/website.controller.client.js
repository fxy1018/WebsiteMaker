(function () {
    angular
        .module("WebAppMaker")
        .controller("WebSiteListController", WebSiteListController)
        .controller("NewWebSiteController", NewWebSiteController)
        .controller("EditWebSiteController", EditWebSiteController)

    function WebSiteListController($routeParams, WebSiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init(){
            // vm.websites = WebSiteService.findWebsitesByUser(vm.userId);
            WebSiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    console.log(websites);
                    vm.websites = websites;
                })
        }
        init();
    }


    function NewWebSiteController($routeParams, WebSiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;
        function init(){
            WebSiteService
                .findWebsitesByUser(vm.userId)
                .success(function(websites){
                    vm.websites = websites;
                })

        }
        init();


        function createWebsite(website){
            WebSiteService
                .createWebsite(vm.userId, website)
                .success(function(){
                    $location.url("/user/"+vm.userId+"/website");
                })
        }
    };



    function EditWebSiteController($routeParams, $location, WebSiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        console.log(vm.websiteId);
        console.log(vm.userId);

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebSiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });

            WebSiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites){
                    vm.websites = websites;
            })
        }
        init();


        function deleteWebsite(){
            var answer = confirm("Are you sure?");
            if (answer){
                WebSiteService
                    .deleteWebsite(vm.websiteId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website");
                    })
                    .error(function(){
                        vm.error = "can't delete this website"
                    });
            }

        };

        function updateWebsite(){
            WebSiteService
                .updateWebsite(vm.websiteId,vm.website)
                .success(function (){
                    console.log(vm.website)
                    vm.message = 'successfully update the website';
                })
                .error(function () {
                    vm.error = "fail to update this website"
                });
        }

    };

})();