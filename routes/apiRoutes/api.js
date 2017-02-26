//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

var apiUploadsHelper = require('./apiUploadsHelper.js');

module.exports = function(app, dataAccess, security, config, fileAccess, pageErrors, logger){	
	var fileLoc = './api';
	require(fileLoc + '/videos.js')(app, dataAccess, security, pageErrors, logger);
	require(fileLoc + '/images.js')(app, security, config, fileAccess, apiUploadsHelper, logger);
	require(fileLoc + '/images/metadata.js')(app, dataAccess, security, config, fileAccess, pageErrors, logger);
	require(fileLoc + '/images/thumbnail.js')(app, security, config, fileAccess, apiUploadsHelper, logger);
	require(fileLoc + '/familymembers.js')(app, dataAccess, security, pageErrors, logger);
	require(fileLoc + '/familymembers/photo.js')(app, dataAccess, security, apiUploadsHelper, pageErrors, logger);
};