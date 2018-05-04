define([
	'App',
	'text!layouts/external/template.html'
],
function(
	App,
	template
){
	return Backbone.Marionette.LayoutView.extend({
		
		el: 'body',

		template: _.template(template),

		regions: {
			content: "#content"
		},

		onDestroy: function(){
			$('html').append(document.createElement('body'));
		},

		
	});
});