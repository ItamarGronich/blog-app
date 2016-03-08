(function (app, $, marked) {
	
	app.controller('editNewController', editNewController);

	function editNewController($routeParams, postsService, posts, mdFile, $sanitize) {

		var location = $routeParams.method,
			that = this;



		marked.setOptions({
			// GitHub Flavored Markdown
			gfm: true,
			// GFM tables
			tables: true,
			// GFM line breaks
			breaks: true,
			// Better lists handling
			smartLists: true,
			// Better punctuation handling
			smartypants: true,
			// Code blocks language prefix (reset default)
			langPrefix: '',
			// Prefix for headings ID's
			headerPrefix: 'hid-',
			highlight: false
		});




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
			that.html = $sanitize(marked(mdFile.content));
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

	editNewController.$inject = ['$routeParams', 'postsService', 'posts', 'mdFile', '$sanitize'];

})(angular.module('blogApp'), jQuery, marked);