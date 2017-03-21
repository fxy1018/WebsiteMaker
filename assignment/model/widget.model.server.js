var mongoose = require('mongoose');
var widgetSchema = require('./weiget.schema.server');
var widgetModel = mongoose.model('WebAppWidget',  widgetSchema);
var q = require('../../node_modules/q/q');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;

    var d = q.defer();

    widgetModel.create(widget, function(err, widget){
        if (err){
            d.reject(err);
        }else{
            d.resolve(widget);
        }
    });
    return d.promise;
}

function findAllWidgetsForPage(pageId) {
    var d = q.defer();

    widgetModel
        .find({_page:pageId}, function (err, widgets) {
            if(err){
                d.reject(err);
            } else {
                d.resolve(widgets);
            }
        });
    return d.promise;
}

function findWidgetById(widgetId) {
    var d = q.defer();

    widgetModel.findOne({_id: widgetId}, function (err, widget) {
        if (err){
            d.reject(err);
        } else {
            console.log(widget);
            d.resolve(widget);
        }
    })
    return d.promise;
}



function updateWidget(widgetId, widget) {
    var d = q.defer();

    // widgetModel.update({_id: widgetId}, {$set: {name: widget.name, title: widget.title, description: widget.description}}, function(err, widget){
    //     if (err) {
    //         d.reject(err);
    //     } else {
    //         d.resolve(widget);
    //     }
    // });
    return d.promise;
}

function deleteWidget(widgetId) {
    var d = q.defer();

    widgetModel
        .remove({_id:widgetId}, function (err, status) {
            if (err){
                d.reject(err);
            }else {
                d.resolve(status);
            }
        });
    return d.promise;
}

function reorderWidget(pageId, start, end){
    var d = q.defer();

    widgetModel
}
