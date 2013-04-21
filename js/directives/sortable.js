
app.directive('sortable', function() {
	return {
		restrict: 'A',
		link: function(scope,element,attrs){
			var external = false;
			var sortableIn = 0;
			element.sortable({
				distance: 10,
				placeholder: "placeholder",
				tolerance:'pointer',
				start:function(e, ui){
					ui.item.data('start', ui.item.index());
					$('.ui-draggable-dragging, .ui-sortable-helper').addClass("drag-style-fix");
					ui.placeholder.height(ui.item.height());
				},
				update: function(e, ui){
					var start = ui.item.data('start');
					var end = ui.item.index();

					var arr = scope[attrs.sortable];
					arr.splice(end, 0, arr.splice(start, 1)[0]);

					scope.$apply(arr);
				},
				over: function(e, ui) {
					sortableIn = 1;
					$('.placeholder').show();
					$('.ui-draggable-dragging, .ui-sortable-helper').addClass("drag-style-fix");
				},
				out: function(e, ui) {
					sortableIn = 0;
					$('.placeholder').hide();
				},
				beforeStop: function (event, ui) {
					if (sortableIn == 0) {
						var start = ui.item.data('start');
						var arr = scope[attrs.sortable];

						arr.splice(start, 1);
						scope.$apply(arr);
					}
				},
				stop: function(event, ui){
					if(external){
						ui.item.remove();
						external = false;
					}

					$('.control').removeClass("drag-style-fix");
				},
				receive: function (event, ui) {
					scope[attrs.sortable].push(draggedItem);
					scope.$apply(scope[attrs.sortable]);
					external = true;
				}
			});
		}
	}
});