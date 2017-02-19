//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

var apiUploadsHelper = require('./apiUploadsHelper.js')

module.exports = function(app, data, security, config, fs){
	app.get('/api/data/video', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			
			data.getVideoByID(id).then(function(video) {
				res.send(JSON.stringify({ video: video }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/data/videos', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var ct = req.query.ct;
			
			data.getVideos(ct).then(function(videoArray) {
				res.send(JSON.stringify({ videos: videoArray }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/data/familymember', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			
			data.getFamilyMemberByID(id).then(function(familyMember) {
				res.send(JSON.stringify({ familyMember: familyMember }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/data/familymember', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var userInfo = req.body;
			
			data.saveFamilyMemberByID(userInfo).then(function(responseMsg) {
				res.send(JSON.stringify({ msg: responseMsg }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/data/familymembers', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var ct = req.query.ct;
			
			data.getFamilyMembers(ct).then(function(familyMemberArray) {
				res.send(JSON.stringify({ familyMembers: familyMemberArray }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/data/familymember/photo', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			
			data.getFamilyMemberPhotoById(id).then(function(familyMemberImageData) {
				res.send(JSON.stringify({ familyMember: familyMemberImageData }));
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/data/familymember/photo', apiUploadsHelper().tempImgUpload.single('file'), function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var buffer = req.file.buffer;
			
			data.saveFamilyMemberPhotoById(id, buffer).then(function(imgBase64) {
				res.send(JSON.stringify({ userImage: imgBase64 }));	
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/data/image', function (req, res) {
		if (security.checkUserAccess(req)) {
			var path = req.query.path;
			
			fs.readFile(config.fileLoc + path, function(err, data) {
				res.writeHead(200, {'Content-Type': 'image/jpg'});
				res.end(data);
			});
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.post('/api/data/image', apiUploadsHelper().saveImg.single('file'), function (req, res) {
		if (security.checkUserAccess(req)) {	
			//need to save it in a certain file location
				//get folder name, etc
			//need to save data in database
						
			res.send(JSON.stringify({ userImage: 'test' }));	
			
		} else {
			security.sessionExpiredResponse(res);
		}
	});
	
	app.get('/api/data/image/metadata', function (req, res) {
		if (security.checkUserAccess(req)) {	
			var id = req.query.id;
			var ct = req.query.ct;
			
			if (id === undefined && ct === undefined) {
				res.send(JSON.stringify({ imageInfo: null }));
			} else {
				if (id){
					data.getImageMetaDataById(id).then(function(imageInfoData) {
						res.send(JSON.stringify({ imageInfo: imageInfoData[0] }));
					});		
				} else {
					data.getImageMetaData(ct).then(function(imageInfoData) {
						res.send(JSON.stringify({ imageInfo: imageInfoData }));
					});		
				}
			}
		} else {
			security.sessionExpiredResponse(res);
		}
	});
};