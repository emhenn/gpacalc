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

	it('should start with empty array of courses', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });
		expect(scope.courses).toBeDefined();
		expect(scope.courses instanceof Array).toBe(true);
		expect(scope.courses.length).toBe(0);
	}));

	it('should report noClasses is true when there are no courses', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });
		expect(scope.noClasses()).toBe(true);
	}));

	it('should report noClasses is false when there are courses', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
			form = {};
		scope.addClass({ schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' }, form);
		expect(scope.noClasses()).toBe(true);
	}));
});
