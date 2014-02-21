/*jslint indent: 4, maxerr: 50, browser: true, devel: true, nomen: true, plusplus: true */
'use strict';


describe('gpaCore.Course', function () {

	it('should build object with supplied values', inject(function () {
		var suppliedValues = {
			schedule: 'quarter',
			term: 1,
			year: 1,
			grade: 'BC',
			units: 3,
			school: 's'
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.schedule).toBe(suppliedValues.schedule);
		expect(course.term).toBe(suppliedValues.term);
		expect(course.year).toBe(suppliedValues.year);
		expect(course.grade).toBe(suppliedValues.grade);
		expect(course.units).toBe(suppliedValues.units);
		expect(course.school).toBe(suppliedValues.school);
	}));

	it('should capitalize lowercase grades', inject(function () {
		var suppliedValues = {
			grade: 'bc'
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.grade).toBe(suppliedValues.grade.toUpperCase());
	}));

	it('should return empty string when school not provided', inject(function () {
		var suppliedValues = {
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.school).toBe('');
	}));

	it('should return 0 when grade value not found', inject(function () {
		var suppliedValues = {
			grade: 'xxx'
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.gradeValue()).toBe(0);
	}));

	it('should return a correct termLabel for supplied term', inject(function () {
		var suppliedValues = {
			term: 1
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.termLabel()).toBe('Winter');
	}));

	it('should return a correct gradevalue for supplied grade', inject(function () {
		var suppliedValues = {
			grade: 'bc'
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.gradeValue()).toBe(2.5);
	}));

	it('should return unadjusted units for semester', inject(function () {
		var suppliedValues = {
			schedule: 'semester',
			units: 3
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.adjustedUnits()).toBe(3);
	}));

	it('should return adjusted units for quarter', inject(function () {
		var suppliedValues = {
			schedule: 'quarter',
			units: 3
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.adjustedUnits()).toBe(2);
	}));

	it('should return correct grade points non-adjusted for semester', inject(function () {
		var suppliedValues = {
			schedule: 'semester',
			units: 3,
			grade: 'a'
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.gradePoints()).toBe(12);
	}));

	it('should return correct grade points adjusted for quarter', inject(function () {
		var suppliedValues = {
			schedule: 'quarter',
			units: 3,
			grade: 'a'
		}, course = new gpaCore.Course(suppliedValues);

		expect(course.gradePoints()).toBe(8);
	}));

});