
module.exports = function(app, security){
	app.get('/videos', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('videos/videos', { title: 'Videos - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}