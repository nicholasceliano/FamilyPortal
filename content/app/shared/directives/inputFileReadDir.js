familyPortalApp.directive("inputfileread", function() {
	return {
		scope: {
			inputfileread: "="
		},
		link: function(scope, element, attributes) {
			element.bind("change", function(changeEvent) {
				var reader = new FileReader();
				reader.onload = function(loadEvent) {
					scope.$apply(function() {
						scope.inputfileread = { 
							fileName: changeEvent.target.files[0].name, 
							fileData: loadEvent.target.result
						};
					});
				};
				
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}
	};
});