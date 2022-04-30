"use strict";

const jsonschema = require('jsonschema');

const express = require('express');
const { BadRequestError } = require('../expressError');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens.js');
const userNewSchema = require('../schemas/newUser.json');
const updateUserSchema = require('../schemas/userUpdate.json');
const { ensureCorrectUser } = require('../middleware/auth');

const router = express.Router();

// GET /username => { user }

// Returns { username , first_name , last_name , email };

// Authroization required : ensureCorrectUser

router.get('/:username' , ensureCorrectUser,  async function (req , res , next) {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    }catch(e) {
        return next(e);
    }
})


// PATCH /username => { user }

// Returns { username , first_name , last_name , email }

// Route requires all user data to be passed in order to go update successfully. 

// Authroization required : ensureCorrectUser


// NOTE FOR JAKE
// if user updates their information, they will need to get a new token. Need to redirect to /auth/token and store that token in the headers in order to make the transition seamless


router.patch('/:username' , ensureCorrectUser , async function (req , res , next ) {
    try {
        const validator = jsonschema.validate(req.body , updateUserSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
    
        const user = await User.update(req.params.username , req.body);
        return res.json({ user })
        
    }catch (e) {
        return next(e);
    }
})


// DELETE /username => { user }

// Returns  { msg : 'deleted' }

// Authroization required : ensureCorrectUser

router.delete('/:username' , ensureCorrectUser , async function (req , res , next) {
    const user = await User.delete(req.params.username);
    if(!user) throw new BadRequestError(`Username ${req.params.username} does not exist`)

    return res.json({user})
})
 

module.exports = router;