"use strict";

// Middleware to handle common types of auth cases in routes

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');

// Middleware to use when app needs to check if it is the correct user requesting their own user data

// this might crash later on when frontend is built. Need to make sure that username is being sent in the req.body

function ensureCorrectUser (req , res , next) {
    try{
        const user = res.locals.user;
        if(!(user &&(user.username === req.params.username))) {
            throw new UnauthorizedError();
        }
        return next();
    }catch(e){
        return next(e);
    }
}

// Middleware to check JWT on each request. 
// If token is valid and verified , store the token payload on res.locals



function authenticateJWT(req , res , next) {
    try{
        const authHeader = req.headers && req.headers.authorization;
        if(authHeader) {
            const token = authHeader.replace(/^[Bb]earer / , "").trim();
            res.locals.user = jwt.verify(token , SECRET_KEY);
        }
        return next();
    }catch(e) {
        return next();
    }
}


module.exports = {
    ensureCorrectUser,
    authenticateJWT
}