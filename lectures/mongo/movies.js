module.exports=function(app){
    app.post('/api/lectures/movie', createMovie);
    app.get('/api/lectures/movie', findAllMovies);
    app.delete('/api/lectures/movie/:movieId', deleteMovie);
    app.get('/api/lectures/movie/:movieId', findMovieById);
    app.put('/api/lectures/movie/:movieId', updateMovieById);

    var mongoose = require('mongoose');
    var MovieSchema = mongoose.Schema({
        title: String,
        director: String,
        rating: String,
        created: Date
    }, {collection:'movie'});

    var MovieModel = mongoose.model('MovieModel', MovieSchema);


    function updateMovieById(req, res) {
        var movieId = req.params.movieId;
        var movie = req.body;
        MovieModel
            .update({_id: movieId}, {$set: {title: movie.title}})
            .then(
                function (status) {
                    res.json(status);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }

            );
    }


    function findMovieById(req, res){
        var movieId = req.params.movieId;
        MovieModel
            .findById(movieId)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }

            );
    }


    function deleteMovie(req, res) {
        var movieId = req.params.movieId;
        MovieModel
            .remove({_id: movieId})
            .then(
                function (movie) {
                    res.send(200);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }

            )

    }
    function findAllMovies(req, res) {
        MovieModel
            .find()
            .then(
                function (movies) {
                    console.log(movies)
                    res.json(movies);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function createMovie(req, res) {
        var movie = req.body;

        console.log(movie);
        MovieModel
            .create(movie)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (err) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    // MovieModel.create({title: 'The Abyss'});
    // MovieModel.create({title: 'Terminator'});
    // var promise = MovieModel.find();
    // promise.then(
    //     function (movies) {
    //         console.log(movies);
    //     },
    //     function (error) {
    //
    //     }
    // )
};