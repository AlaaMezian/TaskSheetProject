'use strict'

var Models = require('../../models/');
var response = require('../helpers/responseObject');
var exports = module.exports = {}
var project = Models.project;
var sequelize = require('sequelize')

/*
get api/projects
this is a function that return all projects 
*/
exports.getProjects = function (req, res) {
    Models.project.findAll().then((projects) => {
        return response.returnData(req, res, 200, { success: true, message: "a list of all projects ", projects: projects })
    }).catch(function (err) {
        return response.returnData(req, res, err.code, { message: err.message })
    });
};
/*
post api/addProject
this is an end point to a project with a project body 
*/
exports.addProject = function (req, res) {
    if (!req.body.name) {
        return response.returnData(req, res, 402, { success: false, message: "please provide project name" })
    }
    Models.project.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(function (project) {

            if (project) {
                return response.returnData(req, res, 400, { success: false, message: "this project is already exist" })
            }
            else {
                var newproject = {
                    name: req.body.project_name,

                }
                Models.project.create(newproject).then(function () {
                    return response.returnData(req, res, 200, { success: true, message: "the project is created" })
                })
            }

        }).catch(function (err) { return response.returnData(req, res, err.code, { success: false, message: err.message }) })
};
/*
get api/getInactiveProjects 
return a list of all inactive project
*/
exports.getInactiveProjects = function (req, res) {
    var project = new Models.project();
    Models.project
        .findAll(
        {
            where: {
                flags: [sequelize.literal('project.flags & ' + Models._flags['active'] + '= 0')]
            }
        }
        )
        .then(() => {

            return response.returnData(req, res, 200, {
                message: "here is a list of all inactive project"
            }).catch(function (err) { return response.returnData(req, res, err.code, { success: false, message: err.message }) })

        });
}
/*
post api/activateProject
active a project
*/
exports.activateProject = function (req, res) {
    Models.project.update({
        flags: 1
    },
        {
            where: {
                id: req.body.id
            }
        }
    )
        .then(() => {
            return response.returnData(req, res, 200, { success: true, message: "the project has been activated successfully" })
        }).catch(function (err) {
            return response.returnData(req, res, err.code, { message: err.message });
        })
}

