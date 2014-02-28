'use strict';

module.exports = function (config) {
    config.set({
		basePath : '../app',

		files : [
			'lib/angular/angular.js',
			'lib/angular/angular-*.js',
			'lib/underscore-min.js',
			'../test/lib/angular/angular-mocks.js',
			'js/**/*.js',
			'../test/unit/*.js'
		],

		exclude : [
			'lib/angular/angular-loader.js',
			'lib/angular/*.min.js',
			'lib/angular/angular-scenario.js'
		],

		preprocessors: {
			'js/**/*.js': ['coverage']
		},

		reporters: ['progress', 'coverage'],

		coverageReporter: {
			type: 'html',
			dir: '../coverage/'
		},

		autoWatch : true,

		frameworks: ['jasmine'],

		browsers : ['Chrome'],

		singleRun : false,

		proxies: {
			'/': 'http://localhost:8001'
		},

		plugins : [
			'karma-junit-reporter',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-coverage'
		],

		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		}
	});
};
