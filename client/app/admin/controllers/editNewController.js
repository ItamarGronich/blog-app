(function (app, $, marked) {
	
	app.controller('editNewController', editNewController);

	function editNewController($routeParams, postsService, posts, mdFile, $sanitize) {

		var location = $routeParams.method,
			slug = $routeParams.postTitle,
			that = this;



		that.mdFile = (function(){
			
			if (mdFile && mdFile.content.code === 'ENOENT') {return}

			if (!mdFile) {return}

			return mdFile.content;
		})();

		that.html = (function(){
			if (!that.mdFile) {return}
			return $sanitize(marked(mdFile.content))
		})();

		that.renderHTML = function (){
			
			if (!that.mdFile) { renderHTML(''); return;}
			renderHTML(that.mdFile);
		};





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


			that.showDelete = true;

			that.header = 'Edit Post';
			that.title = post.title;
			that.author = post.author;
			that.description = post.description;
			that.tags = post.tags.join(', ');

		}

		function ifNew() {
			that.header = 'New Post';
			that.showDelete = false;

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