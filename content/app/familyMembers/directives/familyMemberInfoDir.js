familyPortalApp.directive('familyMemberInfo', function(){
	return {
		restrict:'E',
		link: function (scope, element, attributes) {
			 scope.$watch(attributes.watch, function(newValue,oldValue) {
				 if (newValue){
					var attrArray = JSON.parse(attributes.familymember);
					
					scope.isProfile = attributes.isProfile;
					scope._id = attrArray._id;
					scope.username = attrArray.username;
					scope.fullName = attrArray.fullName;
					scope.birthDate = attrArray.birthDate;
					scope.age = attrArray.age;
					scope.phone = attrArray.phone;
					scope.email = attrArray.email;
					scope.fullAddress = attrArray.fullAddress;
					scope.fullAddressStateInfo = attrArray.fullAddressStateInfo;
					scope.fullShippingAddress = attrArray.fullShippingAddress;
					scope.fullShippingAddressStateInfo = attrArray.fullShippingAddressStateInfo;
				}
			});
        },
		templateUrl:'/dist/templates/familyMemberInfoTemplate.html'
	};
});