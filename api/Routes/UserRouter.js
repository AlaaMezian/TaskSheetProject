
'use strict'
// import  BaseRouter  from '../Bases/BaseRouter';
import customeResponse from '../helpers/responseObject';
import TestUser from '../Controllers/TestUser';
import express from 'express';
import Router from 'express';
import app from '../../src/app';
 
 var userRouter = express.Router();    
 var user = new TestUser();
    userRouter.post('/test', (req, res,next) => {
        console.log(4444444444)
        user.getUser.then((users) => {
            if (users) {
                return customeResponse(req, res, 200, users)
            }
        }).catch((error) =>{
            return customeResponse(req, res, error.code, error.message)
        })
    next();
    })
app.use('user', userRouter);
