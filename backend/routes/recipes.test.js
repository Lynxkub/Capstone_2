"use strict";

const request = require('supertest');

const db = require('../db');
const app = require('../app');
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../expressError');
const {
    helpersAfterAll,
    helpersAfterEach,
    helpersBeforeAll,
    helpersBeforeEach,
    user1Token,
    user2Token,
    user3Token
} = require('./_testHelpers');


beforeAll(helpersBeforeAll);
beforeEach(helpersBeforeEach);
afterEach(helpersAfterEach);
afterAll(helpersAfterAll);


// GET /:id

describe('GET /:id' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .get('/recipes/find/52772')
        expect(resp.body.results.idMeal).toEqual("52772");
        expect(resp.body.results.strMeal).toEqual("Teriyaki Chicken Casserole");
    })

    test('returns NotFoundError with invalid id' , async function () {
        try{
            const resp = await request(app)
            .get('/recipes/5')
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})


// GET /:searchCat

describe('GET /:searchCat' , function () {
    test('works when searchCat === area' , async function () {
        const resp = await request(app)
        .get('/recipes/filter/area');
        expect(resp.body.results.length).toBe(27);
    })

    test('works when searchCat === category' , async function () {
        const resp = await request(app)
        .get('/recipes/filter/category');
        expect(resp.body.results.length).toBe(14);
    })

    test('throws NotFoundError when searchCat invalid' , async function () {
        try{
            const resp = await request(app)
            .get('/recipes/filter/fake');
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})



// GET /random

describe('GET /random' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .get('/recipes/random');
        expect(resp.body.results.length).toBe(1);
    })
})


// GET /find/ingredient/:ingredient

describe('GET /find/main/:ingredient', function () {
    test('works' , async function () {
        const resp = await request(app)
        .get('/recipes/find/main/chicken');
        expect(resp.body.results.length).toBe(11);
    })

    test('throws error if no results found' , async function () {
        try{
            const resp = await request(app)
            .get('/recipes/find/main/fake');
        }catch(e){
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
}
)

// POST /save/:username/:mealId 

describe('POST /save/:username/:mealId' , function () {
    test('works' , async function (){
        const resp = await request(app)
        .post('/recipes/save/testUser1/52772')
        .set('authorization' , user1Token);
        expect(resp.body.results).toEqual({
            username : 'testUser1',
            api_id : 52772
        })
    })

    test('does not allow a non logged in user to save a recipe' , async function () {
        try{
        const resp = await request(app)
        .post('/recipes/save/testUser1/52772')
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        }
    })
})


// DELETE /delete/:username/:mealId

describe('DELETE /delete/:username/:mealId' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .delete('/recipes/delete/testUser1/52804')
        .set('authorization' , user1Token);
        expect(resp.body.results).toEqual({
            msg : 'deleted'
        })
    })

    test('throws error if mealId is invalid' , async function () {
        try{
            const resp = await request(app)
            .delete('/recipes/delete/testUser1/1')
            .set('authorization' , user1Token);
        }catch(e){
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    })

    test('throws error if user is not logged in' , async function () {
        try{
            const resp = await request(app)
            .delete('/recipes/delete/testUser1/52804');
        }catch(e) {
            expect(e instanceof UnauthorizedError).tobeTruthy();
        }
    })
})


// GET /search/:category/:choice

describe('GET /search/:category/:choice' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .get('/recipes/search/area/American')

        expect(resp.body.results.length).toBe(32);
    })

    test('throws error if invalid category search' , async function () {
        try{
            const resp = await request(app)
            .get('/recipes/search/fake/American')
        }catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy()
        }
    })
})


// GET /liked/:username/:mealId

describe('GET /liked/:username/:mealId' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .get('/recipes/liked/testUser1/52804')
        .set('authrorization' , user1Token);

        expect(resp.body.results).toEqual({
            id : 1,
            username : 'testUser1',
            api_id : 52804
        })
    })

    test('send undefined if user has not liked the recipe' , async function () {
        const resp = await request(app)
        .get('/recipes/liked/testUser1/11111')
        .set('authorization' , user1Token);

        expect(resp.body.resutls).toBe(undefined);
    })

    test('throws error if user is not logged in' , async function () {
        try{
            const resp = await request(app)
        .get('/recipes/liked/testUser1/52804')
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        }
        

    
    })
})

// GET /:username/likedrecipes

describe('/:username/likedrecipes' , function () {
    test('works' , async function () {
        const res = await request(app)
        .get('/recipes/testUser1/likedrecipes')
        .set('authorization' , user1Token);

        expect(res.body.results.length).toBe(1)
    })
})