module.exports = devConfig();

function devConfig() {
	return {
		db: 'mongodb://familyPortalUser_Dev:celiano_Dev@ec2-52-55-164-103.compute-1.amazonaws.com/familyportal_dev',
		port: 3333,
		fileLoc:'/backup/FamilyPortal/',
		imagesFileLoc: function(familyId) { return getImagesFileLoc(familyId); },
		thumbnailsFileLoc: function(familyId) { return getThumbnailsFileLoc(familyId); },
		videosBaseUri: 'https://s3.amazonaws.com/videos.celiano/',
		api: {
			version: 'v1',
			maxRequestRecordCt: 1000
		}
	};
}

function getImagesFileLoc(familyId){
	return devConfig().fileLoc + familyId + '/images';
}

function getThumbnailsFileLoc(familyId) {
	return devConfig().fileLoc + familyId + '/thumbnails';
}