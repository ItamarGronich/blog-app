(function (app) {
	app.controller('sideBarController', sideBarController);

	function sideBarController($scope, postsService, pagination) {
		var that = this;
		function assignAllVars(posts){
			that.allPosts
		}

		this.waitForPosts = function (){
			if (typeof postsService.getPosts().then === 'function') {
				return postsService.getPosts()
					.then(function(posts){
						return posts;
					})
			} else {
				return postsService.getPosts();
			}
		};


	}

	sideBarController.$inject = ['$scope', 'postsService', 'pagination']
})(angular.module('blogApp'));