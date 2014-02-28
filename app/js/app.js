/*jslint indent: 4, maxerr: 50, browser: true, devel: true, nomen: true, plusplus: true */
'use strict';

// Declare app level module which depends on filters, and services
var gpaCalcApp = angular.module('gpaCalc', [])
	.controller('gpaCalcController', function GpaCalcController($scope, $window, gpaCore) {
		$scope.termLabelFor = function (term) {
			return gpaCore.termLabels[term];
		};
		$scope.terms = gpaCore.termLabels;
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
		$scope.addClass = function (course) {
			if ($scope.gpaCalcForm.$invalid) {
				return;
			}
			$scope.courses.push(new gpaCore.Course(course));
			course.grade = '';
			course.units = '';
			$scope.focusMe = { grade: true };
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
		$scope.gradePointAverage = function (courses) {
			var gradepoints1K = _.reduce(courses, function (memo, crse) {
				return memo + crse.gradePoints() * 1000;
			}, 0);
			return Math.floor(gradepoints1K / $scope.adjustedUnitTotal(courses)) / 1000;
		};
		$scope.clearAll = function () {
			$scope.gpacalc = {};
			$scope.courses.length = 0;
			$scope.focusMe = { name: true };
			report();
		};
		$scope.print = function () {
			$window.print();
		};
		$scope.subtotalLabelForTerm = function (term) {
			return term === 'all' ? 'Year' : $scope.termLabelFor(term);
		};
	});
