
module.exports = function(app, dataAccess, security, config){
	app.get('/videos/watch', function (req, res) {
		if (security.checkUserAccess(req)) {
			var id = req.query.id;
			
			dataAccess.getVideoByID(id).then(function(video) {			
				//videoUrl in response is a work around - ng-src doesnt work on video objects in angular
				res.render('videos/watch/watch', { title: 'Watch - Family Scrapbook', videoId: id, videoUrl: config.videosBaseUri + video.url });
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}