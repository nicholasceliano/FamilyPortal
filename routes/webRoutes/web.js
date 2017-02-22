//Webpage Routes Only
module.exports = function(app, dataAccess, security, config){
	require('./web/calendar.js')(app, security);
	require('./web/family.js')(app, security);
	require('./web/family/family_member_profile.js')(app, security);
	require('./web/index.js')(app, security);
	require('./web/images.js')(app, security);
	require('./web/images/view.js')(app, security);
	require('./web/login.js')(app, security);
	require('./web/logout.js')(app, security);
	require('./web/profile.js')(app, security);
	require('./web/videos.js')(app, security);
	require('./web/videos/watch.js')(app, dataAccess, security, config);
};