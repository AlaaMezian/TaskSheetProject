define([
    'App',
    'text!modules/changePassword/template.html'
],function(
    App,
    template
){return Backbone.Marionette.LayoutView.extend({
    el: 'body',
    template: _.template(template),
    ui: {
        newPassword : "#submitNewPassword"
    }
    ,
    events : {
         'click #submitNewPassword': 'submitPassword'
    },
    submitPassword : function(options , callback){
        var self = this ;
        options: {
            password: this.$('#inputPassword').val()
        }
        this.save(options.password,{
            url:'/api/changePassword',
            type: 'PUT',
            success: function(model, response) {
                 if(response.success){
                     callback(null, response.success)
                 }
                
            },
            error: function(model, response) {
                
                callback(response.responseJSON.message);
            }
        } ,{ patch: true })

    }
})
}





);