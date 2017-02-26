
module.exports = function(app, security, logger){
	app.get('/logout', function (req, res) {
		logger.info("WEB - GET -  /logout");
		
		security.logout(req, res);
	});
};