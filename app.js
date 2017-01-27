//C:\git\FamilyProject

//References
var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
var data = require('./dataAccess.js');
var security = require('./security.js')(data);

//Global variables
var app = express();

//App Configuration
app.use(bodyParser.urlencoded({ extended: true }));

//Set up PUG view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.locals.basedir = app.get('views');

//Make distribution files public to Client
app.use('/dist', express.static('dist'));//makes /dist folder accessable from client side
app.use('/fonts', express.static('fonts'));//makes /fonts folder accessable from client side

//Routes
require('./routes/webpages.js')(app, data, security);
require('./routes/api/data.js')(app, data, security);

//App Start
app.listen(3000, function () {
	var userCheckInterval_InSeconds = 3;
	
	setInterval(function() { security.removeInactiveUsers(); }, userCheckInterval_InSeconds*1000);
	console.log('App listening on port 3000');
});