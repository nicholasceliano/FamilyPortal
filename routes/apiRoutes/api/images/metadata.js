module.exports = function(apiRouter, dataAccess, security, config){	

	apiRouter.get('/images/metadata', function (req, res, next) {
		var ct = req.query.ct;
		var start = req.query.start;
		var searchTerm = req.query.searchTerm;
		var folderPath = req.query.folderPath;
		
		if (ct === undefined || start === undefined) {
			next(new Error('ct === undefined || start === undefined'));
		} else {				
			ct = security.verifyRequstCount(ct);
			dataAccess.getImageMetaData(ct, start, searchTerm, folderPath).then(function(d) {
				res.send(d);
			});
		}
	});
	
	apiRouter.get('/images/:id/metadata', function (req, res, next) {
		var id = req.params.id;
		
		if (id === undefined) {
			next(new Error('id === undefined'));
		} else {				
			dataAccess.getImageMetaDataById(id).then(function(d) {
				res.send(d);
			}).catch(function() {
				next(new Error(500));
			});
		}
	});
	
	apiRouter.post('/images/metadata', function (req, res, next) {
		var imgInfo = req.body;
		var user = security.getActiveUser(req);
		
		if (imgInfo === undefined){ 
			next(new Error('imgInfo === undefined'));
		} else {			
			dataAccess.insertImageMetaData(user, imgInfo).then(function(d) {
				res.send(d);
			});	
		}
	});
	
	apiRouter.post('/images/:id/metadata', function (req, res, next) {
		var id = req.params.id;
		var imgInfo = req.body;
		var user = security.getActiveUser(req);
		var originalFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName_Original + imgInfo.fileExt;
		var newFileName = config.imagesFileLoc(user.familyId) + imgInfo.fileName + imgInfo.fileExt;
		
		if (id === undefined || imgInfo === undefined){ 
			next(new Error('id === undefined || imgInfo === undefined'));
		} else {
			dataAccess.saveImageMetaDataById(id, user, imgInfo).then(function(d) {				
				res.send(d);
			});	
		}
	});
	
	apiRouter.delete('/images/:id/metadata', function (req, res, next) {
		var id = req.params.id;
		var user = security.getActiveUser(req);
		
		if (id === undefined) {
			next(new Error('id === undefined || imgInfo === undefined'));
		} else {
			dataAccess.deleteImageMetaDataById(id, user).then(function(d) {
				res.send(d);
			});
		}
	});
};