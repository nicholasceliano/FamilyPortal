module.exports = function(app, apiVersion, data, security, apiUploadsHelper, pageErrors, logger){	

	app.get('/api/' + apiVersion + '/familymembers/:id/photo', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info('API - GET - /api/' + apiVersion + '/familymembers/photo');
			
			var id = req.params.id;
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/' + apiVersion + '/familymembers/:id/photo' }));
			} else {
				data.getFamilyMemberPhotoById(id).then(function(d) {
					res.send(d);
				}).catch(function() {
					pageErrors.send(req, res, 500);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/familymembers/:id/photo', apiUploadsHelper.tempImgUpload, function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info('API - POST - /api/' + apiVersion + '/familymembers/photo');
		
			var user = security.getActiveUser(req);
			var id = req.params.id;
			var buffer = req.file.buffer;
			
			if (id === undefined || buffer === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with POST /api/' + apiVersion + '/familymembers/:id/photo' }));
			} else {
				data.saveFamilyMemberPhotoById(user, id, buffer).then(function(d) {
					res.send(d);	
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};