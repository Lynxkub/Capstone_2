"use strict";

const jsonschema = require('jsonschema');

const express = require('express');
const { BadRequestError } = require('../expressError');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens.js');
const userNewSchema = require('../schemas/newUser.json');
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


module.exports = router;