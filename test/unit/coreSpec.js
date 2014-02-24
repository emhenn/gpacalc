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
		var winterCourse = new gpaCore.Course({ term: 1 }),
			springCourse = new gpaCore.Course({ term: 2 }),
			summerCourse = new gpaCore.Course({ term: 3 }),
			fallCourse = new gpaCore.Course({ term: 4 });

		expect(winterCourse.termLabel()).toBe('Winter');
		expect(springCourse.termLabel()).toBe('Spring');
		expect(summerCourse.termLabel()).toBe('Summer');
		expect(fallCourse.termLabel()).toBe('Fall');
	}));

	it('should return a correct gradevalue for each supplied grade', inject(function () {
		var gradeAPLUS = new gpaCore.Course({ grade: 'a+' }),
			gradeA = new gpaCore.Course({ grade: 'a' }),
			gradeAMINUS = new gpaCore.Course({ grade: 'a-' }),
			gradeAB = new gpaCore.Course({ grade: 'ab' }),
			gradeBPLUS = new gpaCore.Course({ grade: 'b+' }),
			gradeB = new gpaCore.Course({ grade: 'b' }),
			gradeBMINUS = new gpaCore.Course({ grade: 'b-' }),
			gradeBC = new gpaCore.Course({ grade: 'bc' }),
			gradeCPLUS = new gpaCore.Course({ grade: 'c+' }),
			gradeC = new gpaCore.Course({ grade: 'c' }),
			gradeCMINUS = new gpaCore.Course({ grade: 'c-' }),
			gradeCD = new gpaCore.Course({ grade: 'cd' }),
			gradeDPLUS = new gpaCore.Course({ grade: 'd+' }),
			gradeD = new gpaCore.Course({ grade: 'd' }),
			gradeDMINUS = new gpaCore.Course({ grade: 'd-' }),
			gradeF = new gpaCore.Course({ grade: 'f' });

		expect(gradeAPLUS.gradeValue()).toBe(4.33);
		expect(gradeA.gradeValue()).toBe(4.0);
		expect(gradeAMINUS.gradeValue()).toBe(3.67);
		expect(gradeAB.gradeValue()).toBe(3.5);
		expect(gradeBPLUS.gradeValue()).toBe(3.33);
		expect(gradeB.gradeValue()).toBe(3.0);
		expect(gradeBMINUS.gradeValue()).toBe(2.67);
		expect(gradeBC.gradeValue()).toBe(2.5);
		expect(gradeCPLUS.gradeValue()).toBe(2.33);
		expect(gradeC.gradeValue()).toBe(2.0);
		expect(gradeCMINUS.gradeValue()).toBe(1.67);
		expect(gradeCD.gradeValue()).toBe(1.5);
		expect(gradeDPLUS.gradeValue()).toBe(1.33);
		expect(gradeD.gradeValue()).toBe(1.0);
		expect(gradeDMINUS.gradeValue()).toBe(0.67);
		expect(gradeF.gradeValue()).toBe(0);
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