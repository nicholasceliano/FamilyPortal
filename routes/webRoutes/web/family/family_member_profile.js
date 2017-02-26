
module.exports = function(app, security, logger){
	app.get('/family/family_member_profile', function(req, res) {
		if (security.checkUserAccess(req)) {
			var id = req.query.id;
			logger.info("WEB - GET -  /family/family_member_profile - id:" + id);
			
			res.render('family/profile/family_member_profile', { title: 'Family Member Profile - Family Scrapbook', userId: id });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}