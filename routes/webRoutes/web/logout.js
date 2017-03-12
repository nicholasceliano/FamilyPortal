
module.exports = function(webRouter, security){
	webRouter.get('/logout', function (req, res) {
		security.logout(req, res);
	});
};