define([
    'App',
    'text!modules/login/template.html'
],
function(
    App,
    template
) {
    return Backbone.Marionette.LayoutView.extend({
        el: 'body',
        template: _.template(template),
        
        ui: {
            errorMsg : '#ErrorMsg',
            signInBtn : '#submit',
            signupBtn : '#signup'
           
        },

        events: {
            'click #submit': 'login',
            'click #signup': 'signup'
        },

        loginProgress : function () {
            this.ui.errorMsg.fadeIn(200).delay(2500).slideUp(400);
            this.ui.signInBtn.attr('disabled',false);
        },

        login: function() {
                var self = this;
                self.ui.signInBtn.attr('disabled',true);
				App.User.login({
					creds: {
						email: this.$('#inputEmail').val(),
						password: this.$('#inputPassword').val()
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
                    //flag check 
                    if(App.user)
                    App.Router.navigate('#changePassword', {trigger:true});
                }
                else{
                    this.loginProgress();
                }
               },

        error: function(error){
            $('#ErrorMsg')[0].innerText=error
            this.loginProgress();
        },

        signup: function(){
            App.Router.navigate('#signup', {trigger:true});
        }

         
    });
});
