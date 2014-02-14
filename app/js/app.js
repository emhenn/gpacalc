'use strict';

// Declare app level module which depends on filters, and services
angular
	.module('gpaCalc', [])
	.controller('gpaCalcController', function GpaCalcController($scope) {
		function Course (newcourse) {
			this.schedule = newcourse.schedule;
			this.term = newcourse.term;
			this.year = newcourse.year;
			this.grade = newcourse.grade;
			this.units = newcourse.units;
			this.adjustedUnits = function () {
				return this.units * (this.schedule === 'semester' ? 1 : 2/3);
			}
		}
		$scope.terms = [ 'Winter', 'Spring', 'Summer', 'Fall' ];
		$scope.addClass = function (course, courseForm) {
			if (courseForm.$invalid) {
				return;
			}
			if ($scope.courses === undefined) {
				$scope.courses = [];
			}
			$scope.courses.push(new Course(course));
		};
	});
