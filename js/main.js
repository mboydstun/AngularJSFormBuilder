var app = angular.module("dragdrop", ['ui.bootstrap', '$strap.directives']);

function mainCtrl($scope){
	// the current popover template doesn't let you include ng-include (and other templates)
	// so, we will use a databound select list instead of an included template
	$scope.items = items;
	
	$scope.formControls = [];

	$scope.panes = [
		{ title:"Input",      			content:"input.html", controls: inputControls,  active: true},
		{ title:"Radios / Checkboxes",  content:"input.html", controls: radioControls},
		{ title:"Select",      			content:"input.html", controls: selectControls},
		{ title:"Buttons",      		content:"input.html", controls: buttonControls},
		{ title:"Render",      			content:"render.html"},
		{ title:"About",      			content:"about.html"}
	];
}