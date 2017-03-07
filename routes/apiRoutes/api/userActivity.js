module.exports = function(app, data, security, logger){	

	app.get('/api/userActivity', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/userActivity");
			
			var ct = req.query.ct;
			
			if (ct === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/userActivity' }));
			} else {
				ct = security.verifyRequstCount(ct);
				data.getUserActivity(ct).then(function(d) {
					res.send(d);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};