"use strict";

const jsonschema = require('jsonschema');

const User = require('../models/user');
const express = require('express');
const router = new express.Router();
const { createToken } = require('../helpers/tokens');
const { BadRequestError , UnauthorizedError } = require('../expressError');
const newUserSchema = require('../schemas/newUser.json');
const userAuthSchema = require('../schemas/userAuth.json');


// POST /auth/register : { user } => { token }

// user must include { username , password , firstName , lastName , email}

// Returns JWT token to be used for further authentication requests


router.post('/register' , async function (req , res , next ) {
    try{
        const validator = jsonschema.validate(req.body , newUserSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({...req.body});
        const token = createToken(newUser);
        return res.status(201).json({ token });
    }catch (e) {
        return next(e);
    }
})


// POST /auth/token : { username , password } => { token }

// Returns JWT token which can be used for further authentication requests


router.post('/token' , async function (req , res , next ) {
    try {
        const validator = jsonschema.validate(req.body ,userAuthSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new UnauthorizedError(errs);
        }

        const { username , password } = req.body;
        const user = await User.authenticate(username , password);
        const token = createToken(user);
        return res.json({ token });
    }catch (e) {
        return next(e);
    }
})

module.exports = router;