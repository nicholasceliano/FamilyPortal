//Webpage Routes Only

module.exports = function(app, data){
	app.get('/', function (req, res) {
		res.render('home/home', { title: 'Celiano Family Videos' });
	});

	app.get('/watch', function (req, res) {
		var id = req.query.id;
		
		data.getVideoByID(id).then(function(video) {			
			res.render('watch/watch', { title: 'Celiano Family Videos - ' + video.name, videoName: video.name, videoUrl: "https://s3.amazonaws.com/videos.celiano/" + video.url });
		});
	});
};