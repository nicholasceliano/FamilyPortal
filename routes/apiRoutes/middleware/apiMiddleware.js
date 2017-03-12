module.exports = function(security, logger){	
	return function (req, res, next) {
		logger.info('API - ' + req.method + ' - ' + req.url);
		
		if (security.checkUserAccess(req))
			next();
		else
			security.sessionExpiredResponse(res);
	};
};