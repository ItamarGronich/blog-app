(function (app) {
	app.controller('sideBarController', sideBarController);


	var currentActive = document.body.querySelector('#showAllPosts');

	function sideBarController($location, postsService, $sanitze) {
		var that = this;
		function assignAllVars(obj){
			that.numberOfAllPosts = obj.numberOfAllPosts;
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
							numberOfAllPosts: postsService.getNumberOfAllPosts(),
							tags: postsService.getTags(),
							authors: postsService.getAuthors(),
							dates: postsService.getDates()
						}) ;
					})
			} else {

				assignAllVars({
					numberOfAllPosts: postsService.getNumberOfAllPosts(),
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

		this.searchVal = '';

		console.log(this.searchVal);


		this.submitSearch = function(event){
			var that = this;
			event.stopPropagation();
			var re = /(['"])/g;
			var searchValEscaped = this.searchVal.replace(re, '&#8217');


			console.log(searchValEscaped);
			
			$location.search({search: searchValEscaped });

		}


	}

	sideBarController.$inject = ['$location', 'postsService', '$sanitize']
})(angular.module('blogApp'));