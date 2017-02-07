(function(){
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider){
        $routeProvider
            .when("/login",{
                templateurl:"/views/user/login.view.client.html"
            })
            .when("/",{
                templateurl:"/views/user/login.view.client.html"
            })
            .when("default",{
                templateurl:"/views/user/login.view.client.html"
            })
            .when("/register",{
                templateurl:"/views/user/register.view.client.html"
            })
            .when("/user/:uid",{
                templateurl:"/views/user/profile.view.client.html"
            })
            .when("/user/:uid/website",{
                templateurl:"/views/website/website-list.view.client.html"
            })
            .when("/user/:uid/website/new",{
                templateurl:"/views/website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid",{
                templateurl:"/views/website/website-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page",{
                templateurl:"/views/page/page-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateurl:"/views/page/page-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateurl:"/views/page/page-edit.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateurl:"/views/widget/widget-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateurl:"/views/widget/widget-chooser.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateurl:"/views/widget/widget-edit.view.client.html"
            })
    }
})();
