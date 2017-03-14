var fs = require("fs-extra");

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
					return callback(false, res);
				}
			});
		},
		
		saveFolder: function(folderLocation, folderName, callback, req, res, next) {
			logger.info("Begin: fileAccess.saveFolder - folderLocation:" + folderLocation);
			
			fs.mkdir(folderLocation, function(err) {
				if (err){
					logger.error(err);
					return callback(err, null, req, res, next);
				} else  {
					logger.info("End: fileAccess.saveFolder");
					return callback(false, folderName, req, res, next);
				}	
			});
		},
		
		renameFile: function (originalFileName, newFileName, callback, res, id, next) {
			logger.info("Begin: fileAccess.renameFile - originalFileName:" + originalFileName + " newFileName:" + newFileName);
			
			fs.rename(originalFileName, newFileName, function(err) {
				if (err) {
					logger.error(err);
					return callback(err, res, id, next);
				} else {
					logger.info("End: fileAccess.renameFile");
					return callback(false, res, id, next);
				}
			});
		},
		
		deleteFile: function (file, callback, res, id, user, next) {
			logger.info("Begin: fileAccess.deleteFile - file:" + file);
			
			return fs.unlink(file, function(err) {	
				if (err) {
					logger.error(err);
					return callback(err, res, id, user, next);
				} else {
					logger.info("End: fileAccess.deleteFile");
					return callback(false, res, id, user, next);
				}
			});
		},
		
		readFile: function (baseFileLocation, path, callback, res, next) {
			logger.info("Begin: fileAccess.readFile - fileLoc:" + baseFileLocation + path);
			
			checkIfFile(baseFileLocation + path, function(err, isFile) {
				if (isFile) {
					fs.readFile(baseFileLocation + path, function(err, data){
						if (err) {
							logger.error(err);
							return callback(err, null, res, next);
						} else {
							logger.info("End: fileAccess.readFile");
							callback(false, data, res, next);
						}
					});
				} else {
					fs.readFile((__dirname + '/dist/images/defaultImage.jpg'), function(err, data){
						if (err) {
							logger.error(err);
							return callback(err, null, res, next);
						} else {
							logger.info("End: fileAccess.readFile");
							callback(false, data, res, next);
						}
					});	
				}
			});		
		},
		
		readFolders: function (folderLocation, callback, res, next) {
			fs.readdir(folderLocation, function(err, data) {
				if (err){
					logger.error(err);
					callback(err, null, res, next);
				} else {
					logger.info("End: FileAccess.readFolders");
					
					for(var i = 0; i < data.length; i++){//only get folders
						var dirObj = data[i].toLowerCase();
						
						if (dirObj.indexOf('.jpg') > -1 || dirObj.indexOf('.jpeg') > -1 || dirObj.indexOf('.bmp') > -1 || dirObj.indexOf('.gif') > -1 || dirObj.indexOf('.png') > -1) {
							data.splice(i, 1);
							i--;
						}
					}
					
					callback(false, data, res, next);
				}
			});
		},
		
		deleteFolder: function (folderLocation, folderPath, callback, req, res, next) {
			fs.ensureDir(folderLocation, function(err, data) {
				if (err){
					logger.error(err);
					callback(err, folderPath, req, res, next);
				} else {					
					fs.remove(folderLocation, function(err){
						if (err) {
							logger.error(err);
							return callback(err, folderPath, req, res, next);
						} else {
							logger.info("End: fileAccess.deleteFolder");
							callback(false, folderPath, req, res, next);
						}
					});
				}
			});
		}
	};
	
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

};