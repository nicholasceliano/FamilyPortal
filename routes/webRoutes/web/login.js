
module.exports = function(app, security){
	app.post('/login', function(req, res) {
		var user = req.body.username;
		var pwd = req.body.pwd;
		
		security.login(user, pwd).then(function(validUserId) {
			if (validUserId !== undefined) {
				res.cookie('userId',validUserId);
				res.redirect('/');
			} else  {
				res.render('login/login', { 
					title: 'Login - Family Scrapbook', 
					accessDenied: true,
					username: user, 
					password: pwd, 
					error: 'Error: Username or password incorrect'  
				});
			}
		});
	});
}