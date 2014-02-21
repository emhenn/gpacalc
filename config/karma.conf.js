module.exports = function(config){
    config.set({
    basePath : '../app',

    files : [
      'lib/angular/angular.js',
      'lib/angular/angular-*.js',
	  'lib/underscore-min.js',
      '../test/lib/angular/angular-mocks.js',
      'js/**/*.js',
      '../test/unit/controllersSpec.js'
    ],

    exclude : [
      'lib/angular/angular-loader.js',
      'lib/angular/*.min.js',
      'lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
