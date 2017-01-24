//lets require/import the mongodb native drivers.

var mongo = require('mongodb')
var mongoClient = mongo.MongoClient;
var dbURL = 'mongodb://localhost:27017/familyportal';

module.exports = {
	getVideos: mongoClient.connect(dbURL).then(function(db) {
		return db.collection('videos').find().toArray();
	}).then(function(data) {
		return data;
	}), 
	
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
	}
};