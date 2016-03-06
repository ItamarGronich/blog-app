/*
* ===========================================================================================================
*  This service takes care of url and routing related tasks
* ===========================================================================================================
* */


(function (app) {

    function genUrl($route, $routeParams, postsService ) {

        /**
         * @function initUrl - inspects the current url and the length of the filtered posts
         *                     and adjusts the url if necessary.
         * @returns {Promise.<T> | Array } if the request is still unresolved function will return a promise.
         *                                 if request is resolved returns the data from the request (Array of posts.)
         */
        function initUrl() {
            if (typeof postsService.getPosts().then === 'function') { // checks if postsService.getPosts() is a promise
                return postsService.getPosts().then(function (data) { // returns promise so router will wait for resolve
                    if (data.length > postsService.postsPerPage()) {
                        $route.updateParams({pageNumber: parseInt($route.current.params.pageNumber) || 1});
                    } else {
                        $route.updateParams({pageNumber: undefined});
                    }
                })
            } else { // postsService.getPosts() isn't a promise so data is already there
                if (postsService.getPosts().length > postsService.postsPerPage()) {
                    $route.updateParams({pageNumber: parseInt($route.current.params.pageNumber) || 1})
                } else {
                    $route.updateParams({pageNumber: undefined});
                }
            }


        }



        /**
         * @function onlyHyphen used to generate the single post url-namespace from
         *                      the path of the file on the server.
         *                      takes a string splits and reformats it to the file
         *                      name with hyphens as word delimiters
         * @param string {String} - a string of a url.
         * @returns {string} - a string containing the name of the requested file
         *                     but with hyphens as word delimiters.
         * @example - 'data/posts/html/jQuery - Events, Ajax.html' => 'jQuery-Events-Ajax'
         */
        function onlyHyphen(string) {
            string = string.slice(string.lastIndexOf('/')+1, string.lastIndexOf('.'));
            return string.replace(/([\s\W])+/g,"-");
        }


        /**
         * @function the opposite of
         * @param url
         * @returns {XML|string|void|*}
         */
        function hyphenUrlToUrl(url) {
            return url.replace(/([\w\-]+)$/, function (match) {
                var arr = match.split('-');
                arr.splice(0, 2, arr[0] + '-' + arr[1]);
                return arr.join(',');
            })
        }

        this.initUrl = initUrl;

        this.onlyHyphen = onlyHyphen;

        this.hyphenUrlToUrl = hyphenUrlToUrl;
    }

    genUrl.$inject = ['$route','$routeParams', 'postsService'];

    app.service('pagination', genUrl );

})(angular.module('blogApp'));