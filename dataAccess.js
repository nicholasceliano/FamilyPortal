//lets require/import the mongodb native drivers.

var mongo = require('mongodb')
var mongoClient = mongo.MongoClient;
var dbURL = 'mongodb://localhost:27017/familyportal';

module.exports = {
	login: function (user, pwd) {
		return mongoClient.connect(dbURL).then(function(db) {
			return db.collection('users').findOne({ username: user, password: pwd });
		}).then(function(data) {
			return (data === null) ? undefined : data._id.toString();
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
			return data;
		})
	}, 
	
	getVideoByID: function (id) { 
		return mongoClient.connect(dbURL).then(function(db) {
			var mongoId = new mongo.ObjectID(id);
			return db.collection('videos').findOne({ _id: mongoId });
		}).then(function(data) {
			if (data === null)
				return 'Error Retrieving Video By ID';
			else
				return data;
		})
	},
	
	getFamilyMembers: function (ct) {
		 return mongoClient.connect(dbURL).then(function(db) {
			 if (ct) {
				 return db.collection('users').find().sort({updateDate:-1}).limit(parseInt(ct)).toArray();
			 } else {
				return db.collection('users').find().toArray();
			 }
		}).then(function(data) {
			return data;
		})
	}, 
	
	getFamilyMemberByID: function (id) { 
		return mongoClient.connect(dbURL).then(function(db) {
			var mongoId = new mongo.ObjectID(id);
			return db.collection('users').findOne({ _id: mongoId });
		}).then(function(data) {
			if (data === null)
				return 'Error Retrieving User By ID';
			else
				return data;
		})
	}
};