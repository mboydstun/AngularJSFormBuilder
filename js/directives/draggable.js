var draggedItem = null;
app.directive('draggable', function() {
	return {
		// A = attribute, E = Element, C = Class and M = HTML Comment
		restrict:'A',
		scope:{
			template: '=',
			control:'='
		},
		transclude:true,
		template: '<div class="draggable" ng-transclude></div>',
		link: function(scope, element, attrs) {
			function fakeDrag(element){
				element.one( "mousedown", function(e) {
					element.simulate('drag', {clientX: e.clientX, clientY: e.clientY});
					fakeDrag(element);
				});
			}

			fakeDrag(element);

			element.draggable({
				connectToSortable: '#userControls',
				helper: 'clone',
				start: function(event, ui) {
					draggedItem = $.extend(true, {}, scope.control);
					$('.ui-draggable-dragging').addClass("span6");
				},
				stop: function(event, ui) {
					draggedItem = null;
					$('.ui-draggable-dragging').removeClass("span6");
				}
			});
		}
	}
});