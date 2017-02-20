//lets require/import the mongodb native drivers.

var mongo = require('mongodb')

module.exports = function(config) {
	
	var mongoClient = mongo.MongoClient;
	var dbURL = config.db;
	
	return {
		login: function (user, pwd) {
			return mongoClient.connect(dbURL).then(function(db) {
				return db.collection('users').findOne({ username: user, password: pwd });
			}).then(function(data) {
				return (data === null) ? undefined : data;
			})
		},
		
		getVideos: function (ct) {
			 return mongoClient.connect(dbURL).then(function(db) {
				 if (ct) {
					 return db.collection('videos').find().sort({createDate:-1}).limit(parseInt(ct)).toArray();
				 } else {
					return db.collection('videos').find().toArray();
				 }
			}).then(function(data) {
				return (data === null) ? 'Error Retrieving Videos' : data;
			})
		}, 
		
		getVideoByID: function (id) { 
			return mongoClient.connect(dbURL).then(function(db) {
				var mongoId = new mongo.ObjectID(id);
				return db.collection('videos').findOne({ _id: mongoId });
			}).then(function(data) {
				return (data === null) ? 'Error Retrieving Video By ID' : data;
			})
		},
		
		getFamilyMembers: function (ct) {
			 return mongoClient.connect(dbURL).then(function(db) {
				 if (ct) {
					 return db.collection('users').find({}, getUserInfoNoImage()).limit(parseInt(ct)).toArray();
				 } else {
					return db.collection('users').find().toArray();
				 }
			}).then(function(data) {
				return (data === null) ? 'Error Retrieving Family Members' : data;
			})
		}, 
		
		getFamilyMemberPhotoById: function(id) {
			return mongoClient.connect(dbURL).then(function(db) {
				var mongoId = new mongo.ObjectID(id);
			return db.collection('users').findOne({ _id: mongoId }, { userImage: 1, updateDate: 1 });
			}).then(function(data) {
				return (data === null) ? 'Error Retrieving Family Member Photo by Id' : data;
			})
		},
		
		getFamilyMemberByID: function (id) { 
			return mongoClient.connect(dbURL).then(function(db) {
				var mongoId = new mongo.ObjectID(id);
			return db.collection('users').findOne({ _id: mongoId }, getUserInfoNoImage());
			}).then(function(data) {
				return (data === null) ? 'Error Retrieving Family Member by Id' : data;
			})
		},
		
		saveFamilyMemberByID: function (userInfo) {
			return mongoClient.connect(dbURL).then(function(db) {
				var mongoId = new mongo.ObjectID(userInfo._id);
				return db.collection('users').update({ _id: mongoId }, { $set: saveUserInfo(userInfo) });
			}).then(function(data) {
				return (data === null) ? 'Error saving Family Member by Id' : 'Success';
			})
		},
		
		saveFamilyMemberPhotoById: function(id, buffer) {
			return mongoClient.connect(dbURL).then(function(db) {
				var mongoId = new mongo.ObjectID(id);
				
				return db.collection('users').update({ _id: mongoId }, {$set: {userImage: mongo.Binary(buffer, 0), updateDate: new Date()}});
			}).then(function(data) {
				var imgBase64 = buffer.toString('base64');
				
				return (data === null) ? 'Error saving Family Member Photo by Id' : imgBase64;
			})
		},
		
		getImageMetaData:  function (ct) {
			return mongoClient.connect(dbURL).then(function(db) {
				if (ct)
					return db.collection('images').aggregate(getImageMetadataAggregate()).sort({createDate:-1}).limit(parseInt(ct)).toArray();
				else 
					return db.collection('images').aggregate(getImageMetadataAggregate()).toArray();
			}).then(function(data) {
				return (data === null) ? 'Error Retrieving Images' : data;
			})
		},
		
		getImageMetaDataById: function (id) {
			return mongoClient.connect(dbURL).then(function(db) {
				var mongoId = new mongo.ObjectID(id);
				return db.collection('images').aggregate(getImageMetadataAggregateById(mongoId)).toArray();
			}).then(function(data) {
				return (data === null) ? 'Error Retrieving Image By Id' : data;
			})			
		}
	}
};

function getUserInfoNoImage() {
	return { userImage:0, password:0 };
}

function getImageMetadataAggregateById(mongoId) {
	return [
			{$match:{ _id: mongoId }},
			{$lookup:{ from: "users", localField: "createdBy", foreignField: "_id", as: "createUser" }},
			{$lookup:{ from: "users", localField: "updatedBy", foreignField: "_id", as: "updateUser" }},
			{$project:{ _id:1, name:1, tags:1, fileLocation:1, fileName:1, imageThumbnail:1, createDate:1, updateDate:1, updatedBy:1, "createUser.username":1, "updateUser.username":1 }}
		];
}

function getImageMetadataAggregate() {
	return [
			{$lookup:{ from: "users", localField: "createdBy", foreignField: "_id", as: "createUser" }},
			{$lookup:{ from: "users", localField: "updatedBy", foreignField: "_id", as: "updateUser" }},
			{$project:{ _id:1, name:1, tags:1, fileLocation:1, fileName:1, imageThumbnail:1, createDate:1, updateDate:1, updatedBy:1, "createUser.username":1, "updateUser.username":1 }}
		];
}

function saveUserInfo(u) {
	return {
		firstName: u.firstName
		, middleName: u.middleName
		, lastName: u.lastName
		, email: u.email
		, phone: u.phone
		, birthDate: u.birthDate
		, line1: u.line1
		, line2: u.line2
		, city: u.city
		, state: u.state
		, postalCode: u.postalCode
		, shipLine1: u.shipLine1
		, shipLine2: u.shipLine2
		, shipCity: u.shipCity
		, shipState: u.shipState
		, shipPostalCode: u.shipPostalCode
		, updateDate: new Date()
	}
}