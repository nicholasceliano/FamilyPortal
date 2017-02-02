familyPortalApp.factory('userInfoFormattingSvc', function () {
    'use strict';

    var service = {};

	service.formatUserProfileInfo = function (e) {
		e.fullName = formatFullName(e.firstName, e.middleName, e.lastName);
		e.phone = formatPhoneNumber(e.phone);
		e.birthDate = formatBirthDate(e.birthDate);
		e.age = calculateAge(e.birthDate);
		e.fullAddress = formatFullAddress(e.line1, e.line2);
		e.fullAddressStateInfo = formatFullAddressStateInfo(e.city, e.state, e.postalCode);
		e.fullShippingAddress = formatFullAddress(e.shipLine1, e.shipLine2);
		e.fullShippingAddressStateInfo = formatFullAddressStateInfo(e.shipCity, e.shipState, e.shipPostalCode);
		
		return e;
	}
	
	function formatFullName (firstName, middleName, lastName) {
		return firstName + ' ' + (middleName ? middleName + ' ' : '') + lastName;
	};
	
	function formatPhoneNumber (phone) {
		if (phone.length === 10)
			return '(' + phone.substr(0, 3) + ')' + phone.substr(3, 3) + '-' + phone.substr(6, 4);
	};
	
	function formatFullAddress (line1, line2) {
		if (line1 == null && line2 == null)
			return null;
		
		return line1 + (line2 ? ' ' + line2 : '');
	};
	
	function formatFullAddressStateInfo (city, state, postalCode) {
		if (city == null || state == null || postalCode == null)
			return null;
		
		return city + ', ' + state + ' ' + postalCode;
	};
	
	function formatBirthDate (birthDate) {
		birthDate = new Date(birthDate);
		var months = [ "January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December" ];
			   
		return months[birthDate.getMonth()] +  ' ' + birthDate.getDate() + ', ' + birthDate.getFullYear();
	};
	
	function calculateAge (birthDate) {
		birthDate = new Date(birthDate);
		var today = new Date();
		var age = Math.floor((today-birthDate) / (365.25 * 24 * 60 * 60 * 1000));
		
		return age;
	};
	
	return service;
});