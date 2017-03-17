familyPortalApp.controller('imagesCtrl', ['$scope', '$cookies', '$location', 'urlHelperSvc', 'imagesSvc', 'imagesMetadataSvc', 'imagesThumbnailSvc', 'imagesFolderSvc', 'imageHelperSvc', 'notificationService', function($scope, $cookies, $location, urlHelperSvc, imagesSvc, imagesMetadataSvc, imagesThumbnailSvc, imagesFolderSvc, imageHelperSvc, notificationService) {
    'use strict';
	
	var images = $scope;
	
	var errClass = 'has-error',
		ctrlGrp = '.control-group',
		icOuter = '.image-container-outer',
		icInner = '.image-container-inner',
		icInner_AddFolder = '.add-folder-container-inner',
		icInner_AddImage = '.add-image-container-inner';
	
	images.imagePaging = { ct: 10, startItem: 0, totalRecords: 0, loading: false };

	images.currentUserId = $cookies.get('userId');	
	
	images.searchText = '';
	
	images.folderBreadcrumbArray = [];
	
	images.imageMetaData = [];
	images.imageMetaDataLoading = true;
	
	images.folderName = '/';
	images.folders = [];
	images.foldersLoading = true;
	
	images.saveFolderName = '';
	images.saveFolderError = '';
	
	images.saveImageName = '';
	images.saveImageTags = '';
	images.saveImageFile = undefined;
	images.saveImageError = '';
	
	images.$on('$locationChangeStart',function(event, next, current) {//handles folder navigation
		var nextFolderRoute = urlHelperSvc.getUrlVarsFromString(next).folderName;
		
		if (nextFolderRoute === undefined)
			retrievePageData('/');
		else
			retrievePageData(nextFolderRoute);
	});
	
	
	images.init = function () {
		interpretQueryParams();
	};
	
	images.pageLoading = function() {
		if (images.foldersLoading || images.imageMetaDataLoading)
			return true;
		else
			return false;
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
		
		if (images.saveImageFile === undefined || images.saveImageName.length === 0) {
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
				thumbnailFormData.append('fileLoc', images.folderName);
				saveThumbnail(thumbnailFormData);
			};
			thumbnailReader.readAsDataURL(originalImgBlob);
		
			//save fullsize image
			var imageReader = new FileReader();  
			imageReader.onload = function(e) {
				var imageFormData = new FormData();
				var imgBlob = imageHelperSvc.dataURItoBlob(e.currentTarget.result);
				imageFormData.append('file', imgBlob);
				imageFormData.append('fileName', fileName + fileExt);
				imageFormData.append('fileLoc', images.folderName);
				saveImage(imageFormData);
			};
			imageReader.readAsDataURL(originalImgBlob);
			
			//save meta data
			var postData = {
				name: images.saveImageName,
				tags: $.unique(images.saveImageTags.split(',').map(function(item) { return item.trim(); })),
				fileLocation: images.folderName,
				fileName: fileName,
				fileExt: fileExt,
				createdBy: images.currentUserId
			};
			
			insertImageMetaData($event, postData);
		}
	};
	
	images.saveFolder = function($event) {
		var controlGroup = $(icInner_AddFolder).find(ctrlGrp);
		if (images.saveFolderName.length === 0) {
			controlGroup.addClass(errClass);
			images.saveFolderError = 'Err: Folder Name must be completed';
		} else {
			controlGroup.removeClass(errClass);
			images.saveFolderError = '';
			
			saveFolder($event, images.folderName + images.saveFolderName);
		}
	};
	
	images.openFolder = function(folder) {
		images.folderName = imagesFolderSvc.setFolderName(folder);
		$location.search('folderName', images.folderName);
	};
	
	function retrievePageData(folderRoute) {
		var folder;
		
		if (folderRoute == '/') {
			folder = folderRoute;
		} else {
			var routes = decodeURIComponent(folderRoute).split('/');
				
			if (routes[routes.length - 1].length === 0)
				routes.pop();
			
			folder = (routes.length == 1 ? '/' : routes.join('/'));
		}
		
		images.folderName = imagesFolderSvc.setFolderName(folder);
		images.imagePaging.startItem = 0;
		images.imagePaging.totalRecords = 0;
		
		images.folders = [];
		images.foldersLoading = true;
		
		images.imageMetaData = [];
		images.imageMetaDataLoading = true;
		
		getFolders(images.folderName);
		images.getImageMetaData(images.imagePaging.ct, images.imagePaging.startItem);
	}
	
	images.deleteFolder = function (currentFolderName, selectedFolderName) {
		
		var r = confirm("Are you sure you want to perminantly delete this folder and all of its contents?");
		if (r === true) {
			deleteFolder(currentFolderName, selectedFolderName);
		}
	};

	images.cancelAdd = function ($event) {
		var e =  $event.currentTarget;
		var outerContainer = $(e).parent().parent();
		
		outerContainer.find(icInner_AddImage).hide();
		outerContainer.find(icInner_AddFolder).hide();
		outerContainer.find(icInner).show();
	};
	
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
	};
	
	images.search = function () {
		//set page & imageMetaData to default values
		images.imagePaging.startItem = 0;
		images.imagePaging.totalRecords = 0;
		
		images.imageMetaData = [];
		images.imageMetaDataLoading = true;
		
		images.getImageMetaData(images.imagePaging.ct, images.imagePaging.startItem);
	};
	
	function interpretQueryParams() {
		var params = urlHelperSvc.getUrlVars();
		
		if (params.msg)
			notificationService.success(decodeURI(params.msg));
		
		if (params.folderName)
			retrievePageData(params.folderName);
		else
			retrievePageData('/');
	}
		
	//API Calls
	function insertImageMetaData(event, imageData) {
		imagesMetadataSvc.insertImageMetaData(imageData).then(function(resp) {
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
			notificationService.error('Error: imagesMetadataSvc.insertImageMetaData(imageData)');
		});
	}
	
	function saveImage(imageFile) {
		imagesSvc.saveImage(imageFile).then(function (resp) {
			if (resp.err)
				notificationService.info(resp.value);
        }, function () {
            notificationService.error('Error: imagesSvc.saveImage(imageName, imageTags, imageFile)');
        });
	}
	
	function saveThumbnail(imageFile) {
		imagesThumbnailSvc.saveImageThumbnail(imageFile).then(function (resp) {
			if (resp.err)
				notificationService.info(resp.value);
		}, function () {
			notificationService.error('Error: imagesThumbnailSvc.saveImageThumbnail(imageFile)');
		});
	}
	
	function getFolders(folderPath) {
		imagesFolderSvc.getFolders(folderPath).then(function (resp) {
			if (resp.err)
				notificationService.info(resp.value);
			else {
				$(resp.value).each(function(i,e) {
					images.folders.push(e);
				});
				
				images.folderBreadcrumbArray = imagesSvc.buildFolderBreadcrumbs(images.folderName);
				images.foldersLoading = false;
			}
		}, function () {
			notificationService.error('Error: imagesSvc.getFolder(folderName)');
		});
	}
	
	function saveFolder(event, folderName) {
		var postData = { folderName: folderName };
		
		imagesFolderSvc.saveFolder(postData).then(function (resp) {
			if (resp.err) {
				notificationService.info(resp.value);
			} else {			
				images.folders.push(resp.value.folderName);
				
				images.cancelAdd(event);
				notificationService.success('Sucessfully Added Folder');
			}
			
			images.saveFolderName = '';
        }, function () {
            notificationService.error('Error: imagesSvc.saveFolder(folderName)');
        });
	}
	
	function deleteFolder(currentFolderName, selectedFolderName) {
		imagesFolderSvc.deleteFolder(currentFolderName + selectedFolderName).then(function(resp) {
			if (resp.err) {
				notificationService.info(resp.value);
			} else {
				$(images.folders).each(function(i, e) {
					if (e.indexOf(selectedFolderName) > -1)
						images.folders.splice(i, 1);	
				});
				
				deleteImageMetaDataByFolderLoc(currentFolderName + selectedFolderName, function () {
					notificationService.success('Sucessfully Deleted Folder');
				});
			}
		}, function () {
            notificationService.error('Error: imagesSvc.deleteFolder(currentFolderName, selectedFolderName)');
        });
	}
	
	images.getImageMetaData = function (imgCt, startItem) {
		imagesMetadataSvc.getImageMetaData(imgCt, startItem, images.searchText, images.folderName).then(function (resp) {
            if (resp.err)
				notificationService.info(resp.value);
			else {				
				$(resp.value).each(function(i,e) {
					images.imageMetaData.push(e);
				});
				
				images.imagePaging.startItem = images.imagePaging.startItem + resp.page.ct;
				images.imagePaging.totalRecords = resp.page.totalRecords;
			}
			images.imagePaging.loading = false;
			images.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesMetadataSvc.getImageMetaData(imgCt, startItem)');
        });
	};
	
	function deleteImageMetaDataByFolderLoc(folderLoc, callback) {
		imagesMetadataSvc.deleteImageMetaDataByFolderLoc(folderLoc).then(function (resp) {
			if (resp.err)
				notificationService.info(resp.value);
			else
				callback();
		}, function () {
			notificationService.error('Error: deleteImageMetaDataByFolderLoc(folderLoc)');
		});
	}
}]);