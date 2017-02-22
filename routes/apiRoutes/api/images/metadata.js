module.exports = function(app, data, security, config, fs){	

	app.get('/api/images/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var ct = req.query.ct;
			
			if (id === undefined && ct === undefined) {
				res.send(JSON.stringify({ imageInfo: null }));
			} else {
				if (id){
					data.getImageMetaDataById(id).then(function(imageInfoData) {
						res.send(JSON.stringify({ imageInfo: imageInfoData[0] }));
					});		
				} else {
					data.getImageMetaData(ct).then(function(imageInfoData) {
						res.send(JSON.stringify({ imageInfo: imageInfoData }));
					});		
				}
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/images/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var userId = security.getUserIdCookie(req);
			var userInfo = security.getActiveUser(userId);
			var familyId = userInfo.familyId;
			var imageInfoPostData = req.body;
			var fileLocation = config.fileLoc + familyId + '/images/';
			var originalFileName = fileLocation + imageInfoPostData.fileName_Original + imageInfoPostData.fileExt;
			var newFileName = fileLocation + imageInfoPostData.fileName + imageInfoPostData.fileExt;
			
			data.saveImageMetaDataById(id, userId, imageInfoPostData).then(function(status) {				
				if (status === null) {
					res.send(JSON.stringify({ imageInfo: status }));
				} else {
					fs.rename(originalFileName, newFileName, function(err) {//update filename
						if ( err ) {
							res.send(JSON.stringify({ imageInfo: err }));
						} else {
							data.getImageMetaDataById(id).then(function(imageInfoData) {
								res.send(JSON.stringify({ imageInfo: imageInfoData[0] }));
							});
						}
					});
				}
			});			
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/data/image/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var fileName = req.query.fileName;
			var userId = security.getUserIdCookie(req);
			var userInfo = security.getActiveUser(userId);
			var familyId = userInfo.familyId;
			var fileLocation = config.fileLoc + familyId + '/images/';
			var file = fileLocation + fileName;
			
			fs.unlink(file, function(err){
				if (err) {
					res.send(JSON.stringify({ status: err }));
				} else {
					data.deleteImageMetaDataById(id).then(function(status) {
						res.send(JSON.stringify({ status: status }));
					});		
				}				
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
}