
module.exports = function(app, security){
	app.get('/profile', function(req, res) {
		if (security.checkUserAccess(req)) {
			var user = security.getActiveUser(req);
			
			res.render('profile/profile', { title: 'Profile - Family Scrapbook', userId: user.userId });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}