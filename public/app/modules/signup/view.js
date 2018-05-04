define([
    'App',
    'text!modules/signup/template.html'
],
function(
    App,
    template
) {
    return Backbone.Marionette.LayoutView.extend({
        el: 'body',
        template: _.template(template),
        
        ui: {
            sigupnBtn : '#submit1',
            
        },

        events: {
            'click #submit1': 'signup'
        },

        signup: function() {
                var self = this;
				App.User.signup({
					creds: {
                        first_name:this.$('#firstName').val(),
                        last_name: this.$('#LastName').val(),
						email: this.$('#inputEmail').val(),
                        password: this.$('#inputPassword').val(),
                        supervisor:this.$('#supervisor').val(),
                    },
                },function(err, data){
					if(err){
                        self.error(err)
                    }else{
                        self.success(data)
                    }
                }
            );
            },

            success: function(success) {
                   if(success){
                       
                       
                   }
                   else{
                       
                   }
               },
               error: function(error){
                   $('#ErrorMsg')[0].innerText=error
                   
               }
         
    });
});
