module.exports = function(webRouter){
	
	webRouter.get('/images', function(req, res) {
		res.render('images/images', { title: 'Images - Family Scrapbook' });
	});	
};