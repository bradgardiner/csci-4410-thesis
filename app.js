

var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require('fs');
var uuidv4 = require('uuid/v4');
// app.use(express.static(__dirname + "/src"));
// app.use(express.static(__dirname + "/style"));
// var path = require('path');

var port = 3000;
var sessionid;

io.on('connection', function(socket){
	console.log('a user connected');
	console.log(socket.socketid);


	socket.on('disconnect', function(){
		console.log('a user has disconnected');
	});

	socket.on('editorUpdate', function(data){
		console.log(data);

		var fileContent = data;
		var path = sessionid + ".js";
		fs.writeFile(path, fileContent, (err) => {
    if (err) throw err;

    console.log("The file was succesfully saved!");
		});
	})
});



server.listen(port, function(){
	console.log('The magic happens on port ' + port);
});






app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.set('port', process.env.PORT || 3000);

app.use(express.static('public'))

app.use(function(request, response, next) {
	console.log('REQUEST: url = ' + request.url);
	next();
});

app.get('/', function(request, response) {
	sessionid = uuidv4();
	response.redirect('/edit/'+sessionid);
	//response.sendFile(__dirname + '/index.html');
});

app.get('/edit/:sessionid', function(request, response) {
	response.sendFile(__dirname + '/index.html');
});
//
app.post('/run', function(request, response){
	console.log('POST STUFF', request.body);
	response.send("Ty");

});



// app.get('/styles/style.css', function(request, response) {
// 	response.sendFile(__dirname + '/styles/style.css');
// });
//
// app.get('/src/ace.js', function(request, response) {
// 	response.sendFile(__dirname + '/src/ace.js');
// });





// app.listen(app.get('port'), function() {
// 	console.log('Node/Express listening on port ' + app.get('port'));
// 	console.log('Use CTRL-C to exit');
// });
