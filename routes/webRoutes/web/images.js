
module.exports = function(app, security, logger){
	app.get('/images', function(req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("WEB - GET -  /images");
			
			res.render('images/images', { title: 'Images - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
}