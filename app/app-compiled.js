(function () {

    // load callback
    function loadData(r) {
        var scope = this;
        r({ method: 'GET', url: '../data/posts.json' }).then(function (e) {
            scope.posts = e.data.posts;
        });
    }

    // route callback
    function configRouter(route) {
        route.when('/', {
            redirectTo: '/posts'
        }).when('/posts', {
            templateUrl: '/app/posts/templates/posts.html'
        }).when('/admin', {
            templateUrl: '/app/admin/templates/admin.html'
        }).otherwise({
            redirectTo: '/posts'
        });
    }

    // injection
    loadData.$inject = ['$http'];
    configRouter.$inject = ['$routeProvider'];

    // initiallize app with config
    angular.module('blogApp', ['ngRoute', 'ngSanitize']).config(configRouter).controller('dataController', loadData);
})();

//# sourceMappingURL=app-compiled.js.map