//Webpage Routes Only

module.exports = function(app){
	app.get('/', function (req, res) {
		res.sendFile('home.html', {root: './' });
	});

	app.get('/watch', function (req, res) {
		var id = req.query.id;
		res.render('watch', { videoName: id, videoUrl: "https://s3.amazonaws.com/videos.celiano/" + id + ".mp4" });
	});
};