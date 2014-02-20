/*jslint indent: 4, maxerr: 50, browser: true, devel: true, nomen: true, plusplus: true */
'use strict';

// Declare app level module which depends on filters, and services
var gpaCalcApp = angular.module('gpaCalc', [])
	.controller('gpaCalcController', function GpaCalcController($scope) {
		var termLabels = { 1: 'Winter', 2: 'Spring', 3: 'Summer', 4: 'Fall' };
		$scope.termLabelFor = function (term) {
			return termLabels[term];
		};

		function Course(newcourse) {
			this.schedule = newcourse.schedule;
			this.term = newcourse.term;
			this.year = newcourse.year;
			this.grade = newcourse.grade.toUpperCase();
			this.units = newcourse.units;
			this.school = newcourse.school === undefined ? '' : newcourse.school.toString();
			this.termLabel = function () {
				return $scope.termLabelFor(this.term);
			};
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
		$scope.terms = termLabels;
		$scope.courses = [];
		function report() {
			var year, all, reportByYear = _.groupBy($scope.courses, 'year');
			for (year in reportByYear) {
				if (reportByYear.hasOwnProperty(year)) {
					all = reportByYear[year];
					reportByYear[year] = _.groupBy(all, 'term');
					reportByYear[year].all = all;
				}
			}
			$scope.reportByYear = reportByYear;
		}
		$scope.addClass = function (course, courseForm) {
			if (courseForm.$invalid) {
				return;
			}
			$scope.courses.push(new Course(course));
			course.grade = '';
			course.units = '';
			document.getElementById('grade').focus();
			report();
		};
		$scope.deleteClass = function (course) {
			$scope.courses.splice($scope.courses.indexOf(course), 1);
			report();
		};
		$scope.noClasses = function () {
			return $scope.courses.length === 0;
		};
		$scope.adjustedUnitTotal = function (courses) {
			return _.reduce(courses, function (memo, crse) {
				return memo + crse.adjustedUnits();
			}, 0);
		};
		function truncate(num) {
			return Math.floor(num * 1000) / 1000;
		}
		$scope.gradePointAverage = function (courses) {
			var gradepoints1K = _.reduce(courses, function (memo, crse) {
				return memo + crse.gradePoints() * 1000;
			}, 0);
			return truncate(gradepoints1K / 1000 / $scope.adjustedUnitTotal(courses));
		};
		$scope.clearAll = function () {
			$scope.gpacalc = {};
			$scope.courses.length = 0;
			document.getElementById('name').focus();
			report();
		};
		$scope.print = function () {
			window.print();
			//document.getElementById('contents').innerHTML = angular.toJson($scope.reportByYear, true);
		};
		$scope.subtotalLabelForTerm = function (term) {
			return term === 'all' ? 'Year' : $scope.termLabelFor(term);
		};
	});
