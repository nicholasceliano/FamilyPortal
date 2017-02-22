//C:\git\FamilyProject

//References
var express = require('express');
var bodyParser = require('body-parser');
var config = (process.env.NODE_ENV.toLowerCase() === 'prod' ? require('./config.js').prod : require('./config.js').dev);
var dataAccess = require('./dataAccess.js')(config);
var fileAccess = require('./fileAccess.js');
var security = require('./security.js')(dataAccess);

//Global variables
var app = express();

//App Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set up PUG view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.locals.basedir = app.get('views');

//Make distribution files public to Client
app.use('/dist', express.static('dist'));//makes /dist folder accessable from client side
app.use('/fonts', express.static('fonts'));//makes /fonts folder accessable from client side

//Routes
require('./routes/webRoutes/web.js')(app, dataAccess, security, config);
require('./routes/apiRoutes/api.js')(app, dataAccess, security, config, fileAccess);

//Error Page Handling
app.use(function(req, res, next) {
	res.status(404);
	if (req.accepts('html')) {
		var accessDenied = security.checkUserAccess(req) ? false : true;
		res.render('404', { accessDenied: accessDenied });
		return;
	}
});

//App Start
app.listen(config.port, function () {
	var userCheckInterval_InSeconds = 3;
	
	setInterval(function() { security.removeInactiveUsers(); }, userCheckInterval_InSeconds*1000);
	console.log('App listening on port ' + config.port);
});