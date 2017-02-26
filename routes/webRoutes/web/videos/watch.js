
module.exports = function(app, dataAccess, security, config, logger){
	app.get('/videos/watch', function (req, res) {
		if (security.checkUserAccess(req)) {
			var id = req.query.id;
			logger.info("WEB - GET -  /videos/watch - id:" + id);
			
			dataAccess.getVideoByID(id).then(function(data) {//videoUrl in response is a work around - ng-src doesnt work on video objects in angular
				var jsonData = JSON.parse(data);
				res.render('videos/watch/watch', { title: 'Watch - Family Scrapbook', videoId: id, videoUrl: config.videosBaseUri + jsonData.value.url });
			}).catch(function () {
				 res.render('videos/watch/watch', { title: 'Watch - Family Scrapbook', videoId: null, videoUrl: null });
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};