module.exports = function(app, data, security, pageErrors, logger){	

	app.get('/api/videos', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/videos");
			var id = req.query.id;
			var ct = req.query.ct;
			
			if (id === undefined && ct === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/videos' }));
			} else {
				if (id) {
					data.getVideoByID(id).then(function(d) {
						res.send(d);
					}).catch(function () {
						pageErrors.send(req, res, 500);
					});
				} else {
					ct = security.verifyRequstCount(ct);
					data.getVideos(ct).then(function(d) {
						res.send(d);
					});
				}
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};