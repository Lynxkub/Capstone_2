"use strict";

const express = require('express');
const { BadRequestError } = require('../expressError');
const Recipe = require('../models/recipe');
const {ensureCorrectUser} = require('../middleware/auth.js')

const router = express.Router();

// GET /find/:id => { recipe }

// Returns { recipe data }   Can update and filter out specfic data once frontend is created

// Authorization required : None

router.get('/find/:id' , async function (req , res , next) {
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

// GET /random => { randomMeal }

// Returns { randomMeal }

// Authrorization required : none

router.get('/random' , async function (req , res , next) {
    try{
        const results = await Recipe.randomMeal();
        return res.json({ results })
    }catch(e) {
        return next(e);
    }
})


// GET /find/main/:ingredient => { List of meals }

// Returns  { List of meals that match main ingredient search }

// Authroization required : none

router.get('/find/main/:ingredient' , async function (req , res , next) {
    try{
        const results = await Recipe.searchByIngredient(req.params.ingredient);
        return res.json({ results })
    }catch (e) {
        return next(e);
    }
})

// Post /save/:username/:mealId => { Saved Meal }

// Returns { Username , Saved Meal ID }

// Authrorization required : ensureCorrectUser


router.post('/save/:username/:mealId' , ensureCorrectUser , async function (req , res , next) {
    try{ 
        const results = await Recipe.saveMeal(req.params.username , req.params.mealId);
        return res.json({ results });
    }catch(e){
        return next(e);
    }
})


// DELETE /delete/:username/:mealId => { Saved Meal }

// Returns { msg : 'deleted' }

// Authrorization required : ensureCorrectUser

router.delete('/delete/:username/:mealId' , ensureCorrectUser , async function (req , res , next) {
    try {
        const results = await Recipe.removeSavedMeal(req.params.username , req.params.mealId);
        return res.json({ results });
    }catch (e) {
        return next(e);
    }
})

module.exports = router;