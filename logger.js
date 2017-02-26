var winston = require('winston');

module.exports = {	
	getLogger: function () {
		return logger;
	}	
}

var fileDate = (new Date().getMonth() + 1) + '-' + (new Date().getDate()) + '-' + (new Date().getFullYear());

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.File)({
			name: 'info-file',
			filename: './logs/filelog-info-' + fileDate + '.log',
			level: 'info',
			json: false,
			formatter: function(options) {
				if (options.level === 'error')
					return JSON.stringify({ level: options.level, timestamp: new Date().toISOString(), message: options.message, meta: options.meta });
				else 
					return JSON.stringify({ level: options.level, timestamp: new Date().toISOString(), message: options.message });
			}
		})
	]
});