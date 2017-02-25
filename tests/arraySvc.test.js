describe('arraySvc', function() {
	var arraySvc;

    beforeEach(module('familyPortalApp'));

    beforeEach(inject(function(_arraySvc_) {
		arraySvc = _arraySvc_;
    }));

    it('Make Array Unique', function() {
		var array = ["test", "123", "test2", "123", "test"]
		var uniqueArray = arraySvc.makeArrayUnique(array);
		
		expect(uniqueArray).toEqual(["test", "123", "test2"]);
    });
});