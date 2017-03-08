module.exports = function(app, apiVersion, data, security, config, fileAccess, pageErrors, logger){	

	app.get('/api/' + apiVersion + '/imageMetadata', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - GET - /api/images/metadata");
			
			var ct = req.query.ct;
			var start = req.query.start;
			var searchTerm = req.query.searchTerm;
			var folderPath = req.query.folderPath;
			
			if (ct === undefined || start === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/metadata' }));
			} else {				
				ct = security.verifyRequstCount(ct);
				data.getImageMetaData(ct, start, searchTerm, folderPath).then(function(d) {
					res.send(d);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/' + apiVersion + '/imageMetadata/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - GET - /api/images/metadata/:id'");
			
			var id = req.params.id;
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/metadata/:id' }));
			} else {				
				data.getImageMetaDataById(id).then(function(d) {
					res.send(d);
				}).catch(function() {
					pageErrors.send(req, res, 500);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/imageMetadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - POST(Insert) - /api/images/metadata");
		
			var imgInfo = req.body;
			var user = security.getActiveUser(req);
			
			data.insertImageMetaData(user, imgInfo).then(function(d) {
				res.send(d);
			});	
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/imageMetadata/:id', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info("API - POST(Update) - /api/images/metadata/:id");
		
			var id = req.params.id;
			var imgInfo = req.body;
			var user = security.getActiveUser(req);
			var originalFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName_Original + imgInfo.fileExt;
			var newFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName + imgInfo.fileExt;
			
			data.saveImageMetaDataById(id, user, imgInfo).then(function(d) {				
				res.send(d);
			});	
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/' + apiVersion + '/imageMetadata/:id', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info("API - DELETE - /api/images/metadata/:id");
			
			var id = req.params.id;
			var user = security.getActiveUser(req);
			
			data.deleteImageMetaDataById(id, user).then(function(d) {
				res.send(d);
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};