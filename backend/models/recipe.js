"use strict";

const db = require('../db');
const { NotFoundError } = require('../expressError');
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


    static async searchByIngredient(ingredient) {


    }


    static async listAllCategories() {
    
    }


    static async listAllAreas() {


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

    static async filterByArea(area) {


    }

    static async randomMeal() {


    }


    static async saveMeal(id) {


    }

    static async removeSavedMeal(id) {


    }
}


module.exports = Recipe;