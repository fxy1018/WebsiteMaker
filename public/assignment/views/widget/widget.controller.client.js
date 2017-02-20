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

        function init(){
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            console.log(vm.widgets)
        }init()

        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        function getWidgetTemplateUrl (widgetType) {
            var templateUrl = "views/widget/widget-"+widgetType+".view.client.html";
            return templateUrl;
        }

        function getTrustedHtml(widgetHtml){
            return $sce.trustAsHtml(widgetHtml);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

    }

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function init(){
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }init()


        function createWidget(widget,type) {
            vm.widget = WidgetService.createWidget(vm.pageId, widget, type);
            console.log(vm.widget._id)
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId       = $routeParams.uid;
        vm.websiteId    = $routeParams.wid;
        vm.pageId       = $routeParams.pid;
        vm.widgetId     = $routeParams.wgid;
        function init(){
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId)
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")

        }

        function updateWidget(){
            WidgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
        }

        function getEditorTemplateUrl(widgetType){
            var url = "views/widget/editors/widget-"+ widgetType+"-editor.view.client.html";
            return(url);
        }






    }


})();