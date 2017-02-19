familyPortalApp.controller('imagesCtrl', ['$scope', 'imagesSvc', 'imageHelperSvc', 'notificationService', function($scope, imagesSvc, imageHelperSvc, notificationService) {
    'use strict';
	
	var images = $scope;
	
	var errClass = 'has-error',
		ctrlGrp = '.control-group',
		icOuter = '.image-container-outer',
		icInner = '.image-container-inner',
		icInner_AddFolder = '.add-folder-container-inner',
		icInner_AddImage = '.add-image-container-inner';
	
	var imageCt = 15;
		
	images.imageMetaData = [];
	images.imageMetaDataLoading = true;
	
	images.saveFolderName = '';
	images.saveFolderError = '';
	
	images.saveImageName = '';
	images.saveImageTags = '';
	images.saveImageFile = undefined;
	images.saveImageError = '';
	
	images.init = function () {
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
	
	images.saveImage = function () {
		var controlGroup = $(icInner_AddImage).find(ctrlGrp);
		
		if (images.saveImageFile == undefined || images.saveImageName.length === 0) {
			controlGroup.addClass(errClass);
			images.saveImageError = 'Err: Image Name and Image Input must be completed';
		} else {
			controlGroup.removeClass(errClass);
			images.saveImageError = '';
			//save Image start
			var originalImgBlob = imageHelperSvc.dataURItoBlob(images.saveImageFile);
			
			var reader = new FileReader();  
			reader.onload = function(e) {
				var imageFormData = new FormData();
				var resizedImgUri = imageHelperSvc.convertImageSize(e, 225,225)
				var resizedImgBlob = imageHelperSvc.dataURItoBlob(resizedImgUri);
				imageFormData.append('file', resizedImgBlob);
				saveImage(images.saveImageName, images.saveImageTags, images.saveImageFile);
			}
			reader.readAsDataURL(originalImgBlob);
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
	
	//API Calls
	function saveImage(imageName, imageTags, imageFile) {
		imagesSvc.saveImage(imageName, imageTags, imageFile).then(function (resp) {
            
			//need to add image to page dynamically
			
			images.saveImageName = '';
			images.saveImageTags = '';
			images.saveImageFile = undefined;
			$('#saveImageFileInput').val(null);
			notificationService.success('Sucessfully Added Image');
        }, function () {
            notificationService.error('Error: imagesSvc.saveImage(imageName, imageTags, imageFile)');
        });
	};
	
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
            images.imageMetaData = resp.imageInfo;
			images.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesSvc.getImageMetaData(imgCt)');
        });
	};
}]);