
module.exports = function(app, security, logger){
	app.get('/family', function(req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("WEB - GET -  /family");
			
			res.render('family/family', { title: 'Family Members - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}