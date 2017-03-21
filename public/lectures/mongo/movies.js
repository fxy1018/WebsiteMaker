(function () {
    angular
        .module("MovieApp", [])
        .config(configuration)
        .controller("MovieController", MovieController);

    function configuration($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    }


    function MovieController($http) {
        var vm = this;
        vm.createMovie = createMovie;
        vm.deleteMovie = deleteMovie;
        vm.selectMovie = selectMovie;
        vm.updateMovie = updateMovie;

        function init() {
            findAllMovies();
        }
        init();


        function updateMovie(movie) {
            var movieId = movie._id;
            $http
                .put('/api/lectures/movie/' + movieId, movie)
                .then(findAllMovies);
        }

        function selectMovie(movieId){
            $http
                .get('/api/lectures/movie/' + movieId)
                .then(renderMovie);
        }

        function renderMovie(movie){
            vm.movie = movie.data;
        }

        function deleteMovie(movieId){
            $http
                .delete('/api/lectures/movie/' + movieId)
                .then(findAllMovies);
        }

        function findAllMovies() {
            $http
                .get('/api/lectures/movie')
                .then(renderMovies);
        }

        function renderMovies(movies) {
            vm.movies = movies.data;
            console.log(vm.movies);
        }



        function createMovie(movie) {
            $http
                .post("/api/lectures/movie", movie)
                .then(findAllMovies);
        }
    }
})();