//API Routes - Data - Naming will be reworked once MongoDB is set up
// /api/data/{dataContent}.json

var apiUploadsHelper = require('./apiUploadsHelper.js');

module.exports = function(app, dataAccess, security, config, fileAccess, pageErrors, logger){	
	var fileLoc = './api';
	var apiVersion = config.api.version;
	require(fileLoc + '/userActivity.js')(app, apiVersion, dataAccess, security, logger);
	require(fileLoc + '/videos.js')(app, apiVersion, dataAccess, security, pageErrors, logger);
	require(fileLoc + '/images.js')(app, apiVersion, security, config, fileAccess, apiUploadsHelper, logger);
	require(fileLoc + '/imageFolder.js')(app, apiVersion, security, config, fileAccess, logger);
	require(fileLoc + '/imageMetadata.js')(app, apiVersion, dataAccess, security, config, fileAccess, pageErrors, logger);
	require(fileLoc + '/imageThumbnail.js')(app, apiVersion, security, config, fileAccess, apiUploadsHelper, logger);
	require(fileLoc + '/familymembers.js')(app, apiVersion, dataAccess, security, pageErrors, logger);
	require(fileLoc + '/familymembers/photo.js')(app, apiVersion, dataAccess, security, apiUploadsHelper, pageErrors, logger);
};