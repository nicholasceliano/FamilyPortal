module.exports = function(app, apiVersion, security, config, fileAccess, logger){	

	app.get('/api/' + apiVersion + '/images/folder', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - GET - /api/' + apiVersion + '/images/folder');
			
			var folderPath = req.query.folderPath;
			var user = security.getActiveUser(req);
			var folderLocation = config.imagesFileLoc(user.familyId) + folderPath;
			
			if (folderPath === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET - /api/' + apiVersion + '/images/folder' }));
			} else {
				fileAccess.readFolders(folderLocation, finishGetFolders, res);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/images/folder', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - POST - /api/' + apiVersion + '/images/folder');
			
			var folderName = req.body.folderName;
			var user = security.getActiveUser(req);
			var imagesFolderLocation = config.imagesFileLoc(user.familyId) + folderName;
			
			if (folderName === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with POST - /api/' + apiVersion + '/images/folder' }));
			} else {
				fileAccess.saveFolder(imagesFolderLocation, folderName, finishPostImagesFolder, req, res);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});

	//callback functions
	function finishGetFolders(err, data, res) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: data }));
		else
			res.send(JSON.stringify({ err: true, value: 'Error with finishGetFolders - ' + err.toString() }));
	}
	
	function finishPostImagesFolder(err, data, req, res) {
		if (err === false){
			var user = security.getActiveUser(req);
			var thumbnailsFolderLocation = config.thumbnailsFileLoc(user.familyId) + '/' + data;
			fileAccess.saveFolder(thumbnailsFolderLocation, data, finishPostThumbnailsFolder, req, res);
		} else {
			res.send(JSON.stringify({ err: true, value: 'Error with finishPostImagesFolder  - ' + err.toString() }));
		}
	}
	
	function finishPostThumbnailsFolder(err, data, req, res) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: { folderName: data.split('\/').pop() }}));
		else
			res.send(JSON.stringify({ err: true, value: 'Error with finishPostThumbnailsFolder - ' + err.toString() }));
	}
};