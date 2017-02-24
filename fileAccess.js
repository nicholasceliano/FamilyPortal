var fs = require("fs");

module.exports = {
	saveFile: function (fileName, imageData) {
		fs.writeFile(fileName, imageData, function(err) {
			if (err)
				return callback(err, res);
			else 
				return callback(true, res);
		});
	},
	
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
	
	readFile: function (baseFileLocation, path, callback, res) {
		checkIfFile(baseFileLocation + path, function(err, isFile) {
			if (isFile) {
				fs.readFile(baseFileLocation + path, function(err, data){
					return (err) ? callback('Error', res) : callback(data, res);
				});
			} else {
				fs.readFile((__dirname + '/dist/images/defaultImage.jpg'), function(err, data){
					return (err) ? callback('Error', res) : callback(data, res);
				});	
			}
		});		
	}

}

function checkIfFile(file, cb) {
	fs.stat(file, function fsStat(err, stats) {
		if (err) {
			if (err.code === 'ENOENT') {
				return cb(null, false);
			} else {
				return cb(err);
			}
		}
		return cb(null, stats.isFile());
	});
}
