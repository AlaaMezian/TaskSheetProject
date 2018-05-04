define([
  'App',
  // 'modules/user/days/view',
  'text!modules/user/template.html',
  'layouts/internal/header/view',
  'layouts/internal/footer/view'
],
  function (
    App,
    // DaysView,
    template,
    HeaderView,
    FooterView

  ) {
    var Territory = Backbone.Model.extend({
      success: true ,
       message : "default list" ,
       projects : [
         {
          id : 2,
         name : "default project name"
        }
       ],

      getu: function (options, callback) {
        var self = this;
        this.fetch({
          url: '/api/projects',
          type: 'get',
          success: function (model, response) {
            console.log(1111, response)
            if (response.success) {
              App.user = response.user

            }

          },
          error: function (model, response) {
            //callback(response.responseJSON.m);
          }
        });
      },
    });
    var Territories = Backbone.Collection.extend({
      model: Territory,

      initialize: function () {
        this.set("obj", new Territory())
      },

      url: function () {
        return '/api/projects';
      },




    });
    return Backbone.Marionette.LayoutView.extend({

      el: 'body',
      model: new Territory,
      template: _.template(template),
      regions: {

        header: "header",
        footer: "footer"
      },

      //   ui: {

      //     signInBtn : '#submit',


      // },

      events: {
        'click #submit': 'login',

      },

      login: function () {
        console.log("gggggggggg")
      },

      onRender: function () {
        this.getRegion('header').show(new HeaderView());
        this.getRegion('footer').show(new FooterView());
        var territories = new Territories();

        var columns = [{
          name: "id", // The key of the model attribute
          label: "ID", // The name to display in the header
          editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
          // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
          cell: Backgrid.IntegerCell.extend({
            orderSeparator: ''
          })
        }, {
          name: "name",
          label: "Name",
          // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
          cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
        }, {
          //    name: "password",
          //    label: "password",
          //    cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
          //  }, {
          //    name: "created_at",
          //    label: "Date",
          //    cell: "date"
          //  }, {
          //    name: "Action",
          //    label: "Action",
          //cell: "uri" // Renders the value in an HTML anchor element
          cell: Backgrid.Cell.extend({
            className: 'custom_class',
            render: function () {
              console.log(Territory.get('message'));
              this.$el.html('<button id="submit" calss=".btn-danger">delete</button >');

              return this;
            }
          }),
        }];
        // Initialize a new Grid instance
        var grid = new Backgrid.Grid({
          columns: columns,
          collection: territories
        });
        // Render the grid and attach the root to your HTML document
        $("#example-1-result").append(grid.render().el);
        // Fetch some countries from the url
        territories.fetch({
          success: function (model, response) {
            console.log(response)
          }
        });

      },
    });


  })