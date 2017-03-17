module.exports = function(apiRouter, dataAccess, security, config){	
	
	apiRouter.get('/videos', function (req, res, next) {		
		var ct = req.query.ct;
		var start = req.query.start;
		
		if (ct === undefined || start === undefined) {
			next(new Error('ct === undefined || start === undefined'));
		} else {				
			ct = security.verifyRequstCount(ct);
			dataAccess.getVideos(ct, start).then(function(d) {
				res.send(d);
			});
		}
	});
	
	apiRouter.get('/videos/:id', function (req, res, next) {
		var id = req.params.id;
		
		if (id === undefined) {
			next(new Error('id === undefined'));
		} else {
			dataAccess.getVideoByID(id).then(function(d) {
				var data = JSON.parse(d);
				if (data.err === false)
					data.value.url = config.videosBaseUri + data.value.url;
				
				res.send(JSON.stringify(data));
			}).catch(function () {
				next(new Error(500));
			});
		}
	});
};