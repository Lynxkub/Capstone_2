"use strict";

const db = require('../db');
const { NotFoundError , BadRequestError } = require('../expressError');
const axios = require('axios');

// Recipe class for Recipe related functions


const BASE_API = 'https://www.themealdb.com/api/json/v1/1';
class Recipe {


    // static async findAll() {

    //     const results = await axios.get(`${BASE_API}`)
    // }


    // Searches api for a single recipe based on id

    // Returns all information about the recipe

    // Throws NotFoundError if the id is not one that exists in the api

    static async findOne(id) {


        const results = await axios.get(`${BASE_API}/lookup.php?i=${id}`)
        if(results.data.meals === null) throw new NotFoundError(`Invalid Id : ${id}`)

       
        return results.data.meals[0];

    }

    // Searches api for recipes based on the main ingredient user searches for

    // Returns all recipes where search ingredient is the main ingredient

    // Throws NotFoundError if no results are found on api

    static async searchByIngredient(ingredient) {
        const results = await axios.get(`${BASE_API}/filter.php?i=${ingredient}`);
        if(results.data.meals === null) throw new NotFoundError(`Invalid search term : ${ingredient}`);

        return results.data.meals;

    }



    // Searches api for all the different categories that a user can search  for a recipe by

    // User can select to search by either food type or food region

    // Returns all different categories


    static async filterByCategory(searchParam) {

        let apiSearchParam
        
        if(searchParam === 'area') {
            apiSearchParam = 'a'
        }else if(searchParam === 'category') {
            apiSearchParam = 'c'
        }else {
            throw new NotFoundError(`Invalid Search : ${searchParam}`);
        }
        const results = await axios.get(`${BASE_API}/list.php?${apiSearchParam}=list`)

        return results.data.meals;

    }

    // Searches api for all recipes based on either category or area

    // category can be either Category or Area

    // searchParam is either the name of the country or the type of food

    static async findAllRecipesByCategoryOrArea(category , searchParam) {
        let apiSearchParam;

        if(category === 'area') {
            apiSearchParam = 'a'
        }else if (category === 'category') {
            apiSearchParam = 'c'
        }else {
            throw new NotFoundError(`Invalid Search : ${category}`);
        }

        const results = await axios.get(`${BASE_API}/filter.php?${apiSearchParam}=${searchParam}`)
       
        return results.data.meals
    }

    
    // Searches api for a random recipe


    static async randomMeal() {

        const results = await axios.get(`${BASE_API}/random.php`);
        return results.data.meals;

    }


    // Save recipe as a 'liked' recipe for user

    static async saveMeal(username , mealId) {
        // initial check to make sure mealId is valid

        const validIdCheck = await this.findOne(mealId)
        if (!validIdCheck) {
            throw new NotFoundError(`${mealId} is not a valid meal ID`)
        }

        // user should not be able to save same recipe more than once. Initial query to see if this user already saved this recipe

        const initialCheck = await db.query(`
        SELECT username , api_id FROM saved_recipes
        WHERE username = '${username}' AND api_id = '${mealId}'`);

        if(initialCheck.rows[0]) throw new BadRequestError(`${username} has already saved this recipe`);

        const results = await db.query(`
        INSERT INTO saved_recipes (username , api_id)
        VALUES ($1 , $2)
        RETURNING username , api_id` , 
        [username , mealId]);
        return results.rows[0];

    }

    // removes a 'liked' recipe from users profile

    static async removeSavedMeal(username , mealId) {

        // initial check to see if meal is valid

        const validIdCheck = await this.findOne(mealId);
        if (!validIdCheck) {
            throw new NotFoundError(`${mealId} is not a valid meal ID`)
        }

        // user should not be able to remove a saved recipe if the recipe is not saved for them

        const initialCheck = await db.query(`
        SELECT username , api_id FROM saved_recipes
        WHERE username = '${username}' AND api_id = '${mealId}'`);

        if(!initialCheck.rows[0]) throw new BadRequestError(`${username} does not have ${mealId} saved to their profile`);

        const results = await db.query(`
        DELETE FROM saved_recipes WHERE username = '${username}' AND api_id = '${mealId}'`);

        return ({msg : 'deleted'})
    }

    // gets saved meal for a user

    static async getSavedMeal(username , mealId) {

        const results = await db.query(`SELECT * FROM saved_recipes WHERE username = $1 AND api_id = $2` , [username , mealId])
        if(results.rows[0]) {
            return results.rows[0];
        }else{
            return undefined
        }
    }

    static async getAllSavedMeals(username) {
        const results = await db.query(`SELECT * FROM saved_recipes WHERE username = $1` , [username]);
        return results.rows;
    }
}


module.exports = Recipe;