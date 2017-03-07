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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }init()


        function createWidget(widget,type) {
            widget.widgetType = type;
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (widget){
                    vm.widget = widget;
                    console.log(widget);
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
    }

    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId       = $routeParams.uid;
        vm.websiteId    = $routeParams.wid;
        vm.pageId       = $routeParams.pid;
        vm.widgetId     = $routeParams.wgid;
        function init(){
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    console.log(widget);
                })
        }
        init();

        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function deleteWidget() {
            var answer = confirm("Are you sure to delete it?")
            if (answer){
                WidgetService
                    .deleteWidget(vm.widgetId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
                    })
            }
        }

        function updateWidget(){
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
                .success(function (widget) {
                    vm.widget = widget;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget")
                });
        }

        function getEditorTemplateUrl(widgetType){
            console.log(widgetType)
            if (widgetType){
                var url = "views/widget/editors/widget-"+ widgetType+"-editor.view.client.html";
                return(url);
            }
        }






    }


})();