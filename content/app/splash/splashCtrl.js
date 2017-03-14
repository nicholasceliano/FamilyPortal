familyPortalApp.controller('splashCtrl', ['$scope', 'splashSvc', 'userActivitySvc', 'videosSvc', 'imagesMetadataSvc', 'familyMembersSvc', 'notificationService', function($scope, splashSvc, userActivitySvc, videosSvc, imagesMetadataSvc, familyMembersSvc, notificationService) {
    'use strict';
	
	var splash = $scope;
			
	splash.userActivityPaging = { ct: 10, startItem: 0, totalRecords: 0, loading: false };
	splash.videoPaging = { ct: 10, startItem: 0, totalRecords: 0, loading: false };
	splash.imageMetaDataPaging = { ct: 10, startItem: 0, totalRecords: 0, loading: false };
	splash.familyMembersPaging = { ct: 10, startItem: 0, totalRecords: 0, loading: false };
	
	splash.userActivityArray = [];
	splash.userActivityLoading = true;
	splash.videosArray = [];
	splash.videosLoading = true;
	splash.imageMetaDataArray = [];
	splash.imageMetaDataLoading = true;
	splash.familyMembersArray = [];
	splash.familyMembersLoading = true;
	
	splash.init = function () {
		splash.getRecentUserActivity(splash.userActivityPaging.ct, splash.userActivityPaging.startItem);
		splash.getRecentVideos(splash.videoPaging.ct, splash.videoPaging.startItem);
		splash.getRecentImageMetaData(splash.imageMetaDataPaging.ct, splash.imageMetaDataPaging.startItem);
		splash.getRecentFamilyMembers(splash.familyMembersPaging.ct, splash.familyMembersPaging.startItem);
	};
	
	splash.getRecentUserActivity = function(ct, startItem) {
		userActivitySvc.getRecentUserActivity(ct, startItem).then(function (resp) {
			  if (resp.err)
				notificationService.error(resp.value);
			else {
				$(splashSvc.calculateDayDiff(resp.value, 'ago')).each(function (i, e) {
					splash.userActivityArray.push(e);
				});
				
				splash.userActivityPaging.startItem = splash.userActivityPaging.startItem + resp.page.ct;
				splash.userActivityPaging.totalRecords = resp.page.totalRecords;
			}
				
			splash.userActivityPaging.loading = false;
			splash.userActivityLoading = false;
		}, function () {
			notificationService.error('Error: videoSvc.getRecentUserActivity(numRecentUserActivity)');
		});
	};
	
	splash.getRecentVideos = function(ct, startItem) {
		videosSvc.getVideos(ct, startItem).then(function (resp) {
            if (resp.err)
				notificationService.error(resp.value);
			else {
				$(splashSvc.calculateDayDiff(resp.value, 'old')).each(function (i, e) {
					splash.videosArray.push(e);
				});
				
				splash.videoPaging.startItem = splash.videoPaging.startItem + resp.page.ct;
				splash.videoPaging.totalRecords = resp.page.totalRecords;
			}
			
			splash.videoPaging.loading = false;
			splash.videosLoading = false;
        }, function () {
            notificationService.error('Error: videoSvc.getRecentVideos(numRecentVideos)');
        });
	};
	
	splash.getRecentImageMetaData = function (ct, startItem) {
		imagesMetadataSvc.getImageMetaData(ct, startItem, '').then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else {
				$(splashSvc.calculateDayDiff(resp.value, 'old')).each(function (i, e) {
					splash.imageMetaDataArray.push(e);
				});
				
				splash.imageMetaDataPaging.startItem = splash.imageMetaDataPaging.startItem + resp.page.ct;
				splash.imageMetaDataPaging.totalRecords = resp.page.totalRecords;
			}
			
			splash.imageMetaDataPaging.loading = false;
			splash.imageMetaDataLoading = false;
        }, function () {
            notificationService.error('Error: imagesMetadataSvc.getImageMetaData(numRecentImageMetaData)');
        });
	};
	
	splash.getRecentFamilyMembers = function(ct, startItem) {
		familyMembersSvc.getFamilyMembers(ct, startItem).then(function (resp) {
			if (resp.err)
				notificationService.error(resp.value);
			else {
				$(resp.value).each(function (i, e) {
					splash.familyMembersArray.push(e);
				});
				
				splash.familyMembersPaging.startItem = splash.familyMembersPaging.startItem + resp.page.ct;
				splash.familyMembersPaging.totalRecords = resp.page.totalRecords;
			}
			
			splash.familyMembersPaging.loading = false;
			splash.familyMembersLoading = false;
        }, function () {
            notificationService.error('Error: familyMembersSvc.getRecentFamilyMembers(numRecentFamilyMembers)');
        });
	};
	
}]);