//C:\git\FamilyProject

//References
var express = require('express');
var fs = require("fs");

//Global variables
var app = express();

app.use('/dist', express.static('dist'));//makes /dist folder accessable from client side
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Routes
app.get('/', function (req, res) {
	res.sendFile('home.html', {root: __dirname });
});

app.get('/watch', function (req, res) {
	var id = req.query.id;
	
	res.render('watch', { videoName: id, videoUrl: "https://s3.amazonaws.com/videos.celiano/" + id + ".mp4" });
});

app.get('/data/videos', function (req, res) {
	res.sendFile('data/videos.json', {root: __dirname });
});


//API Calls
app.get('data/videos', function (req, res) {
	
	fs.readFile('data/videos.json', function (err, data) {
	if (err) {
		return console.error(err);
	}
	console.log("Asynchronous read: " + data.toString());
});
	
});


//App Start
app.listen(3000, function () {
	console.log('App listening on port 3000');
});