module.exports = function(app, apiVersion, security, config, fileAccess, apiUploadsHelper, logger){	
	app.get('/api/' + apiVersion + '/images/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - GET - /api/images/:id");
			
			var path = req.query.path;
			var user = security.getActiveUser(req);
			var baseFileLocation = config.imagesFileLoc(user.familyId);
			
			fileAccess.readFile(baseFileLocation, path, finishGetImage, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/images', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - POST(Insert) - /api/images");
		
			apiUploadsHelper.saveImg(req, res, function (err) {
				if(err) {
					logger.error(err);
					return res.end("Error uploading file.");
				} else {
					var f = req.file;
					var user = security.getActiveUser(req);
					var fileDestination = config.imagesFileLoc(user.familyId) + req.body.fileLoc + req.body.fileName;
					 
					fileAccess.renameFile(f.path, fileDestination, finishPostImage, res, null);
				}
			});	
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/images/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - POST(Update) - /api/images/:id");
		
			var fileName = req.body.fileName;
			var fileExt = req.body.fileExt;
			var fileLoc = req.body.fileLoc;
			var fileName_Original = req.body.fileName_Original;
			var fileExt_Original = req.body.fileExt_Original;
			var fileLoc_Original = req.body.fileLoc_Original;

			var user = security.getActiveUser(req);
			var originalFile = config.imagesFileLoc(user.familyId) + fileLoc_Original + fileName_Original + fileExt_Original;
			var updateFile = config.imagesFileLoc(user.familyId) + fileLoc + fileName + fileExt;
			
			fileAccess.renameFile(originalFile, updateFile, finishPostImage, res, null);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/' + apiVersion + '/images/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - DELETE - /api/images/:id");
			
			var id = req.params.id;
			var fileName = req.query.fileName;
			var user = security.getActiveUser(req);
			var file = config.imagesFileLoc(user.familyId) + fileName;
			
			fileAccess.deleteFile(file, finishDeleteImage, res, id, user);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	function finishPostImage(err, res, id) {
		res.end(err.toString());
	}
	
	function finishGetImage(respData, res) {
		res.writeHead(200, {'Content-Type': 'image/jpg'});
		res.end(respData);
	}
	
	function finishDeleteImage(err, res, id, user) {
		res.end(err.toString());
	}
};