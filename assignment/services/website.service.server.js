module.exports = function (app) {
    app.get('/api/website/:websiteId', findWebsiteById);
    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite );
    var websites =[
        { "_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem" }
    ];

    function deleteWebsite(req,res){
      var websiteId = req.params.websiteId;
      for (var w in websites) {
          if (websites[w]._id === websiteId) {
              websites.splice(w, 1);
              res.sendStatus(200)
              return
          };
      };
      res.sendStatus(404).send("can't delete")
    };




    function updateWebsite(req,res) {
        var newWebsite = req.body;
        var websiteId = req.params.websiteId;
        for (var w in websites){
            if (websites[w]._id === websiteId){
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.sendStatus(200);
                return
            }
        }
    };

    function createWebsite(req,res) {
        var userId = req.params.userId;
        var website = req.body;
        website.developerId = userId;
        website._id = (new Date()).getTime().toString();
        // console.log(website);
        websites.push(website);
        // console.log(websites);
        res.json(website);
    };



    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for (var w in websites){
            if (websites[w].developerId == userId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    };


    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w){
            return w._id == websiteId;
        })
        if (website) {
            res.json(website);
        } else{
            res.sendStatus(404).send("the website doesn't exist");
        };
   };
};

