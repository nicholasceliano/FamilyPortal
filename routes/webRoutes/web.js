//Webpage Routes Only
module.exports = function(app, dataAccess, security, config, logger, express){
	var webRouter = express.Router();
	var webMiddleware = require('./middleware/webMiddleware')(security, logger);
	
	app.use(webMiddleware);//order matters here
	app.use('/', webRouter);
	
	require('./web/calendar.js')(webRouter);
	require('./web/family.js')(webRouter);
	require('./web/family/family_member_profile.js')(webRouter);
	require('./web/index.js')(webRouter);
	require('./web/images.js')(webRouter);
	require('./web/images/view.js')(webRouter);
	require('./web/login.js')(webRouter, security);
	require('./web/logout.js')(webRouter, security);
	require('./web/profile.js')(webRouter, security);
	require('./web/videos.js')(webRouter);
	require('./web/videos/watch.js')(webRouter, dataAccess, config);
};