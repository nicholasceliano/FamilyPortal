module.exports = function(webRouter){
	
	webRouter.get('/videos', function(req, res) {
		res.render('videos/videos', { title: 'Videos - Family Scrapbook' });
	});
};