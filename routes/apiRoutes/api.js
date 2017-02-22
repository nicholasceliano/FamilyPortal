//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

var apiUploadsHelper = require('./apiUploadsHelper.js')

module.exports = function(app, data, security, config, fs){	
	var fileLoc = './api';
	require(fileLoc + '/videos.js')(app ,data, security);
	require(fileLoc + '/images.js')(app, data, security, config, fs , apiUploadsHelper());
	require(fileLoc + '/images/metadata.js')(app, data, security, config, fs);
	require(fileLoc + '/familymembers.js')(app, data, security);
	require(fileLoc + '/familymembers/photo.js')(app, data, security, apiUploadsHelper());
};