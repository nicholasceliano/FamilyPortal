//C:\git\FamilyProject

//References
var express = require('express');
var fs = require("fs");

//Global variables
var app = express();

//Set up PUG view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.locals.basedir = app.get('views');

//Make distribution files public to Client
app.use('/dist', express.static('dist'));//makes /dist folder accessable from client side

//Routes
require('./routes/webpages.js')(app);
require('./routes/api/data.js')(app);

//App Start
app.listen(3000, function () {
	console.log('App listening on port 3000');
});