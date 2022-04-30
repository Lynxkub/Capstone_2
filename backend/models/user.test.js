"use strict";

const User = require('./user.js');
const { NotFoundError , BadRequestError , UnauthorizedError } = require('../expressError');
const db = require('../db.js');

const {helperAfterAll , helperAfterEach , helperBeforeAll , helperBeforeEach} = require('./_testHelpers');



beforeAll(helperBeforeAll);
beforeEach(helperBeforeEach);
afterEach(helperAfterEach);
afterAll(helperAfterAll);



//  register

describe('register' , function() {
    const newUser = {
        username: 'newUser',
        first_name : 'newFirst' ,
        last_name : 'newLast',
        email : 'new@new.com'
    };

    const alreadyExistingUser = {
        username : 'user1',
        first_name : 'new1' ,
        last_name : 'new1' ,
        email : 'new@new.com'
    }

    test('registers a new user' , async function() {
        let user = await User.register({...newUser , password: 'password'})
        expect(user).toEqual(newUser);
        const results = await db.query("SELECT * FROM users WHERE username = 'newUser'");
        // console.log(results.rows[2]);
        expect(results.rows.length).toEqual(1);
    })

    test('throws BadRequestError if username already exists' , async function () {
        try{
        await User.register({...alreadyExistingUser , password : 'password'});
        }catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
        
    })
})

// authenticate

describe('authenticate' , function() {
    
    test('user successfully authenticates' , async function () {
        let user = await User.authenticate('user1' , 'password1');
        expect(user).toEqual({
            username : 'user1',
            first_name : 'user1First',
            last_name : 'user1Last',
            email : 'user1@email.com'
        });
    })

    test('no authentication for incorrect password' , async function () {
        try{
        let user = await User.authenticate('user1' , 'fakePassword');
        }catch (e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        }
    })

    test('no authentication for non-existant user' , async function () {
        try{
            let user = await User.authenticate('fakeUser' , 'fakePassword');
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        }
    })
})


// get
 
describe('get username' , function () {
    test('gets correct user' , async function () {
        let user = await User.get('user1');
        expect(user).toEqual({
            username : 'user1',
            first_name : 'user1First',
            last_name : 'user1Last',
            email : 'user1@email.com'
        })
    })

    test('return unauthorized error when user does not exist' , async function () {
        try{
            await User.get('fakeUser');
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        }
    })
})

// update

describe('update username' , function () {
    test('updates correct user' , async function () {
        let user = await User.update('user1' , {username : "newUserName" , password : 'password1' , first_name : 'user1First' , last_name : 'user1Last' , email : 'user1@email.com'});
        expect(user).toEqual({
            username : 'newUserName',
            first_name : 'user1First' , 
            last_name : 'user1Last' , 
            email : 'user1@email.com'
        })
    })

    test('does not update with incorrect password' , async function () {
        try{
            let user = await User.update('user1' , {username : 'newUserName' , password : 'wrongPassword' , first_name : 'user1First' , last_name : 'user1Last' , email : 'user1@email.com'});
        }catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    })

    test('does not update if user does not exist' , async function () {
        try{
            let user = await User.update('fakeUser' , {username : 'newUserName' , password : 'password1' , first_name : 'user1First' , last_name : 'user1Last' , email : 'user1@email.com'});
        }catch (e){
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    })

    test('cannot change username to one that is already being used' , async function () {
        try{
            let user = await User.update('user1' , {username : 'user2' , password : 'password1' , first_name : 'user1First' , last_name : 'user1Last' , email : 'user1@email.com'});
        }catch(e){
            expect(e instanceof BadRequestError).toBeTruthy();

        }
    })
})


// delete

describe('delete username' , function () {
    test('deletes user correctly' , async function () {
        let user = await User.delete('user1');
        expect(user).toEqual({msg : 'deleted'})

        try{
            let dbCheck = await User.get('user1');
            console.log(dbCheck)
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        }
    })

    test('cannot delete user if user does not exist' , async function () {
        try{
        let user = await User.delete('fakeUser');
        }catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    })
})