(function (app) {

    app.service('postsService', postsService);

    function postsService($http, $sanitize, $location, $filter){

	    

        /**
         * @Private - all private Data
         *
         * @posts {Array[Objects]} - Holds all posts data
         * @filteredPosts {Array[Objects]} - holds all filtered posts ordered by date
         * @postsPerPage Constant {Number} represents the amount of posts that are
         *                                 allowed to be displayed per page.
         */
        var posts,
            filteredPosts,
            postsPerPage = 3,
            fullPosts = {},
	        slugs, // on Object of slugs every key is an array with two props 0: slug 1: number of copies

            /*
            * ======= Filtered Objects ======
            *
            * will hold the posts filtered by different categories
            * */
            tags = {},
            authors = {},
            dates = {};


	    


        /**
         * @function stores the HTML fragment in the fullPosts Data base.
         * @param name {String} *Required - represents the file name of the HTML fragment.
         *                                  WILL BE USED TO CREATE KEY IN DATA-BASE FOR THE FRAGMENT.
         * @param html {String} *Required - a html fragment string.
         * @returns {String} html fragment - a string representing the sanitized html fragment.
         */
        function storeFullPost(name, html){
            if (typeof name !== 'string' && typeof html !== 'string') {
                throw new TypeError('name & html arguments are not provided or are not strings', 'postsService.js', 13);
            }

             return fullPosts['' + name] = '' + html;
        }

        function splitToCatagories(postsArr) {

	        for (var i = 0; i < postsArr.length; i++) {
		        (function(post) {

			        var date = new Date(parseInt(post.date)),
			            year = date.getFullYear(),
			            month = date.getMonth();


			        authors[post.author] ? authors[post.author].push(post): authors[post.author] = [post];


			        if (dates[year]){
				        dates[year][month] ? dates[year][month].push(post) : dates[year][month] = [post];


			        } else {
				        dates[year] = {};

				        dates[year][month] = [post];
			        }


			        post.tags.forEach(function(tag){
				        tags[tag] ? tags[tag].push(post) : tags[tag] = [post];
			        });

		        })(postsArr[i]);
	        }


        }


        /**
         * @function get full post - gets the full post if found on the fullPosts object.
         * @param name {String} the exact name of the post
         * @returns {String} a html fragment of the desired post.
         */
        function getFullPost(name) {
            return fullPosts['' + name];
        }

        function getNumberOfPages() {
            return Math.ceil( filteredPosts.length / 3 );
        }



        function runQuery(location) {
	        var params = location.search();

	        var query = Object.keys(params).find(function(param){
		        return param === 'category' ||
			           param === 'author'   ||
			           param === 'search'   ||
			           param === 'month';
	        });


	        switch (query){
		        case 'category' :
			        return filteredPosts = $filter('filter')(posts,{tags: params[query]}, false);
			        break;
		        case 'author' :
			        return filteredPosts = $filter('filter')(posts,{author: params[query].replace('-', ' ')}, false);
			        break;
		        case 'month' :
			        return filteredPosts = $filter('filter')(posts, function(post){
				        var filterString = params[query].split('-'),
				            postDate = new Date(parseInt(post.date)),
				            filterDate = new Date(filterString[0] + ' 01 ' + filterString[1]);
				        

				        return postDate.getFullYear() === filterDate.getFullYear() && postDate.getMonth() === filterDate.getMonth();   
			        }, false);
			        break;
		        case 'search':
			        return filteredPosts = $filter('filter')(posts, params[query], false);
		            break;
		        default:
			        return filteredPosts = posts;
			        break;

	        }

        }


	    /**
	     * getPosts module
         *
         * @param newRequest [optional] if truthy always issues a new request
         * @returns {Promise | Array | } a switch function that either
         *          returns a promise (if data hasn't arrived yet) or an Array
         *          of the posts objects sorted by date.
         */
        var getPosts = (function () {

            function sendRequest(){
                return $http({method: 'GET', url: 'data/get-posts'})
                    .then(function (e) {
                        posts = e.data.posts;
	                    slugs = e.data.slugs;
	                    splitToCatagories(posts);
                    });
            }

            var getPostsJson = (function () {
                var request;
                return function() {
                    if (!request){
                        request = sendRequest();
                    }
                    return request;
                }
            })();

            function sortedByDate(fn) {
                return fn()
                    .then(function(){
                        posts.sort(function (a, b ) {
                            return b.date - a.date;
                        });


	                    return runQuery($location);

                    });
            }

            return function switchFunction(newRequest) {
                if (newRequest) {
                    return sortedByDate(sendRequest);

                } else {
                    return runQuery($location) ||
                        sortedByDate(getPostsJson);
                }
            }
        })();


        /**
         * @function get file name - extracts the filename from a url
         * @param url {String} - the path to the file
         * @returns {String} - the filename and extension
         */
        function getFileName(url) {
            return url.match(/[^\/]+$/).join('');
        }



        /**
         * @function get single post - gets the desired post from the path, sanitizes it,
         *                             stores it in the fullPosts object and returns it.
         * @param path {String} - the path to the file on the server
         * @returns post {String} - a sanitized ($sanitize) html string.
         */
        function getSinglePost(path) {
            var fileName = getFileName(path),
                postExists = getFullPost(fileName);

            if (postExists) {
                console.log('loaded existing data');
                return postExists;
            }

            // gets post
            return $http({method: 'GET', url: path})
                        .then(function (response) {
                            console.log('loaded data from the server');
                            var html = $sanitize(response.data); // sanitizes retrieved html
                            return storeFullPost(fileName, html); // stores and returns the html fragment.
                        });
        }

	    function onlyWords(string) {
		    return string.replace(/\W*/g, '');

	    }


        /**
         * API
         * @exports
         */
        this.getSinglePost = getSinglePost;

        this.getNumberOfPages = getNumberOfPages;

        this.getPosts = getPosts;

        this.returnPosts = function (){return posts};

        this.postsPerPage = function(){ return postsPerPage};

	    this.getTags = function (){return tags;};

	    this.getAuthors = function (){return authors;};

	    this.getDates = function (){return dates;};

	    this.getNumberOfAllPosts = function () {
		    return posts.length;
	    };

	    this.onlyWords = onlyWords;
    }

    postsService.$inject = ['$http', '$sanitize', '$location', '$filter'];

})(angular.module('blogApp'));