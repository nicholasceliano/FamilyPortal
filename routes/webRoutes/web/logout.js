
module.exports = function(app, security){
	app.get('/logout', function (req, res) {
		security.logout(req, res);
	});
}