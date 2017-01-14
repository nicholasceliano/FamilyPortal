//C:\git\FamilyProject

var express = require('express');
var app = express();

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

//App Start
app.listen(3000, function () {
	console.log('App listening on port 3000');
});