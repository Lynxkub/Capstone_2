"use strict";

const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');
const jwt = require('jsonwebtoken');
const { ensureCorrectUser , authenticateJWT } = require('./auth');


const testJWT = jwt.sign({username : 'test'} , SECRET_KEY);
const badJWT = jwt.sign({username : 'test'} , 'wrong')


describe('ensureCorectUser' , function () {
    test('works' , function () {
        
        const req = {params : { username : "test"}}
        const res = {locals : { user : {username : 'test'}}}
        const next = function (e) {
            expect(e).toBeFalsy();
        }
        ensureCorrectUser(req , res , next);
    })

    test('does not work with the wrong user' , function () {
        const req = {params : {username : "test"}}
        const res = {locals : { user : {username : 'wrongUser'}}};
        const next = function (e) {
            expect(e).toBeTruthy();
        }
        ensureCorrectUser(req , res , next);
    })

    test('does not work with missing res.locals data' , function () {
        const req = {params : {username : 'test'}};
        const res = '';
        const next = function (e) {
            expect(e).toBeTruthy();
        }
        ensureCorrectUser(req , res , next);
    })
})


describe('authenticateJWT' , function () {
    test('works with data in header' , function () {
        const req = {headers : {authorization : `Bearer ${testJWT}`}};
        const res = {locals : {}};
        const next = function(e) {
            expect(e).toBeFalsy();
        };
        authenticateJWT(req , res , next) 
            expect(res.locals).toEqual({
                user : {
                    iat : expect.any(Number),
                    username : 'test'
                }
            })
        
    })

    test('works with invalid data' , function () {
        const req = {headers : {authorization : `Bearer ${badJWT}`}};
        const res = {locals : {}};
        const next = function (e) {
            expect(e).toBeFalsy();
        }
        authenticateJWT(req , res , next);
        expect(res.locals).toEqual({});
    })
})