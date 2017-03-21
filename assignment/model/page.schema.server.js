var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website: {type:mongoose.Schema.Types.ObjectId, ref:'WebAppWebsite'},
    name: String,
    title: String,
    description: String,
    widgets: {type: mongoose.Schema.Types.ObjectId, ref:'WebAppWidget'},
    dateCreated: Date
}, {collections: "WebsiteApp.page"});

module.exports = pageSchema;

