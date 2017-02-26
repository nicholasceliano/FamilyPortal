//Webpage Routes Only
module.exports = function(app, dataAccess, security, config, logger){
	require('./web/calendar.js')(app, security, logger);
	require('./web/family.js')(app, security, logger);
	require('./web/family/family_member_profile.js')(app, security, logger);
	require('./web/index.js')(app, security, logger);
	require('./web/images.js')(app, security, logger);
	require('./web/images/view.js')(app, security, logger);
	require('./web/login.js')(app, security, logger);
	require('./web/logout.js')(app, security, logger);
	require('./web/profile.js')(app, security, logger);
	require('./web/videos.js')(app, security, logger);
	require('./web/videos/watch.js')(app, dataAccess, security, config, logger);
};