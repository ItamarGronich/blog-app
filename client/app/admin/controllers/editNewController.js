(function (app, $) {
	
	app.controller('editNewController', editNewController);

	function editNewController($routeParams, postsService, posts, mdFile) {

		var location = $routeParams.method,
			that = this;


		function ifEdit() {
			if ( !( mdFile && mdFile.fileName && mdFile.content ) ) {
				that.header = 'something wen\'t wrong and we could not get your post.';
			}

			var post;

			for (var key in posts) {
				if (posts.hasOwnProperty(key) && posts[key] !== undefined) {
					post = posts[key];
				}
			}

			that.mdFile = mdFile.content;
			that.header = 'Edit Post';
			that.title = post.title;
			that.author = post.author;
			that.description = post.description;
			that.tags = post.tags.join(', ');
		}

		function ifNew() {
			that.header = 'New Post';

		}


		// Switch function.
		(function (location) {
			if (location === 'edit'){
				ifEdit();
			} else if (location === 'new') {
				ifNew();
			}
		})(location);
		
	}

	editNewController.$inject = ['$routeParams', 'postsService', 'posts', 'mdFile'];

})(angular.module('blogApp'), jQuery);