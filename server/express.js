var express = require('express'),
    app = express(),
	root = __dirname + '/../',
	fs = require('fs'),
	logger = require('morgan');


// assigning the listen port
app.set('port', 8080);

app.use(express.static( root + 'client/'));

app.use(logger('dev'));




/* =====================================
			Getters
   =====================================*/

/*

Get posts.json

*/
app.get('/data/get-posts/', function(req, res){

	fs.readFile(root + 'server/data/posts.json','utf-8', function(err,data){

		if(err){
			res.send(err);
			return;
		}

		res.send(data);
	});
});


/*

Get full posts *.html

*/
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





/*==============================
*           Setters
* ==============================*/

// initiate server on listen port
app.listen(app.get('port'), function (){
	console.log("server up on root: " + root.slice(0, -10) + " ; Listening on port: " + app.get('port') + ';');

});