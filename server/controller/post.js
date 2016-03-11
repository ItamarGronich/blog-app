
// requiring Posts data model
var Posts = require('../model/Posts.js'),
	root  = __dirname + '/../../';

module.exports = function(app){

	/**
	 * get Posts
	 */
	app.get('/data/get-posts/', function(req, res){

	});




	app.get('/data/get-full-post/:fileName', function(req, res){

		fs.readFile( root + 'server/data/posts/html/' + req.params.fileName + '.html' ,'utf-8', function(err,data){

			if(err){
				res.send(err);
				return;
			}

			res.send(data);

		});
	});

	app.get('/data/get-md-file/:fileName', function(req, res){

		fs.readFile( root + 'server/data/posts/md/' + req.params.fileName + '.md' ,'utf-8', function(err,data){

			if(err){
				res.send(err);
				return;
			}

			res.send(data);

		});
	});



	app.put('/data/new-post', function(req, res){

	});

};
