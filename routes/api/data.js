//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

module.exports = function(app, data, security){
	app.get('/api/data/videos', function (req, res) {
		if (security.checkUserAccess(req)) {			
			data.getVideos.then(function(videoArray) {
				res.send(JSON.stringify({ videos: videoArray }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};