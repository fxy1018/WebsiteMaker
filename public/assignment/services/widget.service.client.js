(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);
    // service design pattern, diff from factory, not extensiate, not return object, all functions embeded on the class
    // outside the factory and service are the same implemention
    function WidgetService($http) {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.createWidget = createWidget;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        //this is for factory not service
        // var api = {
        //     "createWidget" : createWidget,
        //     "findWidgetByPageId" : findWidgetByPageId,
        //     "findWidgetById" : findWidgetById,
        //     "updateWidget" : updateWidget,
        //     "deleteWidget" : deleteWidget
        // };
        // return api;

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