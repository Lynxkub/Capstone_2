"use strict";

const Recipe = require('./recipe.js');
const { NotFoundError } = require('../expressError');
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
        console.log(recipe);
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