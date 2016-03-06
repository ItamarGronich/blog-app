(function (app) {
	app.controller('sideBarController', sideBarController);


	var currentActive = document.body.querySelector('#showAllPosts');

	function sideBarController($scope, postsService, pagination) {
		var that = this;
		function assignAllVars(obj){
			that.allPosts = obj.posts;
			that.tags = obj.tags;
			that.authors = obj.authors;

			that.dates = [];

			for (var year in obj.dates) {
				var arr = [year];
				for (var month in obj.dates[year]) {
					arr.push([month, obj.dates[year][month]])
				}
				that.dates.push(arr);
			}

			console.log(that.dates)
		}


		/**
		 * IFI ** start at instantiation **
		 */
		this.waitForPosts = (function (){
			if (typeof postsService.getPosts().then === 'function') {
				return postsService.getPosts()
					.then(function(posts){
						assignAllVars({
							posts: posts,
							tags: postsService.getTags(),
							authors: postsService.getAuthors(),
							dates: postsService.getDates()
						}) ;
					})
			} else {

				assignAllVars({
					posts: postsService.getPosts(),
					tags: postsService.getTags(),
					authors: postsService.getAuthors(),
					dates: postsService.getDates()
				})
			}
		})();



		this.clicker = function (e) {
			if (currentActive){
				currentActive.classList.remove('active');
			}

			currentActive = e.target;
			e.target.classList.add('active')
		};


	}

	sideBarController.$inject = ['$scope', 'postsService', 'pagination']
})(angular.module('blogApp'));