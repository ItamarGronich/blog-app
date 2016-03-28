(function (app ,$) {
	app.controller('sideBarController', sideBarController);




	function sideBarController($location, postsService, pagination, $rootScope, $scope, $timeout) {
		var that = this,
			$sidebar = $('#sidebar');

		/**
		 * Gets a data object
		 */
		function assignAllVars(){

			var datesObj = postsService.getDates();

			console.log('run');
			that.numberOfAllPosts = postsService.getNumberOfAllPosts();
			that.tags = postsService.getTags();
			that.authors = postsService.getAuthors();

			that.dates = [];

			for (var year in datesObj) {
				var arr = [year];
				for (var month in datesObj[year]) {
					arr.push([month, datesObj[year][month]])
				}
				that.dates.push(arr);
			}

		}


		/**
		 * IFI ** start at instantiation **
		 */
		function instantiateData(){
			if (typeof postsService.getPosts().then === 'function') {

				return postsService.getPosts()
					.then(assignAllVars);

			} else {
				assignAllVars();
			}
		}


		var decideActiveState = (function () {

			var $currentActive ;

			var activeClass = 'active';

			/**
			 * removes the old active $el and assigns the provided
			 * @param $el
			 */
			function toggleActive($el){
				if ($currentActive) {$currentActive.removeClass(activeClass);}
				$currentActive = $el.addClass(activeClass);
			}

			function findInContext(context, query) {

				var re = new RegExp('\\W' + query + '\\W', 'i');
				console.log(re);
				
				return $sidebar.find(context).find('a').filter(function(){
					console.log(this);
					console.log('match: ', $(this).text().search(re));
					
					if ($(this).text().search(re) !== -1){
						console.log($(this).text().search(re));
						
						return true;
					}
				});

			}

			return function(params) {
				console.log(params);
				
				if(params.hasOwnProperty('category')) {
					var $selectedCategory = findInContext('#categories', params.category);
					toggleActive($selectedCategory);

				} else if(params.hasOwnProperty('author')) {
					var $selectedAuthor = findInContext('#authors', params.author.split('-').join(' '));
					toggleActive($selectedAuthor);

				} else if(params.hasOwnProperty('month')) {
					var $selectedMonth = findInContext('#months', params.month.slice(0,3));
					toggleActive($selectedMonth);

				} else {
					toggleActive($sidebar.find('#showAllPosts'));
				}

			};

		})();


		this.searchVal = '';


		this.submitSearch = function(event){
			var that = this;
			event.stopPropagation();
			var re = /(['"])/g;
			var searchValEscaped = this.searchVal.replace(re, '&#8217');
			
			$location.search({search: searchValEscaped });

		};

		$scope.$on('$routeChangeSuccess', function($event, current, previous) {
			console.log(current.params);

			var currentLocation = $location.path().split('/').slice(0, 3).join('/'),
			    pathEdit        = '/admin/edit',
			    pathNew         = '/admin/new';

			$sidebar.toggleClass('collapse', (currentLocation === pathEdit || currentLocation === pathNew));

			instantiateData();

			$timeout(function () {
				decideActiveState(current.params);
			});
		});



		this.updateUrl = pagination.updateUrl;
	}
	
	
	


	sideBarController.$inject = ['$location', 'postsService', 'pagination', '$rootScope', '$scope', '$timeout']


})(angular.module('blogApp'), jQuery);