"use strict";

const request = require('supertest');

const db = require('../db');
const app = require('../app');
const { NotFoundError } = require('../expressError');
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
        .get('/recipes/52772')
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