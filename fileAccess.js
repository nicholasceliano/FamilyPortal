var fs = require("fs");

module.exports = function(logger) {
	return {
		saveFile: function (fileName, imageData) {
			logger.info("Begin: fileAccess.saveFile - fileName:" + fileName);
			
			fs.writeFile(fileName, imageData, function(err) {
				if (err) {
					logger.error(err);
					return callback(err, res);
				} else {
					logger.info("End: fileAccess.saveFile");
					return callback(true, res);
				}
			});
		},
		
		renameFile: function (originalFileName, newFileName, callback, res, id) {
			logger.info("Begin: fileAccess.renameFile - originalFileName:" + originalFileName + " newFileName:" + newFileName);
			
			fs.rename(originalFileName, newFileName, function(err) {
				if (err) {
					logger.error(err);
					return callback(err, res, id);
				} else {
					logger.info("End: fileAccess.renameFile");
					return callback(true, res, id);
				}
			});
		},
		
		deleteFile: function (file, callback, res, id) {
			logger.info("Begin: fileAccess.deleteFile - file:" + file);
			
			return fs.unlink(file, function(err) {	
				if (err) {
					logger.error(err);
					return callback(err, res, id)
				} else {
					logger.info("End: fileAccess.deleteFile");
					return callback(true, res, id);
				}
			});
		},
		
		readFile: function (baseFileLocation, path, callback, res) {
			logger.info("Begin: fileAccess.readFile - fileLoc:" + baseFileLocation + path);
			
			checkIfFile(baseFileLocation + path, function(err, isFile) {
				if (isFile) {
					fs.readFile(baseFileLocation + path, function(err, data){
						if (err) {
							logger.error(err);
							return callback('Error', res);
						} else {
							logger.info("End: fileAccess.readFile");
							callback(data, res);
						}
					});
				} else {
					fs.readFile((__dirname + '/dist/images/defaultImage.jpg'), function(err, data){
						if (err) {
							logger.error(err);
							return callback('Error', res);
						} else {
							logger.info("End: fileAccess.readFile");
							callback(data, res);
						}
					});	
				}
			});		
		}
	}
	
	function checkIfFile(file, cb) {
		logger.info("Begin: fileAccess.checkIfFile - file:" + file);
		fs.stat(file, function fsStat(err, stats) {
			if (err) {
				logger.error(err);
				if (err.code === 'ENOENT') {
					return cb(null, false);
				} else {
					return cb(err);
				}
			}
			logger.info("End: fileAccess.checkIfFile");
			return cb(null, stats.isFile());
		});
	}

}

