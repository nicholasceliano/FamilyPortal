module.exports = function(app, data, security, apiUploadsHelper, pageErrors, logger){	

	app.get('/api/familymembers/photo', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - GET - /api/familymembers/photo");
			
			var id = req.query.id;
			
			data.getFamilyMemberPhotoById(id).then(function(d) {
				res.send(d);
			}).catch(function() {
				pageErrors.send(req, res, 500);
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/familymembers/photo', apiUploadsHelper.tempImgUpload, function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - POST - /api/familymembers/photo");
		
			var user = security.getActiveUser(req);
			var id = req.query.id;
			var buffer = req.file.buffer;
			
			data.saveFamilyMemberPhotoById(user, id, buffer).then(function(d) {
				res.send(d);	
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};