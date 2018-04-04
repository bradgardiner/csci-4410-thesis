

var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require('fs');
var uuidv4 = require('uuid/v4');
var Docker = require('dockerode');
var docker = new Docker({
  socketPath: '/var/run/docker.sock'
});
// app.use(express.static(__dirname + "/src"));
// app.use(express.static(__dirname + "/style"));
// var path = require('path');

var port = 3000;
var sessionid;


io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('a user has disconnected');
	});

	socket.on('setup', function(id, url){
		// console.log("The ID is : " + id)
		// console.log("The url is : " + url);
		// console.log(url.split('/')[4]);
		socket.join(url.split('/')[4]);
		//console.log(io.sockets.adapter.rooms);
	});

	socket.on('editorUpdate', function(data, room){
		console.log(data);

		var fileContent = data;
		var path =  room + ".py";
		fs.writeFile(path, fileContent, (err) => {
    if (err) throw err;

    console.log("The file was succesfully saved!");

		socket.to(room).emit('editUpdate', data);
		});
	})

	socket.on('run', function(file){
			// var createOptions = {
			//     Tty: false,
			//     'Binds': ['/Users/Brad/Documents/GitHub:/csci-4410-thesis']
			// };
			//
			// var command = ['/usr/local/bin/python', '/csci-4410/' + file ];
			//
			// docker.run('python', command, process.stdout, createOptions, function(err, data, container) {
		  // 	if (err) {
			//     console.log('Error:', err);
			//   }
			//   console.log('Data: ', data);
			//   console.log('Started container ', container.id);
			// });
			//
			//
			// var Writable = require('stream').Writable;
			// var myStream = new Writable();
			//
			// var output = ''
			//
			// myStream._write = function write(doc, encoding, next) {
			//    var StringDecoder = require('string_decoder').StringDecoder;
			//    var decoder = new StringDecoder('utf8');
			//    var result = decoder.write(doc);
			//    output += result;
			//    next()
			// };
			//
			// function handler(error, data, container) {
			//    if (error) {
			//         console.log({ 'status': 'error', 'message': error });
			//         reject(error)
			//    }
			//     resolve(output);
			// };
			//
			// docker.run('test', ['/usr/local/bin/python', 'hello-world.py'], myStream, {}, handler);
			//

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
