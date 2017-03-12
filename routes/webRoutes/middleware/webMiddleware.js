module.exports = function(security, logger){	
	return function (req, res, next) {
		logger.info('WEB - ' + req.method + ' - ' + req.url);
		
		if (security.checkUserAccess(req)) {
			next();
		} else {
			if (req.url == '/')
				res.render('login/login', { title: 'Login - Family Scrapbook',  accessDenied: true, username: '', password: '', error: ''  });
			else if (req.url == '/login')
				next();
			else
				security.sessionExpiredResponse(res);
		}
	};
};