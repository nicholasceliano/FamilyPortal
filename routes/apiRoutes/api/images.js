module.exports = function(app, security, config, fileAccess, apiUploadsHelper){	
	app.get('/api/images', function (req, res) {
		if (security.checkUserAccess(req)) {
			var path = req.query.path;
			var user = security.getActiveUser(req);
			var fileLocation = config.imagesFileLoc(user.familyId) + path;
			
			fileAccess.readFile(fileLocation, finishGetImages, res);
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/images', apiUploadsHelper.saveImg.single('file'), function (req, res) {
		if (security.checkUserAccess(req)) {	
			//need to save it in a certain file location
				//get folder name, etc
			//need to save data in database
						
			res.send(JSON.stringify({ userImage: 'test' }));	
			
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	function finishGetImages(respData, res) {
		res.writeHead(200, {'Content-Type': 'image/jpg'});
		res.end(respData);
	}
}