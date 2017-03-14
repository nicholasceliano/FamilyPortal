module.exports = function(apiRouter, security, config, fileAccess){	

	apiRouter.get('/images/folder', function (req, res, next) {
		var folderPath = req.query.folderPath;
		var user = security.getActiveUser(req);
		var folderLocation = config.imagesFileLoc(user.familyId) + folderPath;
		
		if (folderPath === undefined)
			next(new Error('folderPath === undefined'));
		else
			fileAccess.readFolders(folderLocation, finishGetFolders, res, next);
	});
	
	apiRouter.post('/images/folder', function (req, res, next) {
		var folderName = req.body.folderName;
		var user = security.getActiveUser(req);
		var imagesFolderLocation = config.imagesFileLoc(user.familyId) + folderName;
		
		if (folderName === undefined)
			next(new Error('folderName === undefined'));
		else
			fileAccess.saveFolder(imagesFolderLocation, folderName, finishPostImagesFolder, req, res, next);
	});
	
	apiRouter.delete('/images/folder', function (req, res, next) {
		var folderPath = req.query.folderPath;
		var user = security.getActiveUser(req);
		var folderLocation = config.imagesFileLoc(user.familyId) + folderPath;
		
		if (folderPath === undefined)
			next(new Error('folderPath === undefined'));
		else
			fileAccess.deleteFolder(folderLocation, folderPath, finishDeleteImagesFolder, req, res, next);
	});

	//callback functions
	function finishGetFolders(err, data, res, next) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: data }));
		else
			next(new Error('Error with finishGetFolders - ' + err.toString()));
	}
	
	function finishPostImagesFolder(err, data, req, res, next) {
		if (err === false){
			var user = security.getActiveUser(req);
			var thumbnailsFolderLocation = config.thumbnailsFileLoc(user.familyId) + '/' + data;
			fileAccess.saveFolder(thumbnailsFolderLocation, data, finishPostThumbnailsFolder, req, res, next);
		} else
			next(new Error('Error with finishPostImagesFolder - ' + err.toString()));
	}
	
	function finishPostThumbnailsFolder(err, data, req, res, next) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: { folderName: data.split('\/').pop() }}));
		else
			next(new Error('Error with finishPostThumbnailsFolder - ' + err.toString()));
	}
	
	function finishDeleteImagesFolder(err, folderPath, req, res, next) {
		if (err === false) {
			var user = security.getActiveUser(req);
			var thumbnailsFolderLocation = config.thumbnailsFileLoc(user.familyId) + folderPath;
			fileAccess.deleteFolder(thumbnailsFolderLocation, folderPath, finishDeleteThumbnailsFolder, req, res, next);
		} else
			next(new Error('Error with finishDeleteImagesFolder - ' + err.toString()));
	}
	
	function finishDeleteThumbnailsFolder(err, folderPath, req, res, next) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: { folderPath: folderPath }}));
		else
			next(new Error('Error with finishDeleteThumbnailsFolder - ' + err.toString()));
	}
};