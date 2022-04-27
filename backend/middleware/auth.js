"use strict";

// Middleware to handle common types of auth cases in routes

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');

// Middleware to use when app needs to check if it is the correct user requesting their own user data

function ensureCorrectUser (req , res , next) {
    try{
        const user = req.body.username;
        
        console.log(user);
        if(!user || user !==req.params.username) {
            throw new UnauthorizedError();
        }
        return next();
    }catch(e){
        return next(e);
    }
}


module.exports = {
    ensureCorrectUser
}