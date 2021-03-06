var express = require('express'),
    app = express(),
	root = __dirname + '/../',
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	controllers = require('./controller');


// assigning the listen port
app.set('port', (process.env.PORT || 5000));

app.use(express.static( root + 'client/'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


// instantiate controllers with app
controllers(app);



// initiate server on listen port
app.listen(app.get('port'), function (){
	console.log("server up on root: " + root.slice(0, -10) + " ; Listening on port: " + app.get('port') + ';');

});