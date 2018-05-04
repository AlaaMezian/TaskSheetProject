"use strict";
import app from '../../src/app'
class Router {

  // Constructor takes:
  // - routePath which is the base path for each service exposed by the router subclass (ie. '/auth/users')
  // - app which is the Express application ref
	constructor(routePath,app) {
		if (app == null)
			throw new Error("Missing required App");
    console.log(444444444)
		this.app = app;
		this.routePath = routePath;
		this._routes = [];
		this.registerServices();
	}
  
  // Computed services property is the only property you must overwrite in your
  // Router subclass. Base implementation does nothing but here you should
  // return a dictionary where:
  // - the key is the HTTP_METHOD + PATH of the service (ie. 'POST login/fb/:token')
  //   the path is the same you should set with a classic route register with express.
  // - the value is the name of the function you should call (you must implement it in your subclass).
  get services() {
		return {};
	}

  // registerRoutes function simply iterate over services property getting the verb, the path
  // and the function and register it along with the base path of the route.
	registerServices() {
		var router_services = this.services;
		Object.keys(router_services).forEach( full_path => {
			// This is the name of the JS function which implement the service's logic
			var service_function = router_services[full_path];
			var path_items = full_path.split(' ');
			// if not specified, GET HTTP METHOD is used
			var verb = (path_items.length > 1 ? path_items[0] : 'get').toLowerCase();
			// the new path is the base path plus the service's specific path
			var path = this.routePath + (path_items.length > 1 ? path_items[1] : full_path);
			// bind to Express's router logic
			this.app[verb](path, this[service_function].bind(this));
		});
	}

}

export default class { BaseRouter };