
module.exports = function(app, security, logger){
	app.get('/videos', function(req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("WEB - GET -  /videos");
			
			res.render('videos/videos', { title: 'Videos - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}