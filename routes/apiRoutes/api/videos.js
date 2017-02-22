module.exports = function(app, data, security){	

	app.get('/api/videos', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var ct = req.query.ct;
			
			if (id === undefined && ct === undefined) {
				res.send(JSON.stringify({ videos: null }));
			} else {
				if (id) {
					data.getVideoByID(id).then(function(video) {
						res.send(JSON.stringify({ videos: video }));
					});
				} else {
					data.getVideos(ct).then(function(videoArray) {
						res.send(JSON.stringify({ videos: videoArray }));
					});
				}
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}