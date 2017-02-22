
module.exports = function(app, security){
	app.get('/images/view', function(req, res) {
		var id = req.query.id;
		
		if (security.checkUserAccess(req)) {
			res.render('images/view/view', { title: 'View Image - Family Scrapbook', imageId: id });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}