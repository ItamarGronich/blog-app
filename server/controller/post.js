
// requiring Posts data model
var Posts = require('../model/Posts.js'),
	root  = __dirname + '/../../';

module.exports = function(app){

	/**
	 * get Posts JSON
	 */
	app.get('/data/get-posts/', function(req, res){
		Posts.getPosts()
		.then(function(posts){
			res.send(posts);
		});
	});

	/**
	 * Get Full Post HTML
	 */
	app.get('/data/get-full-post/:slug', function(req, res){
		var slug = req.params.slug;

		Posts.getHtml(slug)
			.then(function(html){
				res.send(html);
			})
	});

	/**
	 * Get Full Post MD
	 */
	app.get('/data/get-md-file/:slug', function(req, res){
		var slug = req.params.slug;

		Posts.getMd(slug)
			.then(function(md){
				res.send(md);
			})
	});

	/**
	 * Submit New Post
	 */
	app.post('/data/new-post', function(req, res){
		var postData = req.body;
		Posts.submitPost(postData)
			.then(function(postData){
					res.send(postData.post.slug);
				},
				function (err) {
					res.status(500).send(err);
				})
	});

	/**
	 * Edit Post
	 */
	app.put('/data/edit-post', function(req, res){
		var postData = req.body;
		Posts.editPost(postData)
			.then(function(postData){
				res.send(postData.post.slug);
			})
	});

	/**
	 * Delete Post
	 */
	app.delete('/data/delete-post/:slug', function(req, res){
		var slug = req.params.slug;

		Posts.deletePost(slug)
			.then(function(post){
				res.send('post deleted!');
			})
	});



};
