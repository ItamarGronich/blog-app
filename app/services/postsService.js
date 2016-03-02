(function (app) {

    app.service('postsService', postsService);

    function postsService($http, $sanitize, $filter){

        /**
         * @Private - all private Data
         *
         * @posts {Array[Objects]} - Holds all posts data
         * @filteredPosts {Array[Objects]} - holds all filtered posts ordered by date
         * @postsPerPage Constant {Number} represents the amount of posts that are
         *                                 allowed to be displayed per page.
         */
        var posts,
            filteredPosts, // POSSIBLY DEPRECATED
            postsPerPage = 3,
            fullPosts = {},

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


	        console.dir(dates);
          /*  postsArr.forEach(function(post){

            });*/

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
            return Math.ceil( posts.length / 3 );
        }


	    /*
	    *
	    * ====== POSSIBLY DEPRECATED ===
	    * */
        function filterPosts(filter) {
            if (filter) {
                filteredPosts = posts.filter(function(){});
            } else {
                filteredPosts = posts.slice(1,2);
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
                return $http({method: 'GET', url: '../../data/posts.json'})
                    .then(function (e) {
                        posts = e.data.posts;
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
                        return posts.sort(function (a, b ) {
                            return b.date - a.date;
                        });
                    });
            }

            return function switchFunction(newRequest) {
                if (newRequest) {
                    return sortedByDate(sendRequest);

                } else {
                    return posts ||
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
    }

    postsService.$inject = ['$http', '$sanitize', '$filter'];

})(angular.module('blogApp'));