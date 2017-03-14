module.exports = function(apiRouter, dataAccess, security){	
	
	apiRouter.get('/userActivity', function (req, res, next) {
		var ct = req.query.ct;
		var start = req.query.start;
		
		if (ct === undefined || start === undefined) {
			next(new Error('ct === undefined || start === undefined'));
		} else {
			ct = security.verifyRequstCount(ct);
			dataAccess.getUserActivity(ct, start).then(function(d) {
				res.send(d);
			});
		}
	});
	
	apiRouter.get('/userActivity/:id', function (req, res, next) {		
		var id = req.params.id;
		var ct = req.query.ct;
		var start = req.query.start;
		
		if (ct === undefined || id === undefined || start === undefined) {
			next(new Error('ct === undefined || id === undefined || start === undefined'));
		} else {
			ct = security.verifyRequstCount(ct);
			dataAccess.getUserActivityById(id, ct, start).then(function(d) {
				res.send(d);
			}).catch(function () {
				next(new Error(500));
			});
		}
	});
};