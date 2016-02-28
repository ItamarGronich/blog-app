(function (app) {

    app.service('postsService', postsService);

    function postsService($http, $sanitize){

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
            fullPosts = {};

        /**
         * @function stores the HTML fragment in the fullPosts Data base.
         * @param name {String} *Required - represents the file name of the HTML fragment.
         *                                  WILL BE USED TO CREATE KEY IN DATA BASE FOR THE FRAGMENT.
         * @param html {String} *Required - a html fragment string.
         * @returns {String} html fragment - a string representing the sanitized html fragment.
         */
        function storeFullPost(name, html){
            if (typeof name !== 'string' && typeof html !== 'string') {
                throw new TypeError('name, & html arguments are not provided or are not strings', 'postsService.js', 13);
            }

             return fullPosts['' + name] = '' + html;
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

        function filterPosts(filter) {
            if (filter) {
                filteredPosts = posts.filter(function(){});
            } else {
                filteredPosts = posts/*.slice(1,2)*/;
            }
        }

        function getPosts() {
            return filteredPosts ||
                $http({method: 'GET', url: '../../data/posts.json'})
                .then(function (e) {
                    posts = e.data.posts;
                    filterPosts();
                    return filteredPosts.sort(function (a, b ) {
                        return b.date - a.date;
                    });
                });
        }

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

        this.postsPerPage = function(){ return postsPerPage};
    }

    postsService.$inject = ['$http', '$sanitize'];

})(angular.module('blogApp'));