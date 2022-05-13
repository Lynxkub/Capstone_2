"use strict";

const Comment = require('./comment.js');
const { NotFoundError , BadRequestError } = require('../expressError');
const db = require('../db.js');

const {helperAfterAll , helperAfterEach , helperBeforeAll , helperBeforeEach} = require('./_testHelpers');


beforeAll(helperBeforeAll);
beforeEach(helperBeforeEach);
afterEach(helperAfterEach);
afterAll(helperAfterAll);


// add comment

describe('adds a comment to a meal' , function () {
    test('works' , async function () {
        let resp = await Comment.makeComment(52772 , 'This recipe is amazing' , 'user1');
        expect(resp).toEqual({
            username : 'user1',
            api_id : 52772,
            comment : 'This recipe is amazing',
            date_posted : expect.any(Date)
        })
    })

    test('throws error if comment does not have any information' , async function () {
        try{
            let resp = await Comment.makeComment(52772 , '' , 'user1');
        }catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    })
})


describe('deletes a comment' , function () {
    test('works' , async function () {
        let resp = await Comment.deleteComment(1);
        expect(resp).toEqual({
            msg : 'deleted'
        })

        // query DB to make sure comment is deleted

        let dbQuery = await db.query(`SELECT * FROM comments WHERE id = 1`);

        expect(dbQuery.rows[0]).toBeFalsy();
    })

    test('cannot delete a comment that does not exist' , async function () {
        try{
            let resp = await Comment.deleteComment(5);
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})

describe('edits a comment' , function () {
    test('works' , async function () {
        const resp = await Comment.editComment(1 , 'testing if this works');

        expect(resp).toEqual({
            username : 'user1' ,
            api_id : 52804 , 
            comment : 'testing if this works',
            date_posted : expect.any(Date),
            is_edited : true
        })
    })
    test('throws error if comment id does not exits' , async function () {
        try {
            const resp = await Comment.editComment(5 , 'bad request');
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})

describe('gets all comments made by a user' , function () {
    test('works' , async function () {
        const resp = await Comment.getAllUserComments('user1');

        expect(resp.length).toBe(2);
    })

    test('does not work if username is not valid' , async function () {
        try{
            const resp = await Comment.getAllUserComments('fakeUser');
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy()
        }
    })
})

describe('allows a user to comment on a comment' , function () {
    test('works' , async function() {
        const resp = await Comment.commentOnComment('this is a comment on a comment' , 1 , 'user1' , 52963);
        expect(resp).toEqual({
            username : 'user1' ,
            api_id : 52963,
            comment : 'this is a comment on a comment',
            date_posted : expect.any(Date),
            comment_commented_on : 1
        })
    })

    test('throws BadRequestError error if comment has no content' , async function () {
        try{
        const resp = await Comment.commentOnComment('' , 1 , 'user1' , 52963);
        }catch(e) {
            expect(e instanceof BadRequestError).toBeTruthy();
        }
    })

    test('throws NotFoundError if origional comment does not exist' , async function () {
        try{
            const resp = await Comment.commentOnComment('bad request' , 5 , 'user1' , 52963)
        }catch(e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})