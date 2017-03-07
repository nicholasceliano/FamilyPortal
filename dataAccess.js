//lets require/import the mongodb native drivers.

var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var dbURL;

module.exports = function(config, logger) {
	dbURL = config.db;
	
	return {
		login: function (user, pwd) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.login - user:" + user);
				
				return db.collection('users').findOne({ username: user, password: pwd });
			}).then(function(data) {
				logger.info("End: dataAcces.login");
				
				return (data === null) ? undefined : data;
			});
		},
		
		getUserActivity: function (ct) {
			 return mongoClient.connect(dbURL).then(function(db) {
				 logger.info("Begin: dataAcces.getUserActivity - ct: " + ct);
				 
				 return db.collection('userActivity').find().sort({createDate:-1}).limit(parseInt(ct)).toArray();
			}).then(function(data) {
				logger.info("End: dataAcces.getUserActivity");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving User Activity') : buildResponseMessage(false, data);
			});
		},
		
		getUserActivityById: function (id, ct, start) {
			 return mongoClient.connect(dbURL).then(function(db) {
				 logger.info("Begin: dataAcces.getUserActivityById - id: " + id + " ct: " + ct + " start: " + start);
				 
				 var mongoId = new mongo.ObjectID(id);
				 return db.collection('userActivity').find({ userId: mongoId }).sort({createDate:-1}).skip(parseInt(start)).limit(parseInt(ct)).toArray();
			}).then(function(data) {
				logger.info("End: dataAcces.getUserActivityById");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving User Activity') : buildResponseMessage(false, data, ct, start, 'userActivity');
			});
		},
		
		getVideos: function (ct, start) {
			 return mongoClient.connect(dbURL).then(function(db) {
				 logger.info("Begin: dataAcces.getVideos - ct: " + ct);
				 
				 if (ct > 0) {
					 return db.collection('videos').find().sort({createDate:-1}).skip(parseInt(start)).limit(parseInt(ct)).toArray();
				 } else {
					return db.collection('videos').find().sort({createDate:-1}).toArray();
				 }
			}).then(function(data) {
				logger.info("End: dataAcces.getVideos");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving Videos') : buildResponseMessage(false, data, ct, start, 'videos');
			});
		}, 
		
		getVideoByID: function (id) { 
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.getVideosByID - id: " + id);
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('videos').findOne({ _id: mongoId });
			}).then(function(data) {
				logger.info("End: dataAcces.getVideosByID");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving Video By ID') : buildResponseMessage(false, data);
			});
		},
		
		getFamilyMembers: function (ct, start) {
			 return mongoClient.connect(dbURL).then(function(db) {
				 logger.info("Begin: dataAcces.getFamilyMembers - ct: " + ct);
				 
				 if (ct > 0) {
					 return db.collection('users').find({}, { userImage:0, password:0 }).skip(parseInt(start)).limit(parseInt(ct)).toArray();
				 } else {
					return db.collection('users').find({}, { userImage:0, password:0 }).toArray();
				 }
			}).then(function(data) {
				logger.info("End: dataAcces.getFamilyMembers");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving Family Members') : buildResponseMessage(false, data, ct, start, 'users');
			});
		}, 
		
		getFamilyMemberPhotoById: function(id) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.getFamilyMemberPhotoById - id: " + id);
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('users').findOne({ _id: mongoId }, { userImage: 1, updateDate: 1 });
			}).then(function(data) {
				logger.info("End: dataAcces.getFamilyMemberPhotoById");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving Family Member Photo by Id') :buildResponseMessage(false, data);
			});
		},
		
		getFamilyMemberByID: function (id) { 
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.getFamilyMemberById - id: " + id);
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('users').findOne({ _id: mongoId }, { userImage:0, password:0 });
			}).then(function(data) {
				logger.info("End: dataAcces.getFamilyMemberById");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving Family Member by Id') : buildResponseMessage(false, data);
			});
		},
		
		saveFamilyMemberByID: function (id, userInfo) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.saveFamilyMemberByID - userInfo: " + JSON.stringify(userInfo));
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('users').findAndModify({ _id: mongoId }, [], { $set: updateUserInfo(userInfo) }, { new: true });
			}).then(function(data) {
				logger.info("End: dataAcces.saveFamilyMemberByID");
				
				if (data.value === null) {
					return  buildResponseMessage(true, 'Error saving Family Member by Id');
				} else {
					delete data.value.userImage;
					insertUserActivity(new mongo.ObjectID(userInfo._id), userInfo.username, "modified their ", "Profile Info", "family/family_member_profile?id=" + userInfo._id);
					return buildResponseMessage(false, data.value);
				}
			});
		},
		
		saveFamilyMemberPhotoById: function(user, id, buffer) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.saveFamilyMemberPhotoById - id: " + id);
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('users').findAndModify({ _id: mongoId }, [], {$set: {userImage: mongo.Binary(buffer, 0), updateDate: new Date() }}, { new: true});
			}).then(function(data) {
				logger.info("End: dataAcces.saveFamilyMemberPhotoById");
				
				if (data.value === null) {
					return buildResponseMessage(true, 'Error saving Family Member Photo by Id');
				} else {
					var imgBinary = '';
					var bytes = new Uint8Array( data.value.userImage.buffer );
					for (var i = 0; i < bytes.byteLength; i++) 
						imgBinary += String.fromCharCode(bytes[i]);
					
					insertUserActivity(new mongo.ObjectID(user.userId), user.userName, "changed their ", "Profile Photo", "family/family_member_profile?id=" + id);
					return buildResponseMessage(false, imgBinary);
				}
			});
		},
		
		getImageMetaData:  function (ct, start, searchTerm, folderPath) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.getImageMetaData - ct: " + ct + ", start:" + start + ", searchTerm:" + searchTerm);
				
				if (ct > 0) {
					if (folderPath)
						return db.collection('images').find({ 
							$and: [ 
								{ fileLocation: folderPath }, 
								{ $or: [ { name: { $regex :  searchTerm, $options : 'i' } }, { tags: searchTerm } ] }
								]}).sort({createDate:-1}).skip(parseInt(start)).limit(parseInt(ct)).toArray();
					else 
						return db.collection('images').find({ $or: [ { name: { $regex :  searchTerm, $options : 'i' } }, { tags: searchTerm } ] }).sort({createDate:-1}).skip(parseInt(start)).limit(parseInt(ct)).toArray();
				} else 
					return db.collection('images').find().toArray();
			}).then(function(data) {
				logger.info("End: dataAcces.getImageMetaData");

				return (data === null) ? buildResponseMessage(true, 'No Results for search term "' + searchTerm + '"', ct, start, 'images') : buildResponseMessage(false, data, ct, start, 'images');
			});
		},
		
		getImageMetaDataById: function (id) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.getImageMetaDataById - id: " + id);
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('images').findOne({ _id: mongoId });
			}).then(function(data) {
				logger.info("End: dataAcces.getImageMetaDataById");
				
				return (data === null) ? buildResponseMessage(true, 'Error Retrieving Image Meta Data By Id') : buildResponseMessage(false, data);
			});		
		},
		
		insertImageMetaData: function (user, imgInfo) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.insertImageMetaData - userName: " + user.userName);
				
				var mongoId = new mongo.ObjectID();
				return db.collection('images').findAndModify({ _id: mongoId }, [], { $set: createImageMetaData(user.userName, imgInfo) }, { upsert: true, new: true });
			}).then(function(data) {
				logger.info("End: dataAcces.insertImageMetaData");
				
				insertUserActivity(new mongo.ObjectID(user.userId), user.userName, "added an ", "Image", "images/view?id=" + data.value._id);
				return (data === null) ? buildResponseMessage(true, 'Error Inserting Image MetaData') : buildResponseMessage(false, data.value);
			});
		},
		
		saveImageMetaDataById: function (id, user, imageMetaData) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.saveImageMetaDataById - id: " + id + " userName:" + user.userName);
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('images').findAndModify({ _id: mongoId }, [], { $set: updateImageMetaData(user.userName, imageMetaData) }, { new: true });
			}).then(function(data) {
				logger.info("End: dataAcces.saveImageMetaDataById");
				
				insertUserActivity(new mongo.ObjectID(user.userId), user.userName, "modified an ", "Image's Meta Data", "images/view?id=" + data.value._id);
				return (data.value === null) ? buildResponseMessage(true, 'Error Updating Image MetaData') : buildResponseMessage(false, data.value);
			});	
		},
		
		deleteImageMetaDataById: function (id, user) {
			return mongoClient.connect(dbURL).then(function(db) {
				logger.info("Begin: dataAcces.deleteImageMetaDataById - id: " + id);
				
				var mongoId = new mongo.ObjectID(id);
				return db.collection('images').remove({ _id: mongoId });
			}).then(function(data) {
				logger.info("End: dataAcces.deleteImageMetaDataById");
				
				insertUserActivity(new mongo.ObjectID(user.userId), user.userName, "deleted an Image");
				return (data === null) ? buildResponseMessage(true, 'Error Removing Image By Id') : buildResponseMessage(false, data);
			});
		}
	};
};

