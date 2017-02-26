//C:\git\FamilyProject

//References
var express = require('express');
var bodyParser = require('body-parser');
var config = (process.env.NODE_ENV.toLowerCase() === 'prod' ? require('./config.js').prod : require('./config.js').dev);
var logger = require('./logger.js').getLogger();
var dataAccess = require('./dataAccess.js')(config, logger);
var fileAccess = require('./fileAccess.js')(logger);
var security = require('./security.js')(dataAccess, config, logger);
var pageErrors = require('./routes/webRoutes/pageErrors.js')(security, logger);

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
require('./routes/webRoutes/web.js')(app, dataAccess, security, config, logger);
require('./routes/apiRoutes/api.js')(app, dataAccess, security, config, fileAccess, pageErrors, logger);

//Error Page Handling
app.use(function(req, res, next) {
	pageErrors.send(req, res, 404);
});

//App Start
app.listen(config.port, function () {
	var userCheckInterval_InSeconds = 3;
	
	setInterval(function() { security.removeInactiveUsers(); }, userCheckInterval_InSeconds*1000);
	logger.info('App listening on port ' + config.port);
});