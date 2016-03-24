(function (app, $, marked) {
	
	app.controller('editNewController', editNewController);

	function editNewController($routeParams, postsService, posts, mdFile, $sanitize, pagination, $timeout) {

		var location = $routeParams.method,
			slug = $routeParams.postTitle,
			that = this;

		function renderPostData(slug) {
			return {
				post: {
					title: that.title,
					slug: slug,
					author: that.author,
					date: Date.now().toString(),
					tags: that.tags.split(', '),
					description: that.description
				},
				postHtml: that.html,
				postMd: that.md
			};
		}

		function submit(method, slug) {
			var postData = renderPostData(slug);
			return postsService.sendPost(postData, method);
		}

		function deletePost(slug){
			return postsService.deletePost(slug);
		}

		that.md = (function(){
			
			if (mdFile && mdFile.content.code === 'ENOENT') {return}

			if (!mdFile) {return}

			return mdFile.content;
		})();

		that.html = (function(){
			if (!that.md) {return}
			return $sanitize(marked(that.md));
		})();

		that.renderHTML = function (){
			
			if (!that.md) { renderHTML(''); return;}
			renderHTML(that.md);
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
			that.method = 'PUT';
			that.header = 'Edit Post';
			that.title = post.title;
			that.author = post.author;
			that.description = post.description;
			that.tags = post.tags.join(', ');


			that.deletePost = function(){
				return deletePost(post.slug)
					.then(function () {
							setTimeout(function(){
								postsService
									.getPosts(true)
									.then(pagination.redirectTo.bind(this, 'admin'));
							}, 300);
						},
						function (err){
							console.log(err);
						});
			};


			that.submit = function(){
				return submit(that.method, post.slug)
					.then(function (promise) {
							var slug = promise.data;
						postsService.storeFullPost(slug, $sanitize(that.html));
							setTimeout(function(){
								postsService
									.getPosts(true)
									.then(pagination.redirectTo.bind(this, 'post', slug));
							}, 300);
						},
						function (err){
							console.log(err);
						});
			};

		}

		function ifNew() {
			that.header = 'New Post';
			that.showDelete = false;

			that.method = 'POST';

			function generateSlug(){
				if(that.title) return that.title.replace(/([\s\W])+/g, '-');

				return '';
			}


			that.submit = function(){
				return submit(that.method, generateSlug())
					.then(function (promise) {
						var slug = promise.data;
						setTimeout(function(){
							postsService
								.getPosts(true)
								.then(pagination.redirectTo.bind(this, 'post', slug));
						}, 300);
					},
					function (err){
						console.log(err);
					});
			};

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

	editNewController.$inject = ['$routeParams', 'postsService', 'posts', 'mdFile', '$sanitize', 'pagination', '$scope', '$timeout'];
})(angular.module('blogApp'), jQuery, marked);