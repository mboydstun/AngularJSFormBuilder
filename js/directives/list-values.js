app.directive('listvalues', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attr, ngModel) {

			function fromUser(text) {
				return text.split("\n");
			}

			function toUser(text) {
				return text.join("\n");
			}
			ngModel.$parsers.push(fromUser);
			ngModel.$formatters.push(toUser);
		}
	};
});