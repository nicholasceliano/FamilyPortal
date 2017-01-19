//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

module.exports = function(app){
	app.get('/api/data/videos', function (req, res) {
		res.sendFile('data/videos.json', {root: './' });
	});
};