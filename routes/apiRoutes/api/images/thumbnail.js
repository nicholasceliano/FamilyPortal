
module.exports = function(app, security, config, fileAccess, apiUploadsHelper) {	
	app.get('/api/images/thumbnail', function (req, res) {
		if (security.checkUserAccess(req)) {
			var path = req.query.path;
			var user = security.getActiveUser(req);
			var baseFileLocation = config.thumbnailsFileLoc(user.familyId);
			
			fileAccess.readFile(baseFileLocation, path, finishGetImageThumbnail, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/images/thumbnail', function (req, res) {
		if (security.checkUserAccess(req)) {
			if (req.body.fileName && req.body.fileLoc && req.body.fileExt)
				updateImageThumbnail(req, res);
			else 
				insertImageThumbnail(req, res);		
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	function updateImageThumbnail(req, res) {
		var fileName = req.body.fileName;
		var fileExt = req.body.fileExt;
		var fileLoc = req.body.fileLoc;
		var fileName_Original = req.body.fileName_Original;
		var fileExt_Original = req.body.fileExt_Original;
		var fileLoc_Original = req.body.fileLoc_Original;

		var user = security.getActiveUser(req);
		var originalFile = config.thumbnailsFileLoc(user.familyId) + fileLoc_Original + fileName_Original + '.thumbnail' + fileExt_Original;
		var updateFile = config.thumbnailsFileLoc(user.familyId) + fileLoc + fileName + '.thumbnail' + fileExt;
		
		fileAccess.renameFile(originalFile, updateFile, renameFileCallback, res, null);
		
		function renameFileCallback(err, res, id) {
			res.end(err.toString());
		}
	}
	
	function insertImageThumbnail(req, res) {
		apiUploadsHelper.saveImg(req, res, function (err) {
			if(err) {
				return res.end("Error uploading file.");
			} else {
				var f = req.file;
				var user = security.getActiveUser(req);
				var fileDestination = config.thumbnailsFileLoc(user.familyId) + req.body.fileLoc + req.body.fileName;
				 
				fileAccess.renameFile(f.path, fileDestination, renameFileCallback, res, null);
				 
				function renameFileCallback(err, res, id) {
					res.end(err.toString());
				}
			}
		});
	}
	
	function finishGetImageThumbnail(respData, res) {
		res.writeHead(200, {'Content-Type': 'image/jpg'});
		res.end(respData);
	}

}