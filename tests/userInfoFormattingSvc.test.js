describe('userInfoFormattingSvc', function() {
	var userInfoFormattingSvc;

    beforeEach(module('familyPortalApp'));

    beforeEach(inject(function(_userInfoFormattingSvc_) {
		userInfoFormattingSvc = _userInfoFormattingSvc_;
    }));

	var userObj = {
			firstName : "Nicholas",
			middleName : "E",
			lastName : "Celiano",
			email : "nicholasceliano@gmail.com",
			phone : "7329469404",
			birthDate : "9/27/1989",
			line1 : "240 Chapel Place",
			line2 : "#222",
			city : "Avon",
			state : "Colorado",
			postalCode : "81620",
			shipLine1 : "PO Box #37",
			shipLine2 : "",
			shipCity : "Avon",
			shipState : "Colorado",
			shipPostalCode : "81620"
		};
		
    it('Full Name Formatted', function() {
		var formattedObj = userInfoFormattingSvc.formatUserProfileInfo(angular.copy(userObj))
		expect(formattedObj.fullName).toEqual("Nicholas E Celiano");
    });
	
	it('Phone Number Formatted', function() {
		var test = userInfoFormattingSvc.formatUserProfileInfo(angular.copy(userObj))
		expect(test.phone).toEqual("(732)946-9404");
    });
	
	it('Full Address Formatted', function() {
		var formattedObj = userInfoFormattingSvc.formatUserProfileInfo(angular.copy(userObj))
		expect(formattedObj.fullAddress).toEqual("240 Chapel Place #222");
    });
	
	it('Full Address State Info Formatted', function() {
		var formattedObj = userInfoFormattingSvc.formatUserProfileInfo(angular.copy(userObj))
		expect(formattedObj.fullAddressStateInfo).toEqual("Avon, Colorado 81620");
    });
	
	it('Birthday Formatted', function() {
		var formattedObj = userInfoFormattingSvc.formatUserProfileInfo(angular.copy(userObj))
		expect(formattedObj.birthDate).toEqual("September 27, 1989");
    });
});