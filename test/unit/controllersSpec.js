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

	describe('The noClasses() function', function () {
		it('should report true when there are no courses', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });
			expect(scope.noClasses()).toBe(true);
		}));

		it('should report false when there is at least one course', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};
			scope.addClass({ schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' }, form);
			expect(scope.noClasses()).toBe(false);
		}));
	});

	describe('The addClass() function', function () {
		it('should create a new Course', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};
			scope.addClass({ schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' }, form);
			expect(scope.courses).toBeDefined();
			expect(scope.courses instanceof Array).toBe(true);
			expect(scope.courses.length).toBe(1);
			expect(scope.courses[0] instanceof gpaCore.Course).toBe(true);
		}));

		it('should reset grade and units', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {},
				crse = { schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' };

			scope.addClass(crse, form);

			expect(crse.grade).toBe('');
			expect(crse.units).toBe('');
		}));

		it('should focus on grade element', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {},
				crse = { schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' };

			scope.addClass(crse, form);

			expect(scope.focusMe.grade).toBe(true);
		}));
	});

	describe('The deleteClass() function', function () {
		it('should leave courses empty when last course is deleted', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};
			scope.addClass({ schedule: 'a', term: 'b', year: 1, grade: 'a+', units: 1, school: 'c' }, form);
			scope.deleteClass(scope.courses[0]);

			expect(scope.courses.length).toBe(0);
		}));

		it('should delete specified course and leave others alone', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {},
				course1 = { course: 1 },
				course2 = { course: 2 },
				course3 = { course: 3 };

			scope.courses = [ course1, course2, course3 ];
			scope.deleteClass(course2);

			expect(scope.courses.length).toBe(2);
			expect(scope.courses[0]).toBe(course1);
			expect(scope.courses[1]).toBe(course3);
		}));
	});

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

	describe('The gradePointAverage function', function () {
		it('should return NaN when there are no courses (divide by zero)', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });

			expect(isNaN(scope.gradePointAverage(scope.courses))).toBe(true);
		}));

		it('should return grade value when there is one semester course', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'semester', grade: 'a', units: 3 }, form);

			expect(scope.gradePointAverage(scope.courses)).toBe(4);
		}));

		it('should return correct gpa for two courses with same number of units', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'semester', grade: 'a', units: 3 }, form);
			scope.addClass({ schedule: 'semester', grade: 'b', units: 3 }, form);

			expect(scope.gradePointAverage(scope.courses)).toBe(3.5);
		}));

		it('should return correct gpa for two courses with different number of units', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope }),
				form = {};

			scope.addClass({ schedule: 'semester', grade: 'a', units: 4 }, form);
			scope.addClass({ schedule: 'semester', grade: 'd', units: 2 }, form);

			expect(scope.gradePointAverage(scope.courses)).toBe(3);
		}));
	});

	describe('The clearAll function', function () {
		it('should clear out the gpacalc object', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });

			scope.gpacalc = { name: 'bob', school: 'u of me' };
			scope.clearAll();

			expect(scope.gpacalc.name).toBe(undefined);
			expect(scope.gpacalc.school).toBe(undefined);
		}));

		it('should remove all courses', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });

			scope.courses = [ { course: 1 }, { course: 2 }, { course: 3 } ];
			scope.clearAll();

			expect(scope.courses.length).toBe(0);
		}));

		it('should focus on name control', inject(function () {
			var ctrl = $controllerConstructor('gpaCalcController', { $scope: scope });

			scope.clearAll();

			expect(scope.focusMe.name).toBe(true);
		}));
	});
});
