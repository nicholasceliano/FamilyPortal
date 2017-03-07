
module.exports = function(app, security, config, fileAccess, apiUploadsHelper, logger) {	
	app.get('/api/imageThumbnail/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - GET - /api/images/thumbnail/:id");
			
			var path = req.query.path;
			var user = security.getActiveUser(req);
			var baseFileLocation = config.thumbnailsFileLoc(user.familyId);
			
			fileAccess.readFile(baseFileLocation, path, finishGetImageThumbnail, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/imageThumbnail', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - POST(Insert) - /api/images/thumbnail");
		
			apiUploadsHelper.saveImg(req, res, function (err) {
				if(err) {
					return res.end("Error uploading file.");
				} else {
					var f = req.file;
					var user = security.getActiveUser(req);
					var fileDestination = config.thumbnailsFileLoc(user.familyId) + req.body.fileLoc + req.body.fileName;
					 
					fileAccess.renameFile(f.path, fileDestination, finishPostImageThumbnail, res, null);
				}
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/imageThumbnail/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - POST(Update) - /api/images/thumbnail/:id");
		
			var fileName = req.body.fileName;
			var fileExt = req.body.fileExt;
			var fileLoc = req.body.fileLoc;
			var fileName_Original = req.body.fileName_Original;
			var fileExt_Original = req.body.fileExt_Original;
			var fileLoc_Original = req.body.fileLoc_Original;

			var user = security.getActiveUser(req);
			var originalFile = config.thumbnailsFileLoc(user.familyId) + fileLoc_Original + fileName_Original + '.thumbnail' + fileExt_Original;
			var updateFile = config.thumbnailsFileLoc(user.familyId) + fileLoc + fileName + '.thumbnail' + fileExt;
			
			fileAccess.renameFile(originalFile, updateFile, finishPostImageThumbnail, res, null);	
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/imageThumbnail/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - DELETE - /api/images/thumbnail/:id");
			
			var id = req.params.id;
			var fileName = req.query.fileName;
			var user = security.getActiveUser(req);
			var file = config.thumbnailsFileLoc(user.familyId) + fileName;
			
			fileAccess.deleteFile(file, finishDeleteImageThumbnail, res, id, user);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	function finishPostImageThumbnail(err, res, id) {
		res.end(err.toString());
	}
	
	function finishGetImageThumbnail(respData, res) {
		res.writeHead(200, {'Content-Type': 'image/jpg'});
		res.end(respData);
	}
	function finishDeleteImageThumbnail (err, res, id, user) {
		res.end(err.toString());
	}
};