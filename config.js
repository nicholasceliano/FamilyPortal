
module.exports = {
	dev: devConfig(),
	prod: prodConfig()
};

function devConfig() {
	return {
		db: 'mongodb://familyPortalUser_Dev:celiano_Dev@ec2-52-55-164-103.compute-1.amazonaws.com/familyportal_dev',
		port: 3333,
		fileLoc:'/backup/FamilyPortal/',
		imagesFileLoc: function(familyId) { return getImagesFileLoc(true, familyId); },
		videosBaseUri: 'https://s3.amazonaws.com/videos.celiano/',
		api: {
			maxRequestRecordCt: 1000
		}
	};
}

function prodConfig() {
	return {
		db: 'mongodb://familyPortalUser:celiano@ec2-52-55-164-103.compute-1.amazonaws.com/familyportal',
		port: 3000,
		fileLoc:'/home/ec2-user/data/prod/',
		imagesFileLoc: function(familyId) { return getImagesFileLoc(false, familyId); },
		videosBaseUri: 'https://s3.amazonaws.com/videos.celiano/',
		api: {
			maxRequestRecordCt: 1000
		}
	};
}

function getImagesFileLoc(dev, familyId){
	if (dev)
		return devConfig().fileLoc + familyId + '/images/';
	else
		return prodConfig().fileLoc + familyId + '/images/';
}