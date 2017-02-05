//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

module.exports = function(app, data, security){
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
};