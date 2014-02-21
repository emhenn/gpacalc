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

	it('should report noClasses is false when there is at least one course', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
			form = {};
		scope.addClass({ schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' }, form);
		expect(scope.noClasses()).toBe(false);
	}));

	it('should create a new Course when course is added', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
			form = {};
		scope.addClass({ schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' }, form);
		expect(scope.courses).toBeDefined();
		expect(scope.courses instanceof Array).toBe(true);
		expect(scope.courses.length).toBe(1);
		expect(scope.courses[0] instanceof gpaCore.Course).toBe(true);
	}));

	it('should reset grade, units and focus when course is added', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
			form = {},
			crse = { schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' };

		scope.addClass(crse, form);

		expect(crse.grade).toBe('');
		expect(crse.units).toBe('');
		expect(scope.focusMe.grade).toBe(true);
	}));

	it('should report noClasses when course is added then deleted', inject(function () {
		var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
			form = {};
		scope.addClass({ schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' }, form);
		scope.deleteClass(scope.courses[0]);

		expect(scope.noClasses()).toBe(true);
	}));

	describe('The adjustedUnitTotal function', function () {
		it('should return zero when there are no courses', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });

			expect(scope.adjustedUnitTotal(scope.courses)).toBe(0);
		}));

		it('should return non-adjusted Units when there is one semester course', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'semester', units: 3 }, form);

			expect(scope.adjustedUnitTotal(scope.courses)).toBe(3);
		}));

		it('should return sum of non-adjusted Units when there are multiple semester courses', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'semester', units: 3 }, form);
			scope.addClass({ schedule: 'semester', units: 3 }, form);

			expect(scope.adjustedUnitTotal(scope.courses)).toBe(6);
		}));

		it('should return adjusted Units when there is one quarter course', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'quarter', units: 3 }, form);

			expect(scope.adjustedUnitTotal(scope.courses)).toBe(2);
		}));

		it('should return sum of adjusted Units when there are multiple quarter courses', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'quarter', units: 3 }, form);
			scope.addClass({ schedule: 'quarter', units: 3 }, form);

			expect(scope.adjustedUnitTotal(scope.courses)).toBe(4);
		}));

		it('should return correct sum of all Units when there are quarter and semester courses', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'quarter', units: 3 }, form);
			scope.addClass({ schedule: 'semester', units: 3 }, form);

			expect(scope.adjustedUnitTotal(scope.courses)).toBe(5);
		}));
	});
});
