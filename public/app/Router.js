//Back Bone Route
define([
  'App',
  'marionette',
  'backgrid',
  'modules/login/view',
  'modules/user/view',
  'modules/signup/view',
  'modules/changePassword/view'
],
  function (
    App,
    Marionette,
    Backgrid,
    LoginView,
    UserView,
    SignupView,
    ChangePasswordView
 
  ) {

    return Marionette.AppRouter.extend({
      routes: {
        // Define some URL routes

        ''				: 'showlogin',
        'login' 	: 'showlogin',
        'task'    : 'showtask',
        'signup'  : 'showsignup',
        'changePassword' : 'showchangepassword'
      },
      

      showlogin: function () {
        App.rootView = new LoginView();
        App.rootView.render();
      },
      showchangepassword : function(){
        App.rootView = new ChangePasswordView()
        App.rootView.render();
      },


      showtask: function () {
        App.rootView = new UserView();
        App.rootView.render();
      },

      showsignup: function (){
        console.log("ok")
        App.rootView = new SignupView();
        App.rootView.render();
      }
    });

  });