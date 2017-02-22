
module.exports = function(app, security){
	app.get('/calendar', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('calendar/calendar', { title: 'Calendar - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}