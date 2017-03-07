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
	
	app.get('/api/userActivity/:id', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/userActivity/:id");
			
			var id = req.params.id;
			var ct = req.query.ct;
			var start = req.query.start;
			
			if (ct === undefined || id === undefined || start === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/userActivity/:id' }));
			} else {
				ct = security.verifyRequstCount(ct);
				data.getUserActivityById(id, ct, start).then(function(d) {
					res.send(d);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};