module.exports = function(apiRouter, security, config, fileAccess, apiUploadsHelper){	
	apiRouter.get('/images/:id/photo', function (req, res, next) {
		var path = req.query.path;
		var user = security.getActiveUser(req);
		var baseFileLocation = config.imagesFileLoc(user.familyId);
		
		if (path === undefined)
			next(new Error('path === undefined'));
		else
			fileAccess.readFile(baseFileLocation, path, finishGetImage, res, next);
	});
	
	apiRouter.post('/images/photo', function (req, res, next) {
		apiUploadsHelper.saveImg(req, res, function (err) {
			if(err) {
				next(new Error(err));
			} else {
				var f = req.file;
				var user = security.getActiveUser(req);
				var fileDestination = config.imagesFileLoc(user.familyId) + req.body.fileLoc + req.body.fileName;
				 
				fileAccess.renameFile(f.path, fileDestination, finishPostImage, res, null, next);
			}
		});	
	});
	
	apiRouter.post('/images/:id/photo', function (req, res, next) {
		var fileName = req.body.fileName;
		var fileExt = req.body.fileExt;
		var fileLoc = req.body.fileLoc;
		var fileName_Original = req.body.fileName_Original;
		var fileExt_Original = req.body.fileExt_Original;
		var fileLoc_Original = req.body.fileLoc_Original;

		var user = security.getActiveUser(req);
		var originalFile = config.imagesFileLoc(user.familyId) + fileLoc_Original + fileName_Original + fileExt_Original;
		var updateFile = config.imagesFileLoc(user.familyId) + fileLoc + fileName + fileExt;
		
		if (fileName === undefined || fileExt === undefined || fileLoc === undefined || fileName_Original === undefined || fileExt_Original === undefined || fileLoc_Original === undefined)
			next(new Error('fileName === undefined || fileExt === undefined || fileLoc === undefined || fileName_Original === undefined || fileExt_Original === undefined || fileLoc_Original === undefined'));
		else
			fileAccess.renameFile(originalFile, updateFile, finishPostImage, res, null, next);
	});
	
	apiRouter.delete('/images/:id/photo', function (req, res, next) {
		var id = req.params.id;
		var fileName = req.query.fileName;
		var user = security.getActiveUser(req);
		var file = config.imagesFileLoc(user.familyId) + fileName;
		
		if (id === undefined)
			next(new Error('id === undefined'));
		else
			fileAccess.deleteFile(file, finishDeleteImage, res, id, user, next);
	});
	
	function finishPostImage(err, res, id, next) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			next(new Error('Error with finishPostImage - ' + err.toString()));
	}
	
	function finishGetImage(err, respData, res, next) {
		if (err === false) {
			res.writeHead(200, {'Content-Type': 'image/jpg'});
			res.end(respData);
		} else
			next(new Error('Error with finishGetImage - ' + err.toString()));
	}
	
	function finishDeleteImage(err, res, id, user, next) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			next(new Error('Error with finishDeleteImage - ' + err.toString()));
	}
};