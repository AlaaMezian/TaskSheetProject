define([
	'jquery',
	'underscore',
	'backbone',
    'marionette',
    'bootstrap',
    'highcharts',
 
    
],
function(
    $,
	_,
	Backbone,
    Marionette,
    Bootstrap,
    highcharts,
  
) {
    var App = new Backbone.Marionette.Application();
    App.on("start", function (options) {
        if (Backbone.history)
            Backbone.history.start();
    })

    return App;

})