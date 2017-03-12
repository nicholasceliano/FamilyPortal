module.exports = function(webRouter){
	
	webRouter.get('/', function (req, res) {
		res.render('splash/splash', { title: 'Celiano Family Videos' });
	});	
};