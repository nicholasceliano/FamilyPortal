
module.exports = function(app, security){
	app.get('/', function (req, res) {
		if (security.checkUserAccess(req)) {
			res.render('splash/splash', { title: 'Celiano Family Videos' });
		} else {
			res.render('login/login', { title: 'Login - Family Scrapbook',  accessDenied: true, username: '', password: '', error: ''  });
		}
	});
	
}