define([
	'App'
],
function(App) {

	var model = Backbone.Model.extend({

        login: function(options, callback) {
			var self = this;
			this.save(options.creds,{
                url:'/api/login',
				type: 'POST',
				success: function(model, response) {
					
					if(response.success){
                       App.user=response.user
                        callback(null, response.success)
					}
					
				},
				error: function(model, response) {
					callback(response.responseJSON.message);
				}
			});
		},
		signup : function(options,callback){
			this.save(options.creds,{
                url:'/api/signup',
				type: 'POST',
				success: function(model, response) {
					// if(response.success){
                    //     App.user=response.user
                    //     callback(null, response.success)
					// }
					
				},
				error: function(model, response) {
					
					//callback(response.responseJSON.m);
				}
			});
		},
		getu : function(callback){
			this.save(options.creds,{
                url:'/api/users',
				type: 'get',
				success: function(model, response) {
					console.log(response)
					if(response.success){
                        App.user=response.user
                        callback(null, response.success)
					}
					
				},
				error: function(model, response) {
					console.log(response)
					//callback(response.responseJSON.m);
				}
			});
		}
		

    })
    return new model();
})
