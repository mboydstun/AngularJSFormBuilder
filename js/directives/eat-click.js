app.directive('eatclick', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.click(function(event) {
				event.preventDefault();
			});
			element.mousedown(function(event) {
				event.preventDefault();
			});
		}
	};
})

app.directive('eatclickRadio', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			element.click(function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
			element.mousedown(function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
		}
	};
})