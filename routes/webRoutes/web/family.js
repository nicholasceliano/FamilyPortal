
module.exports = function(app, security){
	app.get('/family', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('family/family', { title: 'Family Members - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}