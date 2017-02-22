
module.exports = function(app, security){
	app.get('/images', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('images/images', { title: 'Images - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
}