(function (app) {

    // load callback
    function postsController(posts, $routeParams, postsService, $scope) {
        // call loadData service
        var that = this;
        this.posts = posts;

	    this.getPosts = postsService.getPosts;

        this.pageNumber = parseInt($routeParams.pageNumber);

        this.btnShow = function (string){

            var pageNum = that.pageNumber || 1;

            if (string === 'prev') {
                if (pageNum === 1) {
                    return false;

                } else {

                    return true;
                }
            }

            if (string === 'next') {
                if (pageNum < postsService.getNumberOfPages()) {
                    return true;
                } else {
                    return false;
                }
            }
        };


    }

    postsController.$inject = ['posts', '$routeParams', 'postsService', '$scope'];


    app.controller('postsController', postsController);

})(angular.module('blogApp'));