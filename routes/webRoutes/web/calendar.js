module.exports = function(webRouter){
	
	webRouter.get('/calendar', function(req, res) {
		res.render('calendar/calendar', { title: 'Calendar - Family Scrapbook' });
	});
};