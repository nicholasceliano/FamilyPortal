module.exports = function(app, data, security, apiUploadsHelper, pageErrors){	

	app.get('/api/familymembers/photo', function (req, res) {
		if (security.checkUserAccess(req)) {	
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
			var id = req.query.id;
			var buffer = req.file.buffer;
			
			data.saveFamilyMemberPhotoById(id, buffer).then(function(d) {
				res.send(d);	
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}