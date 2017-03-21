var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebAppWebsite', websiteSchema);
var q = require('../../node_modules/q/q');

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
    var d = q.defer();

    website._user = userId
    websiteModel.create(website, function(err, website){
        if (err){
            d.reject(err);
        }else{
            d.resolve(website);
        }
    });
    return d.promise;
}

function findAllWebsitesForUser(userId) {
    var d = q.defer();

    websiteModel
        .find({_user:userId}, function (err, websites) {
            if(err){
                d.reject(err);
            } else {
                d.resolve(websites);
            }
        });
    return d.promise;
}

function findWebsiteById(websiteId) {
    var d = q.defer();

    websiteModel.findOne({_id: websiteId}, function (err, website) {
        if (err){
            d.reject(err);
        } else {
            d.resolve(website);
        }
    })
    return d.promise;
}



function updateWebsite(websiteId, website) {
    var d = q.defer();

    websiteModel.update({_id: websiteId}, {$set: {name: website.name, description: website.description}}, function(err, user){
        if (err) {
            d.reject(err);
        } else {
            d.resolve(website);
        }
    });
    return d.promise;
}

function deleteWebsite(websiteId) {
    var d = q.defer();

    websiteModel
        .remove({_id:websiteId}, function (err, status) {
            if (err){
                d.reject(err);
            }else {
                d.resolve(status);
            }
        });
    return d.promise;
}

