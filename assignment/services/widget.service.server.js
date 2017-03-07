module.exports = function (app) {
    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);


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

    function deleteWidget(req,res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets){
            var widget = widgets[w];
            if (widget._id === widgetId){
                widgets.splice(w, 1);
                res.sendStatus(200)
                return
            }
        }
        res.sendStatus(404).send("Can't delete the widget")
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for (var w in widgets){
            var widget = widgets[w];
            if (widget._id === widgetId){
                widget.widgetType = newWidget.widgetType;
                widget.size = newWidget.size;
                widget.text = newWidget.text;
                widget.width = newWidget.width;
                widget.url = newWidget.url;
                res.json(widget);
                return;
            }
        }
        res.sendStatus(404).send("can't update");
    }




    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets){
            if (widgets[w]._id == widgetId){
                res.json(widgets[w]);
                return
            }
        }
        res.sendStatus(404).send("can't find the widget");
    }

    function findWidgetsByPageId(req,res) {
        var pageId = req.params.pageId;
        var wds = []
        for (var w in widgets){
            if (widgets[w].pageId == pageId){
                wds.push(widgets[w])
            }
        }
        res.json(wds);
    };


    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget.pageId = pageId;
        widget._id = (new Date()).getTime().toString();
        widgets.push(widget);
        res.json(widget);
    };





}