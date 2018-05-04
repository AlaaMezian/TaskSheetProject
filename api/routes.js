// 'use strict'

// var userController = require('./Controllers/User');
// var authController = require('./Controllers/Auth');
// var adminController = require('./Controllers/Admin');
// var projectController = require('./Controllers/Project')
// var supervisorController = require('./Controllers/Supervisor');
// var taskController = require('./Controllers/Task');
// var express= require('express');
// var router = express.Router();
// var passport = require('passport');
// var allowOnly = require('./helpers/routesHelper').allowOnly;
// var config = require('../config/main');
// var response = require('./helpers/responseObject')


// module.exports =
//   function (app,express) {
//     // var UserRouter = require('./Routes/UserRouter');
  
//     router.get('/user/:id/relatedUser', userController.getAllRelatedUsers);
//     router.get('/getInactiveUser', adminController.getInactiveAccount);
//     router.post('/activateUser', adminController.activateAccount);
//     router.post('/deactivateAccount', adminController.deactivateAccount);

//     router.put('/assignSupervisor', adminController.assignSupervisor)

//     router.post('/addTask', taskController.createTask);
//     router.post('/approveTask', supervisorController.approveTask);
//     router.get('/usersTask/:id', taskController.reviewOwnTask);

//     router.get('/dependeTask/:id', supervisorController.viewDependentTask);

//     router.get('/getSupervisors', userController.getAllSupervisors);
//     router.post('/addProject', projectController.addProject);
//     router.get('/projects',projectController.getProjects);

//     router.get('/inactiveProjects', projectController.getInactiveProjects);
//     router.post('/activateProject', projectController.activateProject);

//     router.get('/s', isLoggedIn, userController.getAllUsers);
//     router.get('/user/:id', isLoggedIn, allowOnly(config.accessLevels.admin, userController.getUser));

//     router.get('/logout', isLoggedIn, authController.logout);

//     router.post('/login', function (req, res, next) {
//       passport.authenticate('local-login', function (err, user, info) {

//         if (err) { return next(err) }
//         if (!user) {
//           // * Display message using Express 3 locals
//           req.session.message = info.message;
//           return response.returnData(req, res, 404, { success: false, message: "Email or password is incorrect" })
//         }
//         req.logIn(user, function (err) {
//           if (err) { return next(err); }
//          // var userInSession = req.session.passport.user;
//          //remove the password from the user object and then return it with the response 
//          user.password = undefined ;
//           return response.returnData(req, res, 200, { success: true, message: "logged in successfully", user })
//         });
//       })(req, res, next);
//     });
    
//     router.post('/changePassword',userController.changePassword)

//     router.post('/signUp', authController.signUp);
//     router.get('/user/:id/relatedUser', userController.getAllRelatedUsers);

//     // * a middle ware to check whether use is logged in a have a sesssion or not */
//     function isLoggedIn(req, res, next) {
//       if (req.isAuthenticated())
//         //isAithentiated is a passport message 
//         return next();
//       res.redirect('/login');
//     }

//     app.use('/api', router);

//   };
