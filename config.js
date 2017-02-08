module.exports = {
	dev: {
		db: 'mongodb://familyPortalUser_Dev:celiano_Dev@ec2-52-55-164-103.compute-1.amazonaws.com/familyportal_dev',
		port: 3000,
		videosBaseUri: 'https://s3.amazonaws.com/videos.celiano/'
	},
	
	prod: {
		db: 'mongodb://familyPortalUser:celiano@ec2-52-55-164-103.compute-1.amazonaws.com/familyportal',
		port: 3000,
		videosBaseUri: 'https://s3.amazonaws.com/videos.celiano/'
	}
};