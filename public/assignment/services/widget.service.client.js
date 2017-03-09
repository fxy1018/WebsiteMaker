(function () {
    angular
        .module('WebAppMaker')
        .service("WidgetService", WidgetService);
    // service design pattern, diff from factory, not extensiate, not return object, all functions embeded on the class
    // outside the factory and service are the same implemention
    function WidgetService($http) {

        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.updateWidgetOrder = updateWidgetOrder;

        //this is for factory not service
        // var api = {
        //     "createWidget" : createWidget,
        //     "findWidgetByPageId" : findWidgetByPageId,
        //     "findWidgetById" : findWidgetById,
        //     "updateWidget" : updateWidget,
        //     "deleteWidget" : deleteWidget
        // };
        // return api;

        function updateWidgetOrder(pageId, initial, final) {
            return($http.put('/api/page/' + pageId + '/widget?initial=' + initial + '&final=' + final))

        }


        function createWidget(pageId, widget) {
            return($http.post('/api/page/' + pageId + '/widget', widget));
            // widget._id = (new Date()).getTime().toString();
            // widget.pageId = pageId;
            // widget.widgetType = type;
            // widgets.push(widget);
            // return(widget);
        }

        function findWidgetsByPageId(pageId) {
            return($http.get('/api/page/' + pageId +'/widget'));
            // var res = []
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if (widget.pageId === pageId){
            //         res.push(widget);
            //     }
            // }
            // return res;
        }

        function findWidgetById(widgetId) {
            return($http.get('/api/widget/' + widgetId));
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if (widget._id === widgetId){
            //         return angular.copy(widget);
            //     }
            // }
            // return null;
        }

        function updateWidget(widgetId, newWidget) {
            return($http.put('/api/widget/' + widgetId, newWidget));
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if (widget._id === widgetId){
            //         widget.widgetType = newWidget.widgetType;
            //         widget.size = newWidget.size;
            //         widget.text = newWidget.text;
            //         widget.width = newWidget.width;
            //         return widget;
            //     }
            // }
            // return null;
        }

        function deleteWidget(widgetId) {
            return($http.delete('/api/widget/' + widgetId));
            // for (var w in widgets){
            //     var widget = widgets[w];
            //     if (widget._id === widgetId){
            //         widgets.splice(w, 1);
            //     }
            // }
        }

    }
})();