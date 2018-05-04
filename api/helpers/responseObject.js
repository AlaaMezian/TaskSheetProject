'use strict';
import app from '../../src/app';
import  http from 'http';
/* Ala'a Mezian 
this is a generic function that is focused on creating a response object which present a response generic format 
*/
export function customResponse(req, res, code, data) {
         res.status(code)
        return res.send(data)
};
