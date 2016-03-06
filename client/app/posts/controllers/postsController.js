(function (app, $) {

    // load callback
    function postsController(posts, $routeParams, postsService, $route) {
        // call loadData service
        var that = this;
        this.posts = posts;

	    this.postsPerPage = postsService.postsPerPage();

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

	    function pageCtrl(event) {
		    var $el = $(event.currentTarget);

		    if ($el.hasClass('next')) {
			    console.log('should go up');
			    
			    $route.updateParams({pageNumber: ++$routeParams.pageNumber});
		    } else if ($el.hasClass('previous')) {
			    console.log('should go down');
			    
			    $route.updateParams({pageNumber: --$routeParams.pageNumber});
		    }
	    }

	    this.pageCtrl = pageCtrl;


    }

    postsController.$inject = ['posts', '$routeParams', 'postsService', '$route'];


    app.controller('postsController', postsController);

})(angular.module('blogApp'), jQuery);