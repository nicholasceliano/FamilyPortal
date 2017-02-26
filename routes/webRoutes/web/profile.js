
module.exports = function(app, security, logger){
	app.get('/profile', function(req, res) {
		if (security.checkUserAccess(req)) {
			var user = security.getActiveUser(req);
			logger.info("WEB - GET -  /profile - userId:" + user.userId);
			
			res.render('profile/profile', { title: 'Profile - Family Scrapbook', userId: user.userId });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};