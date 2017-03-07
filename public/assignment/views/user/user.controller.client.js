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
           var promise = UserService.findUserByCredentials(user.username, user.password);
           promise.success(function(loginUser){
               if(loginUser != null){
                   $location.url('/user/'+loginUser._id);
               } else {
                   vm.error = 'Unable to login';
               }
           });
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user){
            UserService
                .findUserByUsername(user.username)
                .success(function (user){
                    vm.error1 = "username has exist, try another one";
                })
                .error(function(){
                    UserService
                        .createUser(user)
                        .success(function(user){
                            console.log(user);
                            $location.url('/user/' + user._id);
                        })
                        .error(function () {
                            vm.error2 = 'sorry could not register, passwords are not same';
                        });
                });
        };
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        vm.userId = userId;
        vm.update = update;
        vm.delete = deleteUser;

        function init(){
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });
        };
        init();

        function deleteUser(user){
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = message;
                    });
            }
        }
        function update(newUser){
            UserService
                .updateUser(userId, newUser)
                .success(function(user){
                    if (user == null){
                        vm.error = "unable to update user";
                    }else {
                        vm.message= "user successfully update";
                    }
            });
        }
    }


})();