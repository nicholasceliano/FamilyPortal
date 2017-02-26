module.exports = function(app, security, config, fileAccess, apiUploadsHelper, logger){	
	app.get('/api/images', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - GET - /api/images");
			
			var path = req.query.path;
			var user = security.getActiveUser(req);
			var baseFileLocation = config.imagesFileLoc(user.familyId);
			
			fileAccess.readFile(baseFileLocation, path, finishGetImages, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/images', function (req, res) {
		if (security.checkUserAccess(req)) {
			if (req.body.fileName && req.body.fileLoc && req.body.fileExt)
				updateImage(req, res);
			else 
				insertImage(req, res);		
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	function updateImage(req, res) {
		logger.info("API - POST(Update) - /api/images");
		
		var fileName = req.body.fileName;
		var fileExt = req.body.fileExt;
		var fileLoc = req.body.fileLoc;
		var fileName_Original = req.body.fileName_Original;
		var fileExt_Original = req.body.fileExt_Original;
		var fileLoc_Original = req.body.fileLoc_Original;

		var user = security.getActiveUser(req);
		var originalFile = config.imagesFileLoc(user.familyId) + fileLoc_Original + fileName_Original + fileExt_Original;
		var updateFile = config.imagesFileLoc(user.familyId) + fileLoc + fileName + fileExt;
		
		fileAccess.renameFile(originalFile, updateFile, renameFileCallback, res, null);
	}
	
	function insertImage(req, res) {
		logger.info("API - POST(Insert) - /api/images");
		
		apiUploadsHelper.saveImg(req, res, function (err) {
			if(err) {
				logger.error(err);
				return res.end("Error uploading file.");
			} else {
				var f = req.file;
				var user = security.getActiveUser(req);
				var fileDestination = config.imagesFileLoc(user.familyId) + req.body.fileLoc + req.body.fileName;
				 
				fileAccess.renameFile(f.path, fileDestination, renameFileCallback, res, null);
			}
		});
	}
	
	function renameFileCallback(err, res, id) {
		res.end(err.toString());
	}
	
	function finishGetImages(respData, res) {
		res.writeHead(200, {'Content-Type': 'image/jpg'});
		res.end(respData);
	}
};