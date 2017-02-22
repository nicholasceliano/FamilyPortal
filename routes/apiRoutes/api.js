//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

var apiUploadsHelper = require('./apiUploadsHelper.js')

module.exports = function(app, dataAccess, security, config, fileAccess){	
	var fileLoc = './api';
	require(fileLoc + '/videos.js')(app, dataAccess, security);
	require(fileLoc + '/images.js')(app, security, config, fileAccess, apiUploadsHelper);
	require(fileLoc + '/images/metadata.js')(app, dataAccess, security, config, fileAccess);
	require(fileLoc + '/familymembers.js')(app, dataAccess, security);
	require(fileLoc + '/familymembers/photo.js')(app, dataAccess, security, apiUploadsHelper);
};