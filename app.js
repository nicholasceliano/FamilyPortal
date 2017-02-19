//C:\git\FamilyProject

//References
var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var config = (process.env.NODE_ENV.toLowerCase() === 'prod' ? require('./config.js').prod : require('./config.js').dev);
var data = require('./dataAccess.js')(config);
var security = require('./security.js')(data);

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
require('./routes/webpages.js')(app, data, security, config);
require('./routes/api/data.js')(app, data, security, config, fs);

//App Start
app.listen(config.port, function () {
	var userCheckInterval_InSeconds = 3;
	
	setInterval(function() { security.removeInactiveUsers(); }, userCheckInterval_InSeconds*1000);
	console.log('App listening on port ' + config.port);
});