//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

module.exports = function(app, data){
	app.get('/api/data/videos', function (req, res) {
		
		data.getVideos.then(function(videoArray) {
			res.send(JSON.stringify({ videos: videoArray }));
		});
	});
};