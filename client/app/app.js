(function () {



    // route callback
    function configApp($routeProvider , $provide) {

        $provide.decorator('$rootScope', ['$delegate', function ($delegate) {

            Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
                value: function(name, listener){
                    var unsubscribe = $delegate.$on(name, listener);
                    this.$on('$destroy', unsubscribe);

                    return unsubscribe;
                },
                enumerable: false
            });

            return $delegate;
        }]);


        /*========================================
        *       Marked Library Configuration
        * ======================================== */

	    marked.setOptions({
		    // GitHub Flavored Markdown
		    gfm: true,
		    // GFM tables
		    tables: true,
		    // GFM line breaks
		    breaks: true,
		    // Better lists handling
		    smartLists: true,
		    // Better punctuation handling
		    smartypants: true,
		    // Code blocks language prefix (reset default)
		    langPrefix: '',
		    // Prefix for headings ID's
		    headerPrefix: 'hid-',
		    highlight: false
	    });


	    /*========================================
	     *       Marked Library Configuration
	     * ======================================== */
        $routeProvider
            .when('/', {
                redirectTo: '/posts/:pageNumber'
            })
            .when('/posts/:pageNumber?', {
                templateUrl: '/app/posts/templates/posts-board.html',
                controller: 'postsController as data',
                resolve: {
                    posts: function (postsService){
                        return postsService.getPosts();
                    },
                    genUrl: function (pagination) {
                        return pagination.initUrl();
                    }
                }
            })
            .when('/post/:postTitle', {
                template: '<section class="col-md-8"><div data-ng-bind-html="data.post"></div></section>',
                controller: 'singlePostController as data',
                resolve: {
                    post: function (postsService, pagination , $route) {
                        var fileName = $route.current.params.postTitle,
                            url = 'data/get-full-post/' + fileName;
                        return postsService.getSinglePost(url);
                    }
                }
            })
            .when('/admin/', {
                templateUrl: '/app/admin/templates/admin.html',
                controller: 'adminController as admin',
                resolve: {
		            posts: function (postsService){
			            return postsService.getPosts();
		            }
	            }
            })
	    .when('/admin/:method/post/:postTitle?',{
		    templateUrl: 'app/admin/templates/new-edit.html',
		    controller: 'editNewController as edit',
		    resolve: {
			    posts: function(postsService){
				    return postsService.getPosts();
			    },
			    mdFile: function ($route, $http) {
				    if ($route.current.params.postTitle) {
					    return $http({
						    method: 'GET',
						    url: 'data/get-md-file/' + $route.current.params.postTitle
					    })
					    .then(function (promise) {
						    var url = promise.config.url,
						    mdFile = {
							    fileName: url.slice(url.lastIndexOf('/')),
						        content: promise.data
						    };

						    console.log(mdFile);
						    

						    return mdFile;
					    });
				    }
			    }
		    }
	    })
    }


    // injection

    configApp.$inject = ['$routeProvider', '$provide'];

    // initiallize app with config
    angular.module('blogApp', ['ngRoute', 'ngSanitize', 'angular-toArrayFilter'])
        .config(configApp)
}());
