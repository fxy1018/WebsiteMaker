(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
           var loginUser = UserService.findUserByCredentials(user.username, user.password);
           if(loginUser != null){
               $location.url('/user/'+loginUser._id);
           } else {
               vm.error = 'Unable to login';
           }
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user){
            var newUser = UserService.createUser(user);
            if (newUser === "error1"){
                vm.error1 = "username has exist, try another one";
            }else if (newUser === "error2"){
                vm.error2 = "passwords are not same";
            }else{
                console.log(newUser);
                $location.url('/user/'+newUser._id);
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.userId = userId;
        vm.update = update;

        function update(newUser){
            var user = UserService.updateUser(userId, newUser);
            if (user == null){
                vm.error = "unable to update user";
            }else {
                vm.message= "user successfully update";
            }
        }

        var user = UserService.findUserById(userId);
        vm.user = user;

        console.log(user);



    }


})();