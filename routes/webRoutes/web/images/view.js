
module.exports = function(app, security, logger){
	app.get('/images/view', function(req, res) {
		var id = req.query.id;
		logger.info("WEB - GET -  /images/view - id:" + id);
		
		if (security.checkUserAccess(req)) {
			res.render('images/view/view', { title: 'View Image - Family Scrapbook', imageId: id });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}