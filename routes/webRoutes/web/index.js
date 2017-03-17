module.exports = function(webRouter){
	
	webRouter.get('/*', function(req, res) {
		res.render('index', { title: 'Family Scrapbook' });
	});
};