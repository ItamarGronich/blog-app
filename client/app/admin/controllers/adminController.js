(function (app, $) {

	app.controller('adminController', adminController);

	function adminController(postsService, posts, $location    ) {

		var admin = this,
		    orderBy = 'date',
		    orderDirection = true,
			tableHeads = $( 'thead' ).find( 'th' ),
			arrow = $( '<i></i>' );

		admin.posts = posts;

		admin.order = '-date';





		function order(){
			var re = /[\s\-]/g;
			if (orderDirection) {
				return admin.order = '-' + orderBy.replace(re, '');
			} else {
				return admin.order = orderBy.replace(re, '');
			}
			
		}

		function changeOrder (by) {

			if (typeof by !== 'string') {
				throw new TypeError('changeOrder function in adnimController : "by" argument must be a string');
			}

			orderBy = by.toLowerCase();

			order();
		}

		function changeDirection() {
			orderDirection = !orderDirection;
			order();
		}

		function clickedOnFilter(event) {
			var $el = $( event.target );

			if ($el.text().toLowerCase() === orderBy) {
				changeDirection();
			} else {
				changeOrder($el.text());
			}

			appendArrow();

		}

		function appendArrow(){
			var direction = orderDirection && 'down' || !orderDirection && 'up',
				className = "glyphicon glyphicon-chevron-" + direction,
				arrowEl = arrow.removeClass().addClass(className);


			tableHeads
				.filter(function (){
					var el = this;
					return postsService.onlyWords(el.textContent.toLowerCase())=== postsService.onlyWords(orderBy);
				})
				.children()
				.append(arrowEl);
		}

		function goToPost(event){
			var slug = angular.element(event.target).scope().post.slug,
				path = '/admin/edit/post/' + slug;
			$location.path(path);
			

		}

		appendArrow(); // appending arrow to the default category

		admin.clickedOnFilter = clickedOnFilter;

		admin.goToPost = goToPost;


	}

	adminController.$inject = ['postsService', 'posts', '$location'];
})(angular.module('blogApp'), jQuery);