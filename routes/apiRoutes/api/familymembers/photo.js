module.exports = function(apiRouter, dataAccess, security, apiUploadsHelper){	

	apiRouter.get('/familymembers/:id/photo', function (req, res, next) {
		var id = req.params.id;
		
		if (id === undefined) {
			next(new Error('id === undefined'));
		} else {
			dataAccess.getFamilyMemberPhotoById(id).then(function(d) {
				res.send(d);
			}).catch(function() {
				next(new Error(500));
			});
		}
	});
	
	apiRouter.post('/familymembers/:id/photo', apiUploadsHelper.tempImgUpload, function (req, res, next) {
		var user = security.getActiveUser(req);
		var id = req.params.id;
		var buffer = req.file.buffer;
		
		if (id === undefined || buffer === undefined) {
			next(new Error('id === undefined || buffer === undefined'));
		} else {
			dataAccess.saveFamilyMemberPhotoById(user, id, buffer).then(function(d) {
				res.send(d);	
			});
		}
	});
};