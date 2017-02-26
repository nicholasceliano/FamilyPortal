
module.exports = function(app, security, logger){
	app.post('/login', function(req, res) {
		logger.info("WEB - POST -  /login");
		
		var user = req.body.username;
		var pwd = req.body.pwd;
		
		security.login(user, pwd).then(function(resp) {
			if (resp.validUserData !== undefined) {
				res.cookie('userId', resp.validUserData._id.toString());
				res.redirect('/');
			} else  {
				res.clearCookie('userId');
				res.render('login/login', { 
					title: 'Login - Family Scrapbook', 
					accessDenied: true,
					username: user, 
					password: pwd, 
					error: resp.err
				});
			}
		});
	});
}