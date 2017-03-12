module.exports = function(apiRouter, dataAccess, security){	

	apiRouter.get('/familymembers', function (req, res, next) {
		var ct = req.query.ct;
		var start = req.query.start;
		
		if (ct === undefined || start === undefined) {
			next(new Error('ct === undefined || start === undefined'));
		} else {				
			ct = security.verifyRequstCount(ct);
			dataAccess.getFamilyMembers(ct, start).then(function(d) {
				res.send(d);
			});
		}
	});
	
	apiRouter.get('/familymembers/:id', function (req, res, next) {
		var id = req.params.id;
		
		if (id === undefined) {
			next(new Error('id === undefined'));
		} else {
			dataAccess.getFamilyMemberByID(id).then(function(d) {
				res.send(d);
			}).catch(function() {
				next(new Error(500));
			});
		}
	});
	
	apiRouter.post('/familymembers/:id', function (req, res, next) {		
		var id = req.params.id;
		var userInfo = req.body;
		
		if (id === undefined || userInfo === undefined) {
			next(new Error('id === undefined || userInfo === undefined'));
		} else {
			dataAccess.saveFamilyMemberByID(id, userInfo).then(function(d) {
				res.send(d);
			});
		}
	});
};