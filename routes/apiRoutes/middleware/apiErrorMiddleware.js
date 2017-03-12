module.exports = function(pageErrors){	
	return function (err, req, res, next) {
		if (err.message == '500')
			pageErrors.send(req, res, parseInt(err.message));
		else 
			res.send(JSON.stringify({ err: true, value: 'Error with ' + req.method + ' - ' + req.url + ' - ' + err.message }));
	};
};