module.exports = function(app, apiVersion, data, security, config, fileAccess, pageErrors, logger){	

	app.get('/api/' + apiVersion + '/images/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - GET - /api/' + apiVersion + '/images/metadata');
			
			var ct = req.query.ct;
			var start = req.query.start;
			var searchTerm = req.query.searchTerm;
			var folderPath = req.query.folderPath;
			
			if (ct === undefined || start === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/' + apiVersion + '/images/metadata' }));
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
	
	app.get('/api/' + apiVersion + '/images/:id/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - GET - /api/' + apiVersion + '/images/:id/metadata');
			
			var id = req.params.id;
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with GET /api/' + apiVersion + '/images/:id/metadata' }));
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
	
	app.post('/api/' + apiVersion + '/images/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info('API - POST(Insert) - /api/' + apiVersion + '/images/metadata');
		
			var imgInfo = req.body;
			var user = security.getActiveUser(req);
			
			if (imgInfo === undefined){ 
				res.send(JSON.stringify({ err: true, value: 'Error with POST(Insert) - /api/' + apiVersion + '/images/metadata' }));
			} else {			
				data.insertImageMetaData(user, imgInfo).then(function(d) {
					res.send(d);
				});	
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/' + apiVersion + '/images/:id/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			logger.info('API - POST(Update) - /api/' + apiVersion + '/images/:id/metadata');
		
			var id = req.params.id;
			var imgInfo = req.body;
			var user = security.getActiveUser(req);
			var originalFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName_Original + imgInfo.fileExt;
			var newFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName + imgInfo.fileExt;
			
			if (id === undefined || imgInfo === undefined){ 
				res.send(JSON.stringify({ err: true, value: 'Error with POST(Update) - /api/' + apiVersion + '/images/metadata' }));
			} else {
				data.saveImageMetaDataById(id, user, imgInfo).then(function(d) {				
					res.send(d);
				});	
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.delete('/api/' + apiVersion + '/images/:id/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {
			logger.info('API - DELETE - /api/' + apiVersion + '/images/:id/metadata');
			
			var id = req.params.id;
			var user = security.getActiveUser(req);
			
			if (id === undefined) {
				res.send(JSON.stringify({ err: true, value: 'Error with DELETE - /api/' + apiVersion + '/images/metadata' }));
			} else {
				data.deleteImageMetaDataById(id, user).then(function(d) {
					res.send(d);
				});
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};