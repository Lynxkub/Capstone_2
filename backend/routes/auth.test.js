"use strict";

const request = require('supertest');

const app = require('../app');
const db = require('../db');


const { helpersBeforeAll , helpersAfterAll , helpersBeforeEach, helpersAfterEach} = require('./_testHelpers');

beforeAll(helpersBeforeAll);
beforeEach(helpersBeforeEach);
afterEach(helpersAfterEach);
afterAll(helpersAfterAll);

// POST auth/token

describe('POST /auth/token' , function() {
    test('works' , async function () {
        const resp = await request(app).post("/auth/token")
        .send({ 
            username : 'testUser1',
            password : "password1"});
   

    expect(resp.body).toEqual({
        "token" : expect.any(String)
    })
})

test('no auth works for non-existant user' , async function () {
    const resp = await request(app).post('/auth/token')
    .send({
        username : 'fakeUser' ,
        password: 'fakePassword'
    })
    expect (resp.statusCode).toBe(401)
})

test('no auth for incorrect password' , async function () {
    const resp = await request(app).post('/auth/token')
    .send({
        username : 'testUser1',
        password : 'wrongPassword'  
    })
    expect(resp.statusCode).toBe(401);
})

test('no auth for incorrect username' , async function () {
    const resp = await request(app).post('/auth/token')
    .send({
        username : 'wrongUser1',
        password : 'password1'
    })
    expect(resp.statusCode).toBe(401);
})
})


// POST auth/register

describe('POST /auth/register' , function () {
    test('works' , async function () {
        const resp = await request(app).post('/auth/register')
        .send({
            username: 'newUser',
            password: 'newPassword',
            first_name : 'newFirst',
            last_name : 'newLast',
            email : 'new@new.com'
        })
        expect(resp.body).toEqual({
            "token" : expect.any(String)
        })

        // Query database to see if the user exists in it
        
        const user = await db.query(`SELECT * FROM users WHERE username = 'newUser'`)
        expect(user.rows.length).toEqual(1);
    })

    test('returns error when missing data' , async function () {
        const resp = await request(app).post('/auth/register')
        .send({
            username: "newUser",
            password: 'newPassword',
            last_name : 'newLast',
            email : 'new@new.com'
        })
        expect(resp.statusCode).toBe(400);
    })
})
