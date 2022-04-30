"use strict";

const request = require('supertest');

const db = require('../db');
const app = require('../app');
const User = require('../models/user');

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


// Get /:username

describe('GET /:username' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .get('/users/testUser1')
        .set("authorization" , `Bearer ${user1Token}`)
        expect(resp.body).toEqual({
            user : {
                username : "testUser1",
                first_name : "firstName1",
                last_name : "lastName1",
                email : "one@one.com"
            }
        })
    })
})


// PATCH /:username

describe('PATCH /:username' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .patch('/users/testUser1')
        .set("authorization" , `Bearer ${user1Token}`)
        .send({
            username : 'newUser',
            password : 'password1',
            first_name : 'firstName1',
            last_name : 'last_name1',
            email : 'one@one.com'
        })
        expect(resp.body).toEqual({
            user : {
            username : 'newUser',
            first_name : 'firstName1',
            last_name : 'last_name1',
            email : 'one@one.com'
            }
        })
    })

    test('does not work for an invalid user' , async function () {
        try {
            const resp = await request(app)
            .patch('/users/fakeUser')
            .set("authroization" , `Bearer ${user1Token}`)
            .send({
                username : 'newUser',
                password : 'password1',
                first_name : 'firstName1',
                last_name : 'last_name1',
                email : 'one@one.com'
            })
        }catch(e) {
            expect(e instanceof BadReqeustError).toBeTruthy();
        }
    })

    test('requires all user data to be passed' , async function () {
        try {
            const resp = await request(app)
            .patch('/users/testUser1')
            .set("authorization" , `Bearer ${user1Token}`)
            .send({
                username : 'newUser',
                password : 'password1',
            })
        }catch (e) {
            expect(e instanceof BadReqeustError).toBeTruthy();
        }
    })
})


// DELETE /:username

describe('DELETE /:username' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .delete('/users/testUser1')
        .set("authorization" , `Bearer ${user1Token}`)
        expect(resp.body).toEqual({
            user : {
            msg : 'deleted'
            }
        })

        // Query the database to see if the user we just deleted exists
        try{
        const dbCheck = await request(app)
        .get('/users/testUser1')
        .set("authroization" , `Bearer ${user1Token}`)
        }catch(e) {
            expect(e instanceof BadReqeustError).toBeTruthy();
        }
    })

    test('does not work when username does not exist' , async function () {
        try{
            const resp = await request(app)
            .delete('/users/fakeUser')
            .set("authroization" , `Bearer ${user1Token}`)
        }catch(e) {
            expect(e instanceof BadReqeustError).toBeTruthy();
        }
        // Query the database to see if the user we just tried to delete still exists
        const dbCheck = await request(app)
        .get('/users/testUser1')
        .set("authorization" , `Bearer ${user1Token}`);
        expect(dbCheck.body).toEqual({
            user : {
                username : "testUser1",
                first_name : "firstName1",
                last_name : "lastName1",
                email : "one@one.com"
            }  
        })
    })
})