
module.exports = function(app, apiVersion, security, config, fileAccess, apiUploadsHelper, logger) {	
	app.get('/api/' + apiVersion + '/images/:id/thumbnail', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - GET - /api/' + apiVersion + '/images/:id/thumbnail');
			
			var path = req.query.path;
			var user = security.getActiveUser(req);
			var baseFileLocation = config.thumbnailsFileLoc(user.familyId);
			
			if (path === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET - /api/' + apiVersion + '/images/:id/thumbnail' }));
			} else {
				fileAccess.readFile(baseFileLocation, path, finishGetImageThumbnail, res);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/images/thumbnail', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - POST(Insert) - /api/' + apiVersion + '/images/thumbnail');
		
			apiUploadsHelper.saveImg(req, res, function (err) {
				if(err) {
					return res.send(JSON.stringify({ err: true, value: 'Error with POST(Insert) - /api/' + apiVersion + '/images/thumbnail' }));
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
	
	app.post('/api/' + apiVersion + '/images/:id/thumbnail', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - POST(Update) - /api/' + apiVersion + '/images/:id/thumbnail');
		
			var fileName = req.body.fileName;
			var fileExt = req.body.fileExt;
			var fileLoc = req.body.fileLoc;
			var fileName_Original = req.body.fileName_Original;
			var fileExt_Original = req.body.fileExt_Original;
			var fileLoc_Original = req.body.fileLoc_Original;

			var user = security.getActiveUser(req);
			var originalFile = config.thumbnailsFileLoc(user.familyId) + fileLoc_Original + fileName_Original + '.thumbnail' + fileExt_Original;
			var updateFile = config.thumbnailsFileLoc(user.familyId) + fileLoc + fileName + '.thumbnail' + fileExt;
			
			if (fileName === undefined || fileExt === undefined || fileLoc === undefined || fileName_Original === undefined || fileExt_Original === undefined || fileLoc_Original === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with POST(Update) - /api/' + apiVersion + '/images/:id/thumbnail' }));
			} else {
				fileAccess.renameFile(originalFile, updateFile, finishPostImageThumbnail, res, null);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/' + apiVersion + '/images/:id/thumbnail', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - DELETE - /api/' + apiVersion + '/images/:id/thumbnail');
			
			var id = req.params.id;
			var fileName = req.query.fileName;
			var user = security.getActiveUser(req);
			var file = config.thumbnailsFileLoc(user.familyId) + fileName;
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with DELETE - /api/' + apiVersion + '/images/:id/thumbnail' }));
			} else {
				fileAccess.deleteFile(file, finishDeleteImageThumbnail, res, id, user);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	function finishPostImageThumbnail(err, res, id) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			res.send(JSON.stringify({ err: true, value: 'Error with finishPostImageThumbnail - ' + err.toString() }));
	}
	
	function finishGetImageThumbnail(err, respData, res) {
		if (err === false) {
			res.writeHead(200, {'Content-Type': 'image/jpg'});
			res.end(respData);
		} else {
			res.send(JSON.stringify({ err: true, value: 'Error with finishGetImageThumbnail - ' + err.toString() }));
		}
	}
	function finishDeleteImageThumbnail (err, res, id, user) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			res.send(JSON.stringify({ err: true, value: 'Error with finishDeleteImageThumbnail - ' + err.toString() }));
	}
};