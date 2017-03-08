module.exports = function(app, apiVersion, security, config, fileAccess, logger){	

	app.get('/api/' + apiVersion + '/imageFolder', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - GET - /api/images/folder");
			
			var folderPath = req.query.folderPath;
			var user = security.getActiveUser(req);
			var folderLocation = config.imagesFileLoc(user.familyId) + folderPath;
			
			fileAccess.readFolders(folderLocation, finishGetFolders, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/imageFolder', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - POST - /api/images/folder");
			
			var folderName = req.body.folderName;
			var user = security.getActiveUser(req);
			var imagesFolderLocation = config.imagesFileLoc(user.familyId) + folderName;
			
			fileAccess.saveFolder(imagesFolderLocation, folderName, finishPostImagesFolder, req, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/' + apiVersion + '/imageFolder/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - DELETE - /api/images/folder");
			
		} else {
			security.sessionExpiredResponse(res);
		}
	});

	//callback functions
	function finishGetFolders(respData, res) {
		if (respData !== "Error") {
			res.send(JSON.stringify({
				err: false,
				value: respData
			}));
		} else {
			res.send(JSON.stringify({
				err: true,
				value: 'Error saving Folder'
			}));
		}
	}
	
	function finishPostImagesFolder(err, folderName, req, res) {
		if (!err){
			var user = security.getActiveUser(req);
			var thumbnailsFolderLocation = config.thumbnailsFileLoc(user.familyId) + '/' + folderName;
			fileAccess.saveFolder(thumbnailsFolderLocation, folderName, finishPostThumbnailsFolder, req, res);
		} else {
			res.send(JSON.stringify({
				err: true,
				value: 'Error saving Images Folder'
			}));
		}
	}
	
	function finishPostThumbnailsFolder(err, folderName, req, res) {
		if (!err) {
			res.send(JSON.stringify({ folderName: folderName.split('\/').pop() }));
		} else {
			res.send(JSON.stringify({
				err: true,
				value: 'Error saving Thumbnails Folder'
			}));
		}
	}
};