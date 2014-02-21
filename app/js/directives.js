'use strict';

gpaCalcApp.directive('focusMe', function () {
	return {
		link: function (scope, element, attrs) {
			scope.$watch('focusMe.' + attrs.id, function (value) {
				console.log('value=', value);
				if (value === true) {
					element[0].focus();
					scope.focusMe[attrs.id] = false;
				}
			});
		}
	};
});