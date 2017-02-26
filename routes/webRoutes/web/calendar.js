
module.exports = function(app, security, logger){
	app.get('/calendar', function(req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("WEB - GET -  /calendar");
			
			res.render('calendar/calendar', { title: 'Calendar - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}