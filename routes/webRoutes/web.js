//Webpage Routes Only
module.exports = function(app, security, logger, express){
	var webRouter = express.Router();
	var webMiddleware = require('./middleware/webMiddleware')(security, logger);
	
	app.get('/', function(req, res) {
		res.redirect('/app');
	});
	
	webRouter.use(webMiddleware);//order matters here
	app.use('/app', webRouter);
	
	require('./web/index.js')(webRouter);
	require('./web/login.js')(webRouter, security);
};