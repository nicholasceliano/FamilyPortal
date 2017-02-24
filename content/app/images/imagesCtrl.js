familyPortalApp.controller('imagesCtrl', ['$scope', '$cookies', 'urlHelperSvc', 'imagesSvc', 'viewImagesSvc', 'imageHelperSvc', 'notificationService', function($scope, $cookies, urlHelperSvc, imagesSvc, viewImagesSvc, imageHelperSvc, notificationService) {
    'use strict';
	
	var images = $scope;
	
	var errClass = 'has-error',
		ctrlGrp = '.control-group',
		icOuter = '.image-container-outer',
		icInner = '.image-container-inner',
		icInner_AddFolder = '.add-folder-container-inner',
		icInner_AddImage = '.add-image-container-inner';
	
	var imageCt = 25;

	images.currentUserId = $cookies.get('userId');	
	
	images.imageMetaData = [];
	images.imageMetaDataLoading = true;
	
	images.saveFolderName = '';
	images.saveFolderError = '';
	
	images.saveImageName = '';
	images.saveImageTags = '';
	images.saveImageFile;
	images.saveImageError = '';
	
	images.init = function () {
		interpretQueryParams();
		getImageMetaData(imageCt);
	};
	
	//Btn Click Events
	images.addObject = function ($event, isImage) {
		var e =  $event.currentTarget;
		var outerContainer = $(e).parent().parent();
		
		outerContainer.find(icInner).hide();
		
		if (isImage)
			outerContainer.find(icInner_AddImage).show();
		else
			outerContainer.find(icInner_AddFolder).show();
	};
	
	images.saveImage = function ($event) {
		var controlGroup = $(icInner_AddImage).find(ctrlGrp);
		
		if (images.saveImageFile == undefined || images.saveImageName.length === 0) {
			controlGroup.addClass(errClass);
			images.saveImageError = 'Err: Image Name and Image Input must be completed';
		} else {
			var fileNameFull = images.saveImageFile.fileName;
			var fileName = fileNameFull.substr(0, fileNameFull.lastIndexOf('.'));
			var fileExt = fileNameFull.substr(fileNameFull.lastIndexOf('.'));
			
			controlGroup.removeClass(errClass);
			images.saveImageError = '';
			
			var originalImgBlob = imageHelperSvc.dataURItoBlob(images.saveImageFile.fileData);
		
			//save thumbnail image
			var thumbnailReader = new FileReader();  
			thumbnailReader.onload = function(e) {
				var thumbnailFormData = new FormData();
				var resizedImgUri = imageHelperSvc.convertImageSize(e, 225,225);
				var resizedImgBlob = imageHelperSvc.dataURItoBlob(resizedImgUri);
				thumbnailFormData.append('file', resizedImgBlob);
				thumbnailFormData.append('fileName', fileName + '.thumbnail' + fileExt);
				thumbnailFormData.append('fileLoc', '/');
				saveThumbnail(thumbnailFormData);
			}
			thumbnailReader.readAsDataURL(originalImgBlob);
		
			//save fullsize image
			var imageReader = new FileReader();  
			imageReader.onload = function(e) {
				var imageFormData = new FormData();
				var imgBlob = imageHelperSvc.dataURItoBlob(e.currentTarget.result);
				imageFormData.append('file', imgBlob);
				imageFormData.append('fileName', fileName + fileExt);
				imageFormData.append('fileLoc', '/');
				saveImage(imageFormData);
			}
			imageReader.readAsDataURL(originalImgBlob);
			
			//save meta data
			var postData = {
				name: images.saveImageName,
				tags: $.unique(images.saveImageTags.split(',').map(function(item) { return item.trim(); })),
				fileLocation: '/',
				fileName: fileName,
				fileExt: fileExt,
				createdBy: images.currentUserId
			}
			
			insertImageMetaData($event, postData);
		}
	};
	
	images.saveFolder = function() {
		var controlGroup = $(icInner_AddFolder).find(ctrlGrp);
		if (images.saveFolderName.length === 0) {
			controlGroup.addClass(errClass);
			images.saveFolderError = 'Err: Folder Name must be completed';
		} else {
			controlGroup.removeClass(errClass);
			images.saveFolderError = '';
			//save folder start
			saveFolder(images.saveFolderName);
		}
	};

	images.cancelAdd = function ($event) {
		var e =  $event.currentTarget;
		var outerContainer = $(e).parent().parent();
		
		outerContainer.find(icInner_AddImage).hide();
		outerContainer.find(icInner_AddFolder).hide();
		outerContainer.find(icInner).show();
	}

	//Hover Event
	images.hoverAdd = function ($event, enter) {
		var e =  $event.currentTarget;
			
		if (enter) {
			var addImageIsVisible = $(e).find(icInner_AddImage).is(':visible');
			var addFolderIsVisible = $(e).find(icInner_AddFolder).is(':visible');
		
			if (!addImageIsVisible && !addFolderIsVisible) {
				$(e).children('i').hide();
				$(e).children(icInner).show();
			}
		} else {
			var addIsVisible = $(e).children(icInner).is(':visible');
		
			if (addIsVisible) {
				$(e).children('i').show();
				$(e).children(icInner).hide();
			}
		}
	}
	
	function interpretQueryParams() {
		var params = urlHelperSvc.getUrlVars();
		
		if (params.msg !== undefined)
			notificationService.success(decodeURI(params.msg));
	};
	
	//API Calls
	function insertImageMetaData(event, imageData) {
		viewImagesSvc.insertImageMetaData(imageData).then(function(resp) {
			if(resp.err){
				notificationService.err(resp.value);
			} else {
				images.imageMetaData.push(resp.value);
			
				//clear variables and DOM
				images.saveImageName = '';
				images.saveImageTags = '';
				images.saveImageFile = undefined;
				$('#saveImageFileInput').val(null);
				images.cancelAdd(event);
				notificationService.success('Sucessfully Inserted Image');
			}
		}, function () {
			notificationService.error('Error: viewImagesSvc.insertImageMetaData(imageData)');
		});
	}
	
	function saveImage(imageFile) {
		imagesSvc.saveImage(imageFile).then(function (resp) {
			console.log(resp);
        }, function () {
            notificationService.error('Error: imagesSvc.saveImage(imageName, imageTags, imageFile)');
        });
	};
	
	function saveThumbnail(imageFile) {
		imagesSvc.saveImageThumbnail(imageFile).then(function (resp) {
			console.log(resp);
		}, function () {
			notificationService.error('Error: imagesSvc.saveImageThumbnail(imageFile)');
		});
	}
	
	function saveFolder(folderName) {
		imagesSvc.saveFolder(folderName).then(function (resp) {
            //need to add folder to page dynamically
			
			images.saveFolderName = '';
			notificationService.success('Sucessfully Added Folder');
        }, function () {
            notificationService.error('Error: imagesSvc.saveFolder(folderName)');
        });
	};
	
	function getImageMetaData(imgCt) {
		imagesSvc.getImageMetaData(imgCt).then(function (resp) {
            if (resp.err)
				notificationService.error(resp.value);
			else
				images.imageMetaData = resp.value;
			
			images.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesSvc.getImageMetaData(imgCt)');
        });
	};
}]);