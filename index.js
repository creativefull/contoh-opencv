var cv = require('opencv');
var express = require('express'), app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './public')));


var camera = new cv.VideoCapture(0);
var line = new cv.Matrix(64,64);

io.on('connection', function(socket) {
	socket.on('playCamera', function(msg) {
		setInterval(function() {
			camera.read(function(err, im) {
				im.detectObject(cv.FACE_CASCADE, {}, function(err, face) {
					face.forEach(function(x) {
						im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
					})
					io.emit("image", im.toBuffer());
				})
			})
		}, 300);
	})
})

app.get('/', function(req,res,next) {
	res.render('index');
})

http.listen(3000, function(req,res,next) {
	console.log("Server Berjalan");
})