//API helpers for uploading images

var multer  = require('multer');

var tempStorage = multer.memoryStorage();
	
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './temp')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname+ '-' + Date.now()+'.jpg')
	}
});

module.exports = {	
	saveImg: multer({ storage: storage }),
	tempImgUpload: multer({ storage: tempStorage })
}