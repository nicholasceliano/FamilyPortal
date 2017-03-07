module.exports = function(app, data, security, pageErrors, logger){	

	app.get('/api/videos', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/videos");
			
			var ct = req.query.ct;
			var start = req.query.start;
			
			if (ct === undefined || start === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/videos' }));
			} else {				
				ct = security.verifyRequstCount(ct);
				data.getVideos(ct, start).then(function(d) {
					res.send(d);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/videos/:id', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/videos/:id");
			
			var id = req.params.id;
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/videos/:id' }));
			} else {				
				data.getVideoByID(id).then(function(d) {
					res.send(d);
				}).catch(function () {
					pageErrors.send(req, res, 500);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};