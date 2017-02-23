//pageErrors.js

module.exports = function (security) {	
	return { 
		send: function(req, res, status) {
			if (status === 404)
				send404(req, res);
			else if (status === 500)
				send500(req, res);
		}
	}
	
	function send404 (req, res) {
		res.status(404);
		if (req.accepts('html')) {
			var accessDenied = security.checkUserAccess(req) ? false : true;
			res.render('error/404', { accessDenied: accessDenied, errCode: 404 });
			return;
		}
	}

	function send500 (req, res) {
		res.status(500);
		if (req.accepts('html')) {
			var accessDenied = security.checkUserAccess(req) ? false : true;
			res.render('error/500', { accessDenied: accessDenied, errCode: 500 });
			return;
		}
	}
};