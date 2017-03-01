familyPortalApp.controller('imagesCtrl', ['$scope', '$cookies', 'urlHelperSvc', 'imagesSvc', 'viewImagesSvc', 'pagingSvc', 'imageHelperSvc', 'notificationService', function($scope, $cookies, urlHelperSvc, imagesSvc, viewImagesSvc, pagingSvc, imageHelperSvc, notificationService) {
    'use strict';
	
	var images = $scope;
	
	var errClass = 'has-error',
		ctrlGrp = '.control-group',
		icOuter = '.image-container-outer',
		icInner = '.image-container-inner',
		icInner_AddFolder = '.add-folder-container-inner',
		icInner_AddImage = '.add-image-container-inner';
	
	var pagingCt = 18;
	images.pagingStartItem = 0;
	images.pagingTotalRecords = 0;
	images.nextPageLoading = false;

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
	
	images.init = function () {
		interpretQueryParams();
		getFolders(images.folderName);
		getImageMetaData(pagingCt, images.pagingStartItem, images.searchText, images.folderName);
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
				thumbnailFormData.append('fileLoc', '/');
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
				imageFormData.append('fileLoc', '/');
				saveImage(imageFormData);
			};
			imageReader.readAsDataURL(originalImgBlob);
			
			//save meta data
			var postData = {
				name: images.saveImageName,
				tags: $.unique(images.saveImageTags.split(',').map(function(item) { return item.trim(); })),
				fileLocation: '/',
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
	
	images.openFolder = function(folderName) {
		images.folderName = images.folderName + folderName + '/';
		
		//reset all variables to default
		images.pagingStartItem = 0;
		images.pagingTotalRecords = 0;
		
		images.folders = [];
		images.foldersLoading = true;
		
		images.imageMetaData = [];
		images.imageMetaDataLoading = true;
		
		getFolders(images.folderName);
		getImageMetaData(pagingCt, images.pagingStartItem, images.searchText, images.folderName);
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
	
	images.loadNextPage = function () {
		var ct = pagingSvc.getNextPageCt(pagingCt, images.pagingStartItem, images.pagingTotalRecords);
		if (ct > 0){
			images.nextPageLoading = true;
			getImageMetaData(ct, images.pagingStartItem, images.searchText, images.folderName);
		}
	};
	
	images.search = function () {
		//set page & imageMetaData to default values
		images.pagingStartItem = 0;
		images.pagingTotalRecords = 0;
		
		images.imageMetaData = [];
		images.imageMetaDataLoading = true;
		
		getImageMetaData(pagingCt, images.pagingStartItem, images.searchText, images.folderName);
	};
	
	function interpretQueryParams() {
		var params = urlHelperSvc.getUrlVars();
		
		if (params.msg !== undefined)
			notificationService.success(decodeURI(params.msg));
	}
	
	function buildFolderBreadcrumbs() {
		var folderArray = images.folderName.split('\/');
		folderArray.pop();
		
		$(folderArray).each(function(i,e) {
				
			if (i === 0) {
				folderArray[i]= {text: 'Images', url: '/'};
			} else 
				folderArray[i] = {text: e, url: '/'};
		});
		
		images.folderBreadcrumbArray = folderArray;
	}
	
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
	}
	
	function saveThumbnail(imageFile) {
		imagesSvc.saveImageThumbnail(imageFile).then(function (resp) {
			console.log(resp);
		}, function () {
			notificationService.error('Error: imagesSvc.saveImageThumbnail(imageFile)');
		});
	}
	
	function getFolders(folderPath) {
		imagesSvc.getFolders(folderPath).then(function (resp) {
			if (resp.err)
				notificationService.info(resp.value);
			else {
				$(resp.value).each(function(i,e) {
					images.folders.push(e);
				});
				
				buildFolderBreadcrumbs();
				images.foldersLoading = false;
			}
		}, function () {
			notificationService.error('Error: imagesSvc.getFolder(folderName)');
		});
	}
	
	function saveFolder(event, folderName) {
		var postData = { folderName: folderName };
		
		imagesSvc.saveFolder(postData).then(function (resp) {
			if (resp.err) {
				notificationService.info(resp.value);
			} else {			
				images.folders.push(resp.folderName);
				
				images.cancelAdd(event);
				notificationService.success('Sucessfully Added Folder');
			}
			
			images.saveFolderName = '';
        }, function () {
            notificationService.error('Error: imagesSvc.saveFolder(folderName)');
        });
	}
	
	function getImageMetaData(imgCt, startItem, searchTerm, folderPath) {
		imagesSvc.getImageMetaData(imgCt, startItem, searchTerm, folderPath).then(function (resp) {
            if (resp.err)
				notificationService.info(resp.value);
			else {				
				$(resp.value).each(function(i,e) {
					images.imageMetaData.push(e);
				});
				
				images.pagingStartItem = images.pagingStartItem + resp.page.ct;
				images.pagingTotalRecords = resp.page.totalRecords;
			}
			images.nextPageLoading = false;
			images.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesSvc.getImageMetaData(imgCt)');
        });
	}
}]);