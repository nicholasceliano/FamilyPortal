familyPortalApp.factory('imageHelperSvc', [function () {
    'use strict';

    var service = {};

	service.dataURItoBlob = function(dataURI) {
		var binary = atob(dataURI.split(',')[1]);
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		var array = [];
		for (var i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {
			type: mimeString
		});
    };
	
	service.convertImageSize = function (e, maxHeight, maxWidth) {
		var canvas = document.createElement('canvas');
		var img = document.createElement("img");
		img.src = e.target.result;
		
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		var MAX_WIDTH = maxWidth;
		var MAX_HEIGHT = maxHeight;
		var width = img.width;
		var height = img.height;

		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width;
				width = MAX_WIDTH;
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height;
				height = MAX_HEIGHT;
			}
		}
		canvas.width = width;
		canvas.height = height;
		var ctx2 = canvas.getContext("2d");
		ctx2.drawImage(img, 0, 0, width, height);

		return canvas.toDataURL("image/png");
	};
	
	return service;
}]);