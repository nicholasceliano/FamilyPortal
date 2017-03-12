module.exports = function(webRouter){
	
	webRouter.get('/family/family_member_profile', function(req, res) {
		var id = req.query.id;
		res.render('family/profile/family_member_profile', { title: 'Family Member Profile - Family Scrapbook', userId: id });
	});
};