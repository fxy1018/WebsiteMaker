module.exports = function (app, models){
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pageModel = models.pageModel;

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(400).send();
            })
        // for (var p in pages){
        //     if (pages[p]._id == pageId){
        //         pages.splice(p,1)
        //         res.sendStatus(200);
        //         return
        //     }
        // }
    };


    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(pageId, page)
            .then(function(page){
                res.sendStatus(200);
            },function (err) {
                res.sendStatus(400).send();
            })

        // for (var p in pages){
        //     if (pages[p]._id == pageId){
        //         pages[p].name = page.name;
        //         pages[p].websiteId = page.websiteId;
        //         pages[p].description = page.description;
        //         res.sendStatus(200);
        //         return
        //     }
        // }
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(function(page){
                    console.log(page);
                    res.json(page);
                },function (err) {
                    res.sendStatus(400).send();
                }

            )
        // for (var p in pages){
        //     if (pages[p]._id === pageId){
        //         res.json(pages[p]);
        //         return
        //     }
        // }
        // res.sendStatus(404).send("not this page")
    };

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        pageModel
            .createPage(websiteId,page)
            .then(function(page){
                    res.json(page);
                },function (err) {
                    res.sendStatus(400).send();
                }
            )
        // page.websiteId = websiteId;
        // page._id = (new Date()).getTime().toString();
        // pages.push(page);
        // res.json(page);
    };

    function findPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function(pages){
                    res.json(pages);
                },function (err) {
                    res.sendStatus(400).send();
                }
            )

        // var sites = []
        // for (var p in pages){
        //     if (pages[p].websiteId = websiteId){
        //         sites.push(pages[p])
        //     }
        // }
        // res.json(sites);
    // };

    }
}