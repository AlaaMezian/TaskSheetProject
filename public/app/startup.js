requirejs([
	'App',
	'Router',
	'common/models/user'
],
function (
	App,
	Router,
	UserModel
) {
  // setTimeout(function(){
  //   console.log('App', App)
  // }, 2000)
	App.Router = new Router();
	
	App.User = UserModel;

	App.start();
});