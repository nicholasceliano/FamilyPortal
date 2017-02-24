module.exports = function(app, data, security, config, fileAccess, pageErrors){	

	app.get('/api/images/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var ct = req.query.ct;
			
			if (id === undefined && ct === undefined) {
				res.send(JSON.stringify({ imageInfo: null }));
			} else {
				if (id){
					data.getImageMetaDataById(id).then(function(d) {
						res.send(d);
					}).catch(function() {
						pageErrors.send(req, res, 500);
					});
				} else {
					ct = security.verifyRequstCount(ct);
					data.getImageMetaData(ct).then(function(d) {
						res.send(d);
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
			
			if (id !== undefined) 
				updateImageMetaData(req, res, id);
			else 
				insertImageMetaData(req, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/images/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var fileName = req.query.fileName;
			var user = security.getActiveUser(req);
			var file = config.imagesFileLoc(user.familyId) + fileName;
			
			fileAccess.deleteFile(file, finishDeleteImagesMetaData, res, id);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
		
	//sub routes
	function insertImageMetaData(req, res) {
		var imgInfo = req.body;
		var user = security.getActiveUser(req);
			
		data.insertImageMetaData(user.userName, imgInfo).then(function(d) {
			res.send(d);
		});				
	}
	
	function updateImageMetaData(req, res, id) {
		var imgInfo = req.body;
		var user = security.getActiveUser(req);
		var originalFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName_Original + imgInfo.fileExt;
		var newFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName + imgInfo.fileExt;
		
		data.saveImageMetaDataById(id, user.userName, imgInfo).then(function(d) {				
			res.send(d);
		});			
	}
	
	//callback functions
	function finishPostImagesMetaData(respData, res, id) {
		if (respData == true) {
			data.getImageMetaDataById(id).then(function(d) {
				res.send(d);
			});
		} else
			res.send(JSON.stringify({ imageInfo: respData }));
	}

	function finishDeleteImagesMetaData(respData, res, id) {
		if (respData == true) {
			data.deleteImageMetaDataById(id).then(function(data) {
				res.send(data);
			});		
		} else
			res.send(JSON.stringify({
				err: true,
				value: 'Error deleting Image Meta Data'
			}));
	}
}