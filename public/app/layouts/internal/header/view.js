define([
	'App',
	'text!layouts/internal/header/template.html',
	'layouts/internal/header/slidemenue/view'
    
],
function(
	App,
	template,
	slidemenuView
){
	return Backbone.Marionette.LayoutView.extend({
		tagName: 'nav',

		//className: 'navbar navbar-default nav-cloudview',

		id: 'slide-nav',
        
		template: _.template(template),
		
		regions: {
			slidemenu: "#slidemenu"
		},
		onRender: function(){
		// 	App.rootView = new slidemenuView();
        // App.rootView.render();
			this.getRegion('slidemenu').show(new slidemenuView());
		},
	});
});