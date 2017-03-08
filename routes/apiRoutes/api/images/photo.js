module.exports = function(app, apiVersion, security, config, fileAccess, apiUploadsHelper, logger){	
	app.get('/api/' + apiVersion + '/images/:id/photo', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - GET - /api/' + apiVersion + '/images/:id/photo');
			
			var path = req.query.path;
			var user = security.getActiveUser(req);
			var baseFileLocation = config.imagesFileLoc(user.familyId);
			
			if (path === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET - /api/' + apiVersion + '/images/:id/photo' }));
			} else {
				fileAccess.readFile(baseFileLocation, path, finishGetImage, res);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/images/photo', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - POST(Insert) - /api/' + apiVersion + '/images/photo');
		
			apiUploadsHelper.saveImg(req, res, function (err) {
				if(err) {
					logger.error(err);
					return res.send(JSON.stringify({ err: true, value: 'Error with POST(Insert) - /api/' + apiVersion + '/images/:id/photo' }));
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
	
	app.post('/api/' + apiVersion + '/images/:id/photo', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - POST(Update) - /api/' + apiVersion + '/images/:id/photo');
		
			var fileName = req.body.fileName;
			var fileExt = req.body.fileExt;
			var fileLoc = req.body.fileLoc;
			var fileName_Original = req.body.fileName_Original;
			var fileExt_Original = req.body.fileExt_Original;
			var fileLoc_Original = req.body.fileLoc_Original;

			var user = security.getActiveUser(req);
			var originalFile = config.imagesFileLoc(user.familyId) + fileLoc_Original + fileName_Original + fileExt_Original;
			var updateFile = config.imagesFileLoc(user.familyId) + fileLoc + fileName + fileExt;
			
			if (fileName === undefined || fileExt === undefined || fileLoc === undefined || fileName_Original === undefined || fileExt_Original === undefined || fileLoc_Original === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with POST(Update) - /api/' + apiVersion + '/images/:id/photo' }));
			} else {
				fileAccess.renameFile(originalFile, updateFile, finishPostImage, res, null);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/' + apiVersion + '/images/:id/photo', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - DELETE - /api/' + apiVersion + '/images/:id/photo');
			
			var id = req.params.id;
			var fileName = req.query.fileName;
			var user = security.getActiveUser(req);
			var file = config.imagesFileLoc(user.familyId) + fileName;
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with DELETE - /api/' + apiVersion + '/images/:id/photo' }));
			} else {
				fileAccess.deleteFile(file, finishDeleteImage, res, id, user);
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	function finishPostImage(err, res, id) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			res.send(JSON.stringify({ err: true, value: 'Error with finishPostImage - ' + err.toString() }));
	}
	
	function finishGetImage(err, respData, res) {
		if (err === false) {
			res.writeHead(200, {'Content-Type': 'image/jpg'});
			res.end(respData);
		} else {
			res.send(JSON.stringify({ err: true, value: 'Error with finishGetImage - ' + err.toString() }));
		}
	}
	
	function finishDeleteImage(err, res, id, user) {
		if (err === false)
			res.send(JSON.stringify({ err: false, value: true }));
		else
			res.send(JSON.stringify({ err: true, value: 'Error with finishDeleteImage - ' + err.toString() }));
	}
};