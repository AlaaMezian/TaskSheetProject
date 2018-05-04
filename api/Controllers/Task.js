'use strict';
//to active account 
var Models = require('../../models/');
var project=Models.project;
var respone =require('../helpers/responseObject');
var exports = module.exports = {}
    //create a new task by post request "must fill all required field"
    exports.createTask= function(req,res){
    if (!req.body.Date || !req.body.details || !req.body.user_id ||!req.body.start_time ||!req.body.end_time ) {
       return respone.returnData(req,res,404,{success : false, message:"please fill required field"})
    }
    else{
           
    var newtask = {
        user_id:req.body.user_id,
        Date: req.body.Date,
        details: req.body.details,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        project_id:req.body.project_id
        
    };
    return Models.task.create(newtask).then(function () {
        respone.returnData(req,res,200,{success:true,message:"task has been created successfully",newtask})
    }).catch(function (err) {
        return respone.returnData(req,res,500,{success:false,message:err.message})
    })
}
},
//make the user review his own task by get request
     exports.reviewOwnTask = function(req,res){
         Models.task.findOne({where:{user_id:req.params.id}}).then(function(user){
             if(!user){
                 return respone.returnData(req,res,404,{success:false,message:"you dont have any task"})
             }else{
         
          Models.task
          .findAll({
              where:{
                user_id:req.params.id,
               // Date:req.params.Date
              }})
              .then((userstask)=>{
                  return respone.returnData(req,res,200,{success: true,message:"this is your task",userstask})
              }).catch(function(err){
                  return respone.returnData(req,res,500,{success:false,message:message.err})
              })
            }})
},
//for get all task date for front end to get tasks by date for search thing
     exports.getDate=function(){
         Models.task
         .findAll({
         attributes:['Date'],
         where:{
             user_id:req.params.id
         }
         })
         .then((getdate)=>{
            return respone.returnData(req.res,200,{success:true,message:"this all dates in tasks",getdate})
         }).catch(function(err){
            return respone.returnData(req,res,500,{success:true,message:message.err})
        })
     },
     //allow user to update the task if its not approved by post request
     exports.updateTask=function(req,res) {
       Models.task.findOne({
            attributes:['flags'],
            where:{
                 id:req.body.id,
            }
            })
            .then((w)=>{
                //suppose to remake the db to update task or 
                //at next line if(w.flags!=null)
            if(w.flags!=0){
                respone.returnData(req,res,403,{status:false,message:"sorry this task already approved"})
            }
            else{
                Models.task.update({
                   details:req.params.details,
                   start_time:req.params.start_time,
                   end_time:req.params.end_time,
                   Date:req.params.Date,
                },{
                    where:{
                        id:req.body.id
                    }
                }
                )
                .then((updatetask)=>{
                   return respone.returnData(req,res,200,{status:true,message:"task has been updated",updatetask})
                })
                .catch(function (err) {
                    return respone.returnData(req,res,500,{success:true,message:message.err})
            })}})}
     
     //delete the task by post request
     exports.deleteTask=function(req,res){
         Models.task.findOne({where:{id:req.params.id}})
         .then((tasky)=>{
        if(!tasky){
            return respone.returnData(req,res,400,{status:true,message:"there are no such task"})}
            else{
         Models.task.findOne({
             attributes:['flags'],
             where:{
               id:req.params.id
             }
         }).then((sooo)=>{
        
       
//remake the db if u want to delete a task or in next line
//if(sooo.flags!=null)
             if(sooo.flags!=0){
                 return respone.returnData(req,res,203,{status:false,message:"sorry this task is approved u cant delete it"})
             }
             else{
        Models.task.destroy({
            where:{
                id:req.params.id
            }

        })
        .then((deleteTask)=>{
            return respone.returnData(req,res,200,{status:true,message:"task has been deleted",deleteTask})
        }).catch(function (err) {
            return respone.returnData(req,res,500,{success:true,message:message.err})})
    }
})}})
     }
     exports.getAllProject=function(req,res){
        
        Models.project.findAll({
            where:{
                flags:1
            }
         })
         .then((getAllProject)=>{
             return respone.returnData(req,res,200,{status:true,message:"plz choose one of those project that u work on it",getAllProject})
         }).catch(function (err) {
            return respone.returnData(req,res,500,{success:true,message:message.err})})
     }

