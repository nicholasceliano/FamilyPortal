//Webpage Routes Only

module.exports = function(app){
	app.get('/', function (req, res) {
		res.render('home/home', { title: 'Celiano Family Videos' });
	});

	app.get('/watch', function (req, res) {
		var id = req.query.id;
		res.render('watch/watch', { title: 'Celiano Family Videos - ' + id, videoName: id, videoUrl: "https://s3.amazonaws.com/videos.celiano/" + id + ".mp4" });
	});
};