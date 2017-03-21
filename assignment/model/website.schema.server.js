var mongoose = require('mongoose');
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref:'WebAppUser'},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref:'WebAppPage'}],
    dateCreated: Date
}, {collection: 'WebsiteApp.Website'});

module.exports = websiteSchema;

