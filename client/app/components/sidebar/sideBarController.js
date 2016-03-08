(function (app) {
	app.controller('sideBarController', sideBarController);


	var currentActive = document.body.querySelector('#showAllPosts');

	function sideBarController($location, postsService, pagination, $rootScope) {
		var that = this,
			$sidebar = $('#sidebar');
		
		
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


		this.submitSearch = function(event){
			var that = this;
			event.stopPropagation();
			var re = /(['"])/g;
			var searchValEscaped = this.searchVal.replace(re, '&#8217');
			
			$location.search({search: searchValEscaped });

		};

		$rootScope.$on('$routeChangeSuccess', function(a,b,c){

			var currentLocation = $location.path().split('/').slice(0,3).join('/'),
				pathEdit = '/admin/edit',
				pathNew = '/admin/new';

			$sidebar.toggleClass('collapse', (currentLocation === pathEdit || currentLocation === pathNew))
		});



		this.updateUrl = pagination.updateUrl;
	}
	
	


	sideBarController.$inject = ['$location', 'postsService', 'pagination', '$rootScope']
})(angular.module('blogApp'));