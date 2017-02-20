(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService() {
        var users= [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
        ];
        var api = {
            "users" : users,
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        function createUser(user){
            for (var u in users){
                if (user.username === users[u].username){
                    return "error1";
                }
            }
            if (user.password != user.verifiedpassword){
                return "error2";
                }
            else {
                user._id = (new Date()).getTime().toString();
                users.push(user);
                return angular.copy(user);
            }
        }

        function findUserById(userId){
            for (var u in users){
                var user = users[u];
                if (user._id === userId){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for (var u in users){
                var user = users[u];
                if (user.username === username) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password){
            for (var u in users){
                var user = users[u];
                if (user.username === username &&
                    user.password === password){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userId, newUser){
            for (var u in users){
                var user = users[u];
                if (user._id === userId){
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId){
            for (var u in users){
                var user = usrs[u];
                if (user._id === userId){
                    users.splice(u,1);
                }
            }
        }
    }
})();