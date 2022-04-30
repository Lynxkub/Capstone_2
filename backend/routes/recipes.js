"use strict";

const express = require('express');
const { BadRequestError } = require('../expressError');
const Recipe = require('../models/recipe');


const router = express.Router();

// GET /:id => { recipe }

// Returns { recipe data }   Can update and filter out specfic data once frontend is created

// Authorization required : None

router.get('/:id' , async function (req , res , next) {
    try{
       
    const results = await Recipe.findOne(req.params.id);
    return res.json({ results })
    }catch(e) {
        return next(e);
    }

})

// GET /:searchCat => { List of choices to find recipes by }

// Returns { List of categories of recipes } || { List of region specific recipes }

// Authroization required : none


router.get('/filter/:searchCat' , async function (req , res , next) {
    try{ 
        const results = await Recipe.filterByCategory(req.params.searchCat);
        return res.json({ results });
    }catch(e) {
        return next(e);
    }
})

module.exports = router;