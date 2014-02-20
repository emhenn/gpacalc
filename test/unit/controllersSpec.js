/*jslint indent: 4, maxerr: 50, browser: true, devel: true, nomen: true, plusplus: true */
'use strict';

/* jasmine specs for controllers go here */

describe('gpaCalcController', function () {
	var scope, $controllerConstructor;

	beforeEach(module('gpaCalc'));

	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		$controllerConstructor = $controller;
	}));


	it('should return correct term labels', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });
		expect(scope.termLabelFor(1)).toBe('Winter');
		expect(scope.termLabelFor(2)).toBe('Spring');
		expect(scope.termLabelFor(3)).toBe('Summer');
		expect(scope.termLabelFor(4)).toBe('Fall');
	}));

});
