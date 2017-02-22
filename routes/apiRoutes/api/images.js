module.exports = function(app, data, security, config, fs, apiUploadsHelper){	
	app.get('/api/images', function (req, res) {
		if (security.checkUserAccess(req)) {
			var userId = req.query.userId;
			var path = req.query.path;
			
			var userInfo = security.getActiveUser(userId);
			var familyId = userInfo.familyId;
			var fileLocation = config.fileLoc + familyId + '/images/' + path;
			
			fs.readFile(fileLocation, function(err, data) {
				res.writeHead(200, {'Content-Type': 'image/jpg'});
				res.end(data);
			});
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
}