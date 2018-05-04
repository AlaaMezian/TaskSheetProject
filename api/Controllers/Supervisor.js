'use strict';
//to active account 
var Models = require('../../models/');
var Task =require('../../models/').task;
var respone =require('../helpers/responseObject');
var sequelize=require('sequelize');
var _=require('lodash');

var exports = module.exports =  {} 
        
  //approve the task by put request
  //the default value in task model is null but plz remake the db to become 0
  //or change in line 29 if(Task.flags!=null)
  exports.approveTask = function (req, res) {
       if(!req.body.id){
           return respone.returnData(req,res,404,{success:false,message:"plz fill all required field"})
       }
       else {
        Task
        .findOne({
            where:{ id:req.body.id}
         })
        .then((Task)=>{
          if(!Task){
             return respone.returnData(req,res,405,{success:false,message:"sorry this task is not exist"})
       }
    else{
       
        if(Task.flags!=0){
            return respone.returnData(req,res,403,{success:false,message:"this task is already approved"})
        }
        else{
            Models.task
            .update({
                 flags: 1,
               }, {
                 where: {
                  id:req.body.id            
                 }
                 
               })
               .then((approveTask)=>{
                  
                   return respone.returnData(req,res,200,{success: true,message:"task approved",approveTask});
               })  .catch(function (err) {
                return respons.returnData(req,res,500,{success:false,message:err.message})
            })        
}}})
    }};

//for supervisor to view his dependant tasks by get request
   exports.viewDependentTask = function (req,res){  
        
     
        Models.user.findAll({
        where:{
            supervisor_id:req.params.id
        }}).then(function(result) {
           //this array have all dependent id under this supervisor
            var arr = [];
            _.forEach(result, function(val, key) {
                arr.push(val.id)
                
            })
            
            Models.task
            .findAll({
            where:{
               user_id: arr
            },
            //to get user data from user model
            include:[{
                model:Models.user,
                          
            },
            {    //to get project data from project model
                model:Models.project,
                attributes:['name']
            }
        ],
            
        })

               
        
        .then(function(final) {
            
            //return data
            return respone.returnData(req,res,200,{success: true,message: "this is your dependant task",final});
        }).catch(function (err) {
            //catch error
            return respons.returnData(req,res,500,{success:false,message:err.message})
        })
    })
    

       
     
   }

