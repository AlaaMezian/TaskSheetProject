'use strict';

var Models = require('../../models/');
var sequelize = require('sequelize');
var _ = require('lodash');
var response = require('../helpers/responseObject');
var exports = module.exports = {}

//GET /api/user/:id
exports.getUser = function (req, res) {
  {
    Models.user
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then((user) => {
        return res.json(user);
      });
  }
};
/*
Ala'a Mezian
get /users
return all users in the system
*/
exports.getAllUsers = function (req, res) {
  {
    Models.user.findAll().then((users) => {
      return res.json(users);
    });
  }
};
/*
Ala'a Mezian
get /user/1/relatedUser 
return user under the supervision of the user that have id value equal 1 
*/
exports.getAllRelatedUsers = function (req, res) {
  Models.user.findOne({
    where:
      {
        id: req.params.id
      }
  }).then((user) => {
    if (user) {
      console.log(user);
      Models.user.findAll({ where: { supervisor_id: req.params.id } }).then((users) => {
        //i am testing with returning the names only but we might choose to return the whole user
        if (users && users.length !== 0) {
          return response.returnData(req,res, 200 , {success : true , message : "a list of all related users " ,users : users })
        } else {
          return response.returnData(req,res,404,{success : false , message : "no related users found " })
        }
      }).catch(function(err)  {
        return response.returnData(req,res,err.code,{message : err.message})
      } );
    }
    else {
      return response.returnData(req,res,404,{success : false , message: "user not found "})
    }
  })
};
/*
get /getSupervisors
return a list of all supervisors 
*/
exports.getAllSupervisors = function (req, res) {
  Models.user.findAll({ attributes: ['supervisor_id'], }).
    then(function (result) {
      var arr = []; _.forEach(result, function (val, key) { arr.push(val.supervisor_id) }),
        Models.user.findAll({
          attributes: ['first_name', 'last_name'],
          where: { id: arr }
        })
          .then((last) => {
            return respons.returnData(req, res, 200, {
              success: true, message: "choose one of those as supervisor", last
            })
          }
          ).catch(function (err) {
            return response.returnData(req, res, err.code, { success:false, message: err.message })
          })
    })
};
/*
put /changePassword 
change the user password after the first login 
*/
exports.changePassword =function(req,res) {
  Models.user.findOne( {where : {id : req.body.user_id } }).then((user) => {

    // var password = User.generateHash(req.body.password);
    if(!req.body.password){
      return response.returnData(req,res,400 , {success : false ,message : "please fill all fields"})
    }
    var password = Models.user.generateHash(req.body.password);
    user.update({
      password : password
    })
      return response.returnData(req,res ,200 ,{success : true , message : "password changed successfully"})
  }).catch(function(err) {
    return response.returnData(req,res,err.code , err.message);
  })
}