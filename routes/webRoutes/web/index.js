
module.exports = function(app, security, logger){
	app.get('/', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("WEB - GET -  / (splash)");
			
			res.render('splash/splash', { title: 'Celiano Family Videos' });
		} else {
			logger.info("WEB - GET -  / (login)");
			
			res.render('login/login', { title: 'Login - Family Scrapbook',  accessDenied: true, username: '', password: '', error: ''  });
		}
	});	
};