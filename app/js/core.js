var gpaCore = (function () {
	'use strict';

	return {
		termLabels: { 1: 'Winter', 2: 'Spring', 3: 'Summer', 4: 'Fall' },
		termMultiplier: { 'semester': 1, 'quarter': 2 / 3 },
		gradeValues: {
			'A+': 4.33,
			'A':  4.0,
			'A-': 3.67,
			'AB': 3.5,
			'B+': 3.33,
			'B':  3.0,
			'B-': 2.67,
			'BC': 2.5,
			'C+': 2.33,
			'C':  2.0,
			'C-': 1.67,
			'CD': 1.5,
			'D+': 1.33,
			'D':  1.0,
			'D-': 0.67,
			'F':  0
		},
		Course: function (newcourse) {
			this.schedule = newcourse.schedule;
			this.term = newcourse.term;
			this.year = newcourse.year;
			this.grade = newcourse.grade.toUpperCase();
			this.units = newcourse.units;
			this.school = newcourse.school === undefined ? '' : newcourse.school.toString();
			this.termLabel = function () {
				return gpaCore.termLabels[this.term];
			};
			this.adjustedUnits = function () {
				return this.units * gpaCore.termMultiplier[this.schedule];
			};
			this.gradeValue = function () {
				return gpaCore.gradeValues[this.grade] || 0;
			};
			this.gradePoints = function () {
				return this.gradeValue() * this.adjustedUnits();
			};
		}
	};
}());