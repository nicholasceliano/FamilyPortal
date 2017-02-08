//Webpage Routes Only
module.exports = function(app, data, security, config){
	app.get('/', function (req, res) {
		if (security.checkUserAccess(req)) {
			res.render('splash/splash', { title: 'Celiano Family Videos' });
		} else {
			res.render('login/login', { title: 'Login - Family Scrapbook',  accessDenied: true, username: '', password: '', error: ''  });
		}
	});
	
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
	
	app.get('/logout', function (req, res) {
		security.logout(req);
		res.redirect('/');
	});
	
	app.get('/videos', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('videos/videos', { title: 'Videos - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});

	app.get('/videos/watch', function (req, res) {
		if (security.checkUserAccess(req)) {
			var id = req.query.id;
			
			data.getVideoByID(id).then(function(video) {			
				//videoUrl in response is a work around - ng-src doesnt work on video objects in angular
				res.render('videos/watch/watch', { title: 'Watch - Family Scrapbook', videoId: id, videoUrl: config.videosBaseUri + video.url });
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/calendar', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('calendar/calendar', { title: 'Calendar - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/images', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('images/images', { title: 'Images - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/family', function(req, res) {
		if (security.checkUserAccess(req)) {
			res.render('family/family', { title: 'Family Members - Family Scrapbook' });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/family/family_member_profile', function(req, res) {
		if (security.checkUserAccess(req)) {
			var id = req.query.id;
			
			res.render('family/profile/family_member_profile', { title: 'Family Member Profile - Family Scrapbook', userId: id });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/profile', function(req, res) {
		if (security.checkUserAccess(req)) {
			var userId = security.getUserIdCookie(req);
			
			res.render('profile/profile', { title: 'Profile - Family Scrapbook', userId: userId });
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};