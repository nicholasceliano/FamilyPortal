module.exports = function(app, data, security, pageErrors){	

	app.get('/api/familymembers', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var ct = req.query.ct;
			var id = req.query.id;
			
			if (id === undefined && ct === undefined) {
				res.send(JSON.stringify({ familyMembers: null }));
			} else {
				if (id) {
					data.getFamilyMemberByID(id).then(function(familyMember) {
						res.send(JSON.stringify({ familyMembers: familyMember }));
					}).catch(function() {
						pageErrors.send(req, res, 500);
					});
				} else {
					ct = security.verifyRequstCount(ct);
					data.getFamilyMembers(ct).then(function(familyMemberArray) {
						res.send(JSON.stringify({ familyMembers: familyMemberArray }));
					});					
				}
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/familymembers', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var userInfo = req.body;
			
			data.saveFamilyMemberByID(userInfo).then(function(responseMsg) {
				res.send(JSON.stringify({ msg: responseMsg }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}