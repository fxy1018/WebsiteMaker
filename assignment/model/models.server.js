var userModel = require('./user.model.server');
var websiteModel = require('./website.model.server');
var pageModel = require('./page.model.server');
var widgetModel = require('./widget.model.server');
var models = {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel
};

module.exports = models;
