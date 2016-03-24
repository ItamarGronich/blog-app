(function (app, $) {


	app.controller('navbarController', navbarController);

	function navbarController($location, $route, $rootScope) {

		var $links = $( '#navbarLinks').find('a');

		function getCurrentPath(){
			return $location.path().replace(/[\W\s\d]/g, '');
		}

		$rootScope.$onRootScope('$routeChangeStart', renderState);

		function renderState() {
			var path = getCurrentPath();

			
			$links.each(function () {
				var $el = $( this ),
					isElement = $el.text().toLowerCase() === path;


					$el.parent().toggleClass('active', isElement);

			});


		}



		function changeTabs(event) {
			var $el  = $( event.target );

			if ($el.text().toLowerCase() === 'posts' ) {
				$location.path('/posts/')
			} else {
				$location.path('/admin/')
			}

		}

		this.changeTabs = changeTabs;



	}

	navbarController.$inject = ['$location', '$route', '$rootScope'];


})(angular.module('blogApp'), jQuery);