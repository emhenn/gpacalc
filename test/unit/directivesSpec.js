'use strict';

/* jasmine specs for directives go here */

describe('focusMe directive', function () {
	var el, scope;

	beforeEach(module('gpaCalc'));

	beforeEach(inject(function ($compile, $rootScope) {
		// set up scope
		scope = $rootScope;

		// create and compile directive
		el = angular.element('<input type="text" id="myInput" focus-me />');
		$compile(el)(scope);
		angular.element(document.body).append(el);
	}));

	it('should focus on our element when the correct scope property is set', function () {
		var focused = false;
		el.on('focus', function () {
			focused = true;
		});
		scope.focusMe = { myInput: true };
		scope.$digest();	// needed in test to simulate the scope life cycle

		expect(focused).toBe(true);
		expect(document.activeElement).toBe(el[0]);
	});
});
