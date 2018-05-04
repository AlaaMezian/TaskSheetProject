
//this is a load scripting file instead of puting scripts every whre in main .js we call this file which load our scripts 
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',
    underscore: '../bower_components/lodash/lodash',
    backbone: '../bower_components/backbone/backbone-min',
    templates: '../templates',
    marionette: '../bower_components/marionette/lib/backbone.marionette',
    bootstrap:'../bower_components/bootstrap/dist/js/bootstrap',
    highcharts : '../bower_components/highcharts/highcharts',
    backgrid : '../bower_components/backgrid/lib/backgrid',

  },
  shim: {

    jquery: {
      exports: '$'
    },

    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },

    marionette : {
      deps: [ 'jquery', 'underscore', 'backbone' ],
      exports: 'Marionette'
    },

    bootstrap: {
      deps: [ 'jquery' ]
    },

    highcharts : {
      deps: [ 'jquery' ],
      exports: 'highcharts'
    },
    backgrid : {
      exports : 'Backgrid'
    },



  },
  waitSeconds: 0,
 
  baseURL: 'app',

  deps : ['startup'],
  load : 0,

  progress : 0,

});
