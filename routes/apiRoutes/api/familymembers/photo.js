module.exports = function(app, data, security, apiUploadsHelper){	

	app.get('/api/familymembers/photo', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			
			data.getFamilyMemberPhotoById(id).then(function(familyMemberImageData) {
				res.send(JSON.stringify({ familyMemberPhotoData: familyMemberImageData }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/familymembers/photo', apiUploadsHelper.tempImgUpload.single('file'), function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var buffer = req.file.buffer;
			
			data.saveFamilyMemberPhotoById(id, buffer).then(function(imgBase64) {
				res.send(JSON.stringify({ userImage: imgBase64 }));	
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}