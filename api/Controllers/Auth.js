
'use strict';
//login ,sign up ,and logput
var Models = require('../../models/');
var config = require('../../config/main');
var User = require('../../models/').user
var jwt = require('jsonwebtoken');
var validator = require('validator');
// var bcrypt = require('bcrypt-nodejs');
var response = require('../helpers/responseObject');

var exports = module.exports = {}
// Authenticate the user and get a JSON Web Token to include in the header of future requests.
//the end for the user the fron-end uses this to sign Up the user
exports.signUp = function (req, res) {
    if (!req.body.email || !req.body.first_name || !req.body.last_name) {
        return response.returnData(req, res, 400, {
            success: false,
            message: "please provide all required fields"
        })
    } else {
        //check if email is registered
        Models.user.findOne({ where: { email: req.body.email } }).then(function (user) {

            if (user) {
                // return res.status(400).send({ message: 'That email is already taken' });
                return response.returnData(req, res, 400, { success: false, message: "that email is already taken " });
            }
        })
        //password 
        var password = User.generateHash(req.body.password);
        if (!validator.isEmail(req.body.email)) {
            return response.returnData(req, res, 400, { success: false, message: "please enter a valid email address " })
        }
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: password,
            supervisor_id: req.body.supervisor_id,
            flags: 1 //setting this ti 1 because the user by defa  
        };

        return User.create(newUser).then(function () {
            return response.returnData(req, res, 200, { success: true, message: "Account Created" })
        })
            .catch(function (err) {
                return res.status(400).send({ message: err.message });
            }).catch(function (err) {
                return res.status(500).json({ message: "issues trying to connect to database" });
            });
    }
};

// logout destroy session and redirect use to home page 
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
        res.finished = true
    });
}

