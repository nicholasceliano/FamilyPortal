module.exports = function(webRouter, dataAccess, config){
	
	webRouter.get('/videos/watch', function (req, res) {
		var id = req.query.id;

		dataAccess.getVideoByID(id).then(function(data) {//videoUrl in response is a work around - ng-src doesnt work on video objects in angular
			var jsonData = JSON.parse(data);
			res.render('videos/watch/watch', { title: 'Watch - Family Scrapbook', videoId: id, videoUrl: config.videosBaseUri + jsonData.value.url });
		}).catch(function () {
			 res.render('videos/watch/watch', { title: 'Watch - Family Scrapbook', videoId: null, videoUrl: null });
		});
	});
};