module.exports = function(app, data, security, pageErrors, logger){	

	app.get('/api/familymembers', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/familymembers");
			
			var ct = req.query.ct;
			var id = req.query.id;
			
			if (id === undefined && ct === undefined) {
				res.send(JSON.stringify({ familyMembers: null }));
			} else {
				if (id) {
					data.getFamilyMemberByID(id).then(function(d) {
						res.send(d);
					}).catch(function() {
						pageErrors.send(req, res, 500);
					});
				} else {
					ct = security.verifyRequstCount(ct);
					data.getFamilyMembers(ct).then(function(d) {
						res.send(d);
					});					
				}
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/familymembers', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - POST - /api/familymembers");
			
			var userInfo = req.body;
			
			data.saveFamilyMemberByID(userInfo).then(function(d) {
				res.send(d);
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}