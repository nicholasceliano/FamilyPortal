
module.exports = function(app, security){
	app.post('/login', function(req, res) {
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