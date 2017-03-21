var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('WebAppPage', pageSchema);
var q = require('../../node_modules/q/q');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;

    var d = q.defer();

    pageModel.create(page, function(err, page){
        if (err){
            d.reject(err);
        }else{
            d.resolve(page);
        }
    });
    return d.promise;
}

function findAllPagesForWebsite(websiteId) {
    var d = q.defer();

    pageModel
        .find({_website:websiteId}, function (err, pages) {
            if(err){
                d.reject(err);
            } else {
                d.resolve(pages);
            }
        });
    return d.promise;
}

function findPageById(pageId) {
    var d = q.defer();

    pageModel.findOne({_id: pageId}, function (err, page) {
        if (err){
            d.reject(err);
        } else {
            console.log(page);
            d.resolve(page);
        }
    })
    return d.promise;
}



function updatePage(pageId, page) {
    var d = q.defer();

    pageModel.update({_id: pageId}, {$set: {name: page.name, title: page.title, description: page.description}}, function(err, page){
        if (err) {
            d.reject(err);
        } else {
            d.resolve(page);
        }
    });
    return d.promise;
}

function deletePage(pageId) {
    var d = q.defer();

    pageModel
        .remove({_id:pageId}, function (err, status) {
            if (err){
                d.reject(err);
            }else {
                d.resolve(status);
            }
        });
    return d.promise;
}

