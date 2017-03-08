module.exports = function(app, apiVersion, data, security, pageErrors, logger){	

	app.get('/api/' + apiVersion + '/familymembers', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/familymembers");
			
			var ct = req.query.ct;
			var start = req.query.start;
			
			if (ct === undefined || start === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/familymembers' }));
			} else {				
				ct = security.verifyRequstCount(ct);
				data.getFamilyMembers(ct, start).then(function(d) {
					res.send(d);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/' + apiVersion + '/familymembers/:id', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/familymembers/:id");
			
			var id = req.params.id;
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/familymembers/:id' }));
			} else {
				data.getFamilyMemberByID(id).then(function(d) {
					res.send(d);
				}).catch(function() {
					pageErrors.send(req, res, 500);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/familymembers/:id', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - POST - /api/familymembers");
			
			var id = req.params.id;
			var userInfo = req.body;
			
			data.saveFamilyMemberByID(id, userInfo).then(function(d) {
				res.send(d);
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};