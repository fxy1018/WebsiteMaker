(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage" : createPage,
            "findPagesByWebsiteId" : findPagesByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime();
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var pagesites = []
            for (var p in pages){
                var page = pages[p];
                if (page.websiteId === websiteId){
                    pagesites.push(page);
                }
            }
            return pagesites;
        }

        function findPageById(pageId) {
            for (var p in pages){
                var page = pages[p];
                if (page._id === pageId){
                    return angular.copy(page);
                }
            }
            return null;
        }


        function updatePage(pageId, newPage) {
            for (var p in pages){
                var page = pages[p];
                if (page._id === pageId){
                    page.name = newPage.name;
                    page.description = newPage.description;
                    return angular.copy(page);
                }
            }
            return null;

        }

        function deletePage(pageId) {
            for (var p in pages){
                var page = pages[p];
                if (page._id === pageId){
                    pages.splice(p, 1);
                }
            }
        }

    }
})();