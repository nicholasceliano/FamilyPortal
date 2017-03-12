module.exports = function(webRouter){
	
	webRouter.get('/family', function(req, res) {
		res.render('family/family', { title: 'Family Members - Family Scrapbook' });
	});
};