//Webpage Routes Only
module.exports = function(app, data, security){
	app.get('/', function (req, res) {
		if (security.checkUserAccess(req)) {
			res.render('splash/splash', { title: 'Celiano Family Videos' });
		} else {
			res.render('login/login', { title: 'Login - Family Portal', username: '', password: '', error: ''  });
		}
	});
	
	app.post('/login', function(req, res) {
		var user = req.body.username;
		var pwd = req.body.pwd;
		
		security.login(user, pwd).then(function(validUser) {
			if (validUser) {
				res.cookie('user',user);
				res.redirect('/');
			} else  {
				res.render('login/login', { 
					title: 'Login - Family Portal', 
					username: user, 
					password: pwd, 
					error: 'Error: Username or password incorrect'  
				});
			}
		});
	});
	
	app.get('/logout', function (req, res) {
		security.logout(req);
		res.redirect('/');
	});

	app.get('/watch', function (req, res) {
		if (security.checkUserAccess(req)) {
			var id = req.query.id;
			
			data.getVideoByID(id).then(function(video) {			
				res.render('watch/watch', { title: 'Celiano Family Videos - ' + video.name, videoName: video.name, videoUrl: "https://s3.amazonaws.com/videos.celiano/" + video.url });
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};