function insertUserActivity(userId, userName, desc, item, itemUrl) {
	return mongoClient.connect(dbURL).then(function(db) {
		return db.collection('userActivity').insert({ userId: userId, userName: userName, desc: desc, item: item, itemUrl: itemUrl, createDate: new Date() });
	});
}

function getRecordCountByTable (table) {
	return mongoClient.connect(dbURL).then(function(db) {
		return db.collection(table).count();
	}).then(function(data) {
		return data;
	});
}

function buildResponseMessage(err, value,  ct, start, table) {
	if (ct === undefined || start === undefined) {
		return JSON.stringify({
			err: err,
			value: value
		});
	} else {
		return getRecordCountByTable(table).then(function(totalRecords) {
			return JSON.stringify({
				err: err,
				value: value,
				page: {
					ct: parseInt(ct),
					start: parseInt(start),
					totalRecords: parseInt(totalRecords)
				}
			});
		});
	}
}

function updateImageMetaData(userName, imageMetaData) {
	return { 
		name: imageMetaData.name,
		tags: imageMetaData.tags,
		fileName: imageMetaData.fileName,
		fileExt: imageMetaData.fileExt, 
		updatedBy: userName, 
		updateDate: new Date()
	};
}

function createImageMetaData(userName, i) {
	return {
		name: i.name,
		tags: i.tags,
		fileLocation: i.fileLocation,
		fileName: i.fileName,
		fileExt: i.fileExt,
		createDate: new Date(),
		createdBy: userName,
		updateDate: new Date(),
		updatedBy: userName
	};
}

function updateUserInfo(u) {
	return {
		firstName: u.firstName,
		middleName: u.middleName,
		lastName: u.lastName,
		email: u.email,
		phone: u.phone,
		birthDate: u.birthDate,
		line1: u.line1,
		line2: u.line2,
		city: u.city,
		state: u.state,
		postalCode: u.postalCode,
		shipLine1: u.shipLine1,
		shipLine2: u.shipLine2,
		shipCity: u.shipCity,
		shipState: u.shipState,
		shipPostalCode: u.shipPostalCode,
		updateDate: new Date()
	};
}