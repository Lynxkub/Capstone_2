"use strict";

const Recipe = require('./recipe.js');
const { NotFoundError, BadRequestError } = require('../expressError');
const db = require('../db.js');

const {helperAfterAll , helperAfterEach , helperBeforeAll , helperBeforeEach} = require('./_testHelpers');


beforeAll(helperBeforeAll);
beforeEach(helperBeforeEach);
afterEach(helperAfterEach);
afterAll(helperAfterAll);


// find one

describe('find one recipe by id' , function () {
    test('find one find the specific recipe based on id' , async function () {
        let recipe = await Recipe.findOne(52772);
        expect(recipe.idMeal).toEqual("52772");
        expect(recipe.strMeal).toEqual('Teriyaki Chicken Casserole');
    })

    test('throws NotFoundError if id is invalid' , async function () {
        try{
            let recipe = await Recipe.findOne(2);
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})

// filter recipes by different categories

describe('fiter recipes by category' , function () {
    test('filters recipes by area' , async function () {
        const recipe = await Recipe.filterByCategory('area');
        expect(recipe[0].strArea).toBe("American");
    })

    test('filters recipes by category' , async function () {
        const recipe = await Recipe.filterByCategory('category');
        expect(recipe[0].strCategory).toBe('Beef');
    })

    test('returns error when something other than "area" or "category" are searched for' , async function () {
        try {
            const recipe = await Recipe.filterByCategory('fakeSearch');
        }catch (e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})


// finds a random meal

describe('find random meal' , function () {
    test('finds random meal' , async function () {
        const recipe1 = await Recipe.randomMeal();
        expect(recipe1.length).toBe(1);
    })
})


// find meals based on main ingredient search

describe('finds recipes based on main ingredient' , function () {
    test('works' , async function () {
        const results = await Recipe.searchByIngredient('chicken breast');
        expect(results.length).toBe(9);
    })

    test('throws error if no results are found' , async function () {
        try{
        const results = await Recipe.searchByIngredient('fake search');
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })

})


// allows a user to save a meal as a favorite

describe('saves a recipe for user to visit later' , function () {
    test('works' , async function () {
        const results = await Recipe.saveMeal('user1' , 52933)
        expect(results).toEqual({
                username : 'user1' ,
                api_id : 52933
        })

        // query the db to make sure the data was entered correctly

        const dbQuery =  await db.query(`SELECT username , api_id FROM saved_recipes WHERE username = 'user1' AND api_id = '52933'`)

        expect(dbQuery.rows[0]).toEqual({
            username : 'user1',
            api_id : 52933
        })
    })

    test('user should not be able to save the same receipe twice' , async function () {
        try{
            const results1 = await Recipe.saveMeal('user1' , 52933);
            const results2 = await Recipe.saveMeal('user1' , 52933);
        }catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }    
})

    test('user should not be able to save an invalid id' , async function () {
        try{
            const results = await Recipe.saveMeal('user1' , 1);
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})

// allows user to delete a saved recipe

describe('user can delete a saved recipe and remove it from their profile' , function () {
    test('works' , async function () {
        const results = await Recipe.removeSavedMeal('user1' , 52804);
        expect(results).toEqual({
            msg : 'deleted'
        })
        // query the DB to make sure the data got removed properly

        const dbquery = await db.query(`SELECT username , api_id FROM saved_recipes WHERE username = 'user1'  AND api_id = 52804`)
        expect(dbquery.rows[0]).toBeFalsy();
    })

    test('does not delete if recipe id is invalid' , async function () {
        try {
            const results = await Recipe.removeSavedMeal('user1' , 1);
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }

        // query DB to make sure that the data is still in there

        const dbquery = await db.query(`SELECT username , api_id FROM saved_recipes WHERE username = 'user1' AND api_id = 52804`);
        expect(dbquery.rows[0]).toEqual({
            username : 'user1',
            api_id : 52804
        })
    })
})