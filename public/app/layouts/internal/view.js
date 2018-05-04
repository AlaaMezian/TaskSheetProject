define([
	'App',
    'text!layouts/internal/footer/template.html',
    
],
function(
	App,
	template
){
	return Backbone.Marionette.LayoutView.extend({
		template: _.template(template)
	});
});