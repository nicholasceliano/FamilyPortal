module.exports = function(webRouter){
	
	webRouter.get('/images/view', function(req, res) {
		var id = req.query.id;
		res.render('images/view/view', { title: 'View Image - Family Scrapbook', imageId: id });
	});
};