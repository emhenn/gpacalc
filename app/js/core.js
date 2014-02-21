var gpaCore = (function () {
	'use strict';

	return {
		termLabels: { 1: 'Winter', 2: 'Spring', 3: 'Summer', 4: 'Fall' },

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
	};
}());