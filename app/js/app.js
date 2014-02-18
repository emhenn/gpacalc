'use strict';

// Declare app level module which depends on filters, and services
angular
	.module('gpaCalc', [])
	.controller('gpaCalcController', function GpaCalcController($scope) {
		function Course(newcourse) {
			this.schedule = newcourse.schedule;
			this.term = newcourse.term;
			this.year = newcourse.year;
			this.grade = newcourse.grade.toUpperCase();
			this.units = newcourse.units;
			this.school = newcourse.school === undefined ? '' : newcourse.school.toString();
			this.adjustedUnits = function () {
				return this.units * (this.schedule === 'semester' ? 1 : 2 / 3);
			};
			this.gradeValue = function () {
				switch (this.grade) {
				case "A+":
					return 4.33;
				case "A":
					return 4.0;
				case "A-":
					return 3.67;
				case "AB":
					return 3.5;
				case "B+":
					return 3.33;
				case "B":
					return 3.0;
				case "B-":
					return 2.67;
				case "BC":
					return 2.5;
				case "C+":
					return 2.33;
				case "C":
					return 2.0;
				case "C-":
					return 1.67;
				case "CD":
					return 1.5;
				case "D+":
					return 1.33;
				case "D":
					return 1.0;
				case "D-":
					return 0.67;
				}
				return 0;
			};
			this.gradePoints = function () {
				return this.gradeValue() * this.adjustedUnits();
			};
		}
		$scope.terms = [ 'Winter', 'Spring', 'Summer', 'Fall' ];
		$scope.courses = [];
		$scope.addClass = function (course, courseForm) {
			if (courseForm.$invalid) {
				return;
			}
			$scope.courses.push(new Course(course));
			course.grade = '';
			course.units = '';
			document.getElementById('grade').focus();
		};
		$scope.deleteClass = function (course) {
			$scope.courses.splice($scope.courses.indexOf(course), 1);
		};
		$scope.noClasses = function () {
			return $scope.courses.length === 0;
		};
		$scope.adjustedUnitTotal = function () {
			return _.reduce($scope.courses, function (memo, crse) {
				return memo + crse.adjustedUnits();
			}, 0);
		};
		$scope.gradePointAverage = function () {
			var gradepoints = _.reduce($scope.courses, function (memo, crse) {
				return memo + crse.gradePoints();
			}, 0);
			return Math.floor(gradepoints * 1000 / $scope.adjustedUnitTotal()) / 1000;
		};
	});
