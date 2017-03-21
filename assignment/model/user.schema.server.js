var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    website:[{type: mongoose.Schema.Types.ObjectId, ref: 'WebAppWebsite'}]
}, {collection:'WebsiteApp.User'});

module.exports = userSchema;

