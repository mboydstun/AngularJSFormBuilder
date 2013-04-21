// don't look at this one :(

app.directive('render', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watch('formControls', function(newValue) {
				if (newValue){
					var controlGroups = $('#userControls .control-group');

					var cleanerHTML = [];
					controlGroups.each(function() { cleanerHTML.push($(this).prop('outerHTML') )});

					var result = cleanerHTML.join("\n\n");

					var toRemove = [
						' ng-pristine ng-valid',
						' data-sortable="formControls" data-render-source="formControls" class="ui-sortable"',
						'<!-- ngRepeat: control in formControls -->',
						' ng-scope',
						' data-ng-repeat="control in formControls"',
						' ng-binding',
						' data-eatclick=""',
						'	',
						'data-ng-repeat="item in control.items" class="ng-scope" ',
						'<!-- ngRepeat: item in control.items -->',
						' data-ng-repeat="item in control.items"',
						'data-eatclick-radio="" '
					];
					$.each(toRemove, function(i, item){
						result = result.replace(new RegExp(item, 'g'), '');
					});

					result = result.replace(new RegExp('><', 'g'), '>\n<');

					result = '<form id="form" class="form-horizontal">\n' +
						'<fieldset>\n' +
						'<legend>Legend</legend>\n\n' +
						result +
						'\n\n' +
						'</fieldset>\n' +
						'</form>\n';

					var lines = result.split('\n');
					var indent = -1;
					var indentChar = '  ';
					for(var i = 0; i < lines.length; i++){
						console.log(lines[i][lines[i].length - 1]);
						if (lines[i].match("^\\<") && !lines[i].match("\\<\\/") &&
							!lines[i].match("^\\<input")) {
							if(indent > 0){
								lines[i] = Array(indent).join(indentChar) + lines[i];
							}
							indent++;
						}else if(lines[i].match("^\\<\\/")) {
							indent--;
							if(indent > 0){
								lines[i] = Array(indent).join(indentChar) + lines[i];
							}
						}
						else{
							if(lines[i]){
								if(indent > 0){
									lines[i] = Array(indent).join(indentChar) + lines[i];
								}
							}
						}
					}

					result = lines.join('\n');

					scope.render = result;
				}
			}, true);
		}
	};
});