module.exports = function(webRouter, security){
	
	webRouter.get('/profile', function(req, res) {
			var user = security.getActiveUser(req);
			res.render('profile/profile', { title: 'Profile - Family Scrapbook', userId: user.userId });
	});
};