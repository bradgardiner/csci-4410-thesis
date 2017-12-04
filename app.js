

var express = require('express');
var app = express();
var bodyParser = require("body-parser");
// var st = require('st');
// var path = require('path');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.use(function(request, response, next) {
	console.log('REQUEST: url = ' + request.url);
	next();
});

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/index.html');
});

app.get('/styles/style.css', function(request, response) {
	response.sendFile(__dirname + '/styles/style.css');
});

app.get('/src/ace.js', function(request, response) {
	response.sendFile(__dirname + '/src/ace.js');
});




app.listen(app.get('port'), function() {
	console.log('Node/Express listening on port ' + app.get('port'));
	console.log('Use CTRL-C to exit');
});
