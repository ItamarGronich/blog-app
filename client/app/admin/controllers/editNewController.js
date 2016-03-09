(function (app, $, marked) {
	
	app.controller('editNewController', editNewController);

	function editNewController($routeParams, postsService, posts, mdFile, $sanitize) {

		var location = $routeParams.method,
			slug = $routeParams.postTitle,
			that = this;


		





		function ifEdit() {
			if ( !( mdFile && mdFile.fileName && mdFile.content ) ) {
				that.header = 'something wen\'t wrong and we could not get your post.';
			}

			var post;

			for (var key in posts) {
				if (posts.hasOwnProperty(key) && posts[key] !== undefined && posts[key].slug === slug) {
					post = posts[key];
				}
			}

			that.mdFile = (function(){
				if (mdFile.content.code = 'ENOENT') { return}
				mdFile.content
			})();
			that.header = 'Edit Post';
			that.title = post.title;
			that.author = post.author;
			that.description = post.description;
			that.tags = post.tags.join(', ');
			that.html = (function(){
				console.log(that.mdFile);
				
				if (!that.mdFile) {return}
				return $sanitize(marked(mdFile.content))
			})();
			that.renderHTML = function ($event){
				if (!that.mdFile) { $event.preventDefault(); return;}
				 renderHTML(that.mdFile);
			}
		}

		function ifNew() {
			that.header = 'New Post';

		}

		function renderHTML(markdown){
			that.html =  $sanitize(marked(markdown));
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