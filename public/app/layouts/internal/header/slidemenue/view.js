define([
	'App',
	'text!layouts/internal/header/slidemenue/template.html'
],
function(
	App,
	template
){
	return Backbone.Marionette.LayoutView.extend({
		
		tagName: 'ul',

		className: 'nav navbar-nav percentage',
		
		template: _.template(template),


		attributes : {
			style : "margin-left: 160px"
		},

		onRender: function(){
	

			
		},

	});
});