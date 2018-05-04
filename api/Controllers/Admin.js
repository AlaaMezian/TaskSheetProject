'use strict';

var Models = require('../../models/');
var response = require('../helpers/responseObject');
var exports = module.exports = {}
/*
GET all inactive accounts 
api/getInactiveAccount
*/
exports.getInactiveAccount = function (req, res) {
    
    Models.user
        .findAll({
            attributes: ['first_name', 'last_name', 'email', 'supervisor_id', 'password'],
            where: {
                flags: common.isProjectActive(Models.user.flags),
            },
        })
        .then((inactiveUsers) => {
            return response.returnData(req, res, 200, { success: true, message: "list of all Inactive accounts", inactiveUsers });
        }).catch(function (err) { return response.returnData(req, res, error.code, { success: false, message: err.message }) });
};

/*
activate a user account 
post api/activateAccount 
*/
exports.activateAccount = function (req, res) {
    //active account
    if (!req.body.id || !req.body.flags) {
        return response.returnData(req, res, 404, { success: false, message: "no user/flag is sent to the server" });
    }
    else {
  
            Models.user.findOne({ where: { id: req.body.id } }).then(function (user) {
                if(user) {
                    if(user.flag){
                    user.updateAttributes({
                        // flags: req.body.flags + user.flag
                    }).then(function() {
                        return response.returnData(req,res,200,{success : true ,message: "flag is updated successfully "})
                    })
                }else {
                    user.updateAttributes({
                        // flags : req.body.flags
                    }).then(function()  {
                        return response.returnData(req,res,200,{success : true, message : "flag is updated successfully "})
                    } )
                    }
                }
             }).catch((error) => {
                return response.returnData(req, res, error.code, { success: false, message: error.message });
            })
    }
};
/*
de activate the user Account
post api/deactivateAccount
*/
exports.deactivateAccount = function (req, res) {
    {
        if (!req.body.id ||!req.body.flags) {
            return response.returnData(req, res, 404, { success: true, message: "no user / flag is sent to the server " })
        } else {
            //for disactivate account
            //get users flags and updated them if they are 1 updated them to 3 if they are 0 update them to 1 
            Models.user
                .update({
                    flags: 0
                },
                {
                    where: {
                        id: req.body.id
                    }
                })

                .then((deactivateAccount) => {
                    return response.returnData(req, res, 200, { success: true, message: "account has been de-activated Successfully" })
                }).catch((error) => {
                    return response.returnData(req, res, error.code, { success: false, message: error.message });
                })
        }
    }
};
/*
change the super visor that is responsible for a certain user/ assign a supervisor for a user
post api/assignSupervisor
*/
exports.assignSupervisor = function (req, res) {

    if (!req.body.id || !req.body.supervisor_id) {
        return response.returnData(req, res, 404, { success: false, message: "either the user or the super visor you are sending is not found" });
    } else if (req.body.id == req.body.supervisor_id ){
        return response.returnData(req,res, 403 , {status : true , message : "you cant align your self as your own supervisor"});
    }
    else {
        Models.user.findOne({ where: { id: req.body.id } }).then(function (user) {
           if(user) {
               user.updateAttributes({
                   supervisor_id: req.body.supervisor_id
               }).then(function() {
                   return response.returnData(req,res,200,{status : true ,message: "supervisor is assigned successfully"})
               })
           }

        }).catch((error) => {
                return response.returnData(req, res, error.code, { success: false, message: error.message })
            })

    }

}

