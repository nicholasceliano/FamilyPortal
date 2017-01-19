//C:\git\FamilyProject

//References
var express = require('express');
var fs = require("fs");

//Global variables
var app = express();

app.use('/dist', express.static('dist'));//makes /dist folder accessable from client side
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Routes
require('./routes/webpages.js')(app);
require('./routes/api/data.js')(app);

//App Start
app.listen(3000, function () {
	console.log('App listening on port 3000');
});