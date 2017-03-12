module.exports = function(app, dataAccess, security, config, fileAccess, pageErrors, logger, express){	
	var fileLoc = './api';
	var apiRouter = express.Router();
	var apiUploadsHelper = require('./apiUploadsHelper.js');
	var apiMiddleware = require('./middleware/apiMiddleware')(security, logger);
	var apiErrorMiddleware = require('./middleware/apiErrorMiddleware')(pageErrors);
	
	app.use(apiMiddleware);//order matters here
	app.use('/api/' + config.api.version, apiRouter);
	app.use(apiErrorMiddleware);
		
	require(fileLoc + '/userActivity.js')(apiRouter, dataAccess, security);
	require(fileLoc + '/videos.js')(apiRouter, dataAccess, security);
	require(fileLoc + '/images/folder.js')(apiRouter, security, config, fileAccess);
	require(fileLoc + '/images/metadata.js')(apiRouter, dataAccess, security, config);
	require(fileLoc + '/images/photo.js')(apiRouter, security, config, fileAccess, apiUploadsHelper);
	require(fileLoc + '/images/thumbnail.js')(apiRouter, security, config, fileAccess, apiUploadsHelper);
	require(fileLoc + '/familymembers.js')(apiRouter, dataAccess, security);
	require(fileLoc + '/familymembers/photo.js')(apiRouter, dataAccess, security, apiUploadsHelper);
};