module.exports = function(apiRouter, security, config, fileAccess, apiUploadsHelper) {	
	apiRouter.get('/images/:id/thumbnail', function (req, res, next) {
		var path = req.query.path;
		var user = security.getActiveUser(req);
		var baseFileLocation = config.thumbnailsFileLoc(user.familyId);
		
		if (path === undefined)
			next(new Error('path === undefined'));
		else
			fileAccess.readFile(baseFileLocation, path, finishGetImageThumbnail, res, next);
	});
	
	apiRouter.post('/images/thumbnail', function (req, res, next) {
		apiUploadsHelper.saveImg(req, res, function (err) {
			if(err) {
				next(new Error(err));
			} else {
				var f = req.file;
				var user = security.getActiveUser(req);
				var fileDestination = config.thumbnailsFileLoc(user.familyId) + req.body.fileLoc + req.body.fileName;
				 
				fileAccess.renameFile(f.path, fileDestination, finishPostImageThumbnail, res, null, next);
			}
		});
	});
	
	apiRouter.post('/images/:id/thumbnail', function (req, res, next) {
		var fileName = req.body.fileName;
		var fileExt = req.body.fileExt;
		var fileLoc = req.body.fileLoc;
		var fileName_Original = req.body.fileName_Original;
		var fileExt_Original = req.body.fileExt_Original;
		var fileLoc_Original = req.body.fileLoc_Original;

		var user = security.getActiveUser(req);
		var originalFile = config.thumbnailsFileLoc(user.familyId) + fileLoc_Original + fileName_Original + '.thumbnail' + fileExt_Original;
		var updateFile = config.thumbnailsFileLoc(user.familyId) + fileLoc + fileName + '.thumbnail' + fileExt;
		
		if (fileName === undefined || fileExt === undefined || fileLoc === undefined || fileName_Original === undefined || fileExt_Original === undefined || fileLoc_Original === undefined)
			next(new Error('fileName === undefined || fileExt === undefined || fileLoc === undefined || fileName_Original === undefined || fileExt_Original === undefined || fileLoc_Original === undefined'));
		else
			fileAccess.renameFile(originalFile, updateFile, finishPostImageThumbnail, res, null, next);
	});
	
	apiRouter.delete('/images/:id/thumbnail', function (req, res, next) {
		var id = req.params.id;
		var fileName = req.query.fileName;
		var user = security.getActiveUser(req);
		var file = config.thumbnailsFileLoc(user.familyId) + fileName;
		
		if (id === undefined)
			next(new Error('id === undefined'));
		else
			fileAccess.deleteFile(file, finishDeleteImageThumbnail, res, id, user, next);
	});
	
	function finishPostImageThumbnail(err, res, id, next) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			next(new Error('Error with finishPostImageThumbnail - ' + err.toString()));
	}
	
	function finishGetImageThumbnail(err, respData, res, next) {
		if (err === false) {
			res.writeHead(200, {'Content-Type': 'image/jpg'});
			res.end(respData);
		} else
			next(new Error('Error with finishGetImageThumbnail - ' + err.toString()));
	}
	function finishDeleteImageThumbnail (err, res, id, user, next) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			next(new Error('Error with finishDeleteImageThumbnail - ' + err.toString()));
	}
};