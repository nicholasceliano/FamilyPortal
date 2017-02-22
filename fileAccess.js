var fs = require("fs");

module.exports = {
	renameFile: function (originalFileName, newFileName, callback, res, id) {
		fs.rename(originalFileName, newFileName, function(err) {
			if (err) 
				return callback(err, res, id);
			else
				return callback(true, res, id);
		});
	},
	
	deleteFile: function (file, callback, res, id) {
		return fs.unlink(file, function(err) {
			if (err) 
				return callback(err, res, id)
			else
				return callback(true, res, id);
		});
	},
	
	readFile: function (fileLocation, callback, res) {
		fs.readFile(fileLocation, function(err, data){
			if(err) 
				return callback(err, res);
			else 
				return callback(data, res);
		});
	}
	
}
