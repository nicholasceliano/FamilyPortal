module.exports = prodConfig();

function prodConfig() {
	return {
		db: 'mongodb://familyPortalUser:celiano@ec2-52-55-164-103.compute-1.amazonaws.com/familyportal',
		port: 3000,
		fileLoc:'/data/FamilyPortal/prod/',
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
	return prodConfig().fileLoc + familyId + '/images';
}

function getThumbnailsFileLoc(familyId) {
	return prodConfig().fileLoc + familyId + '/thumbnails';
}