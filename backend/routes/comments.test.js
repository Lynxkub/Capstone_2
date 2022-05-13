"use strict";

const request = require('supertest');

const db = require('../db');
const app = require('../app');
const Comment = require('../models/comment');


const {
    helpersAfterAll,
    helpersAfterEach,
    helpersBeforeAll,
    helpersBeforeEach,
    user1Token,
    user2Token,
    user3Token
} = require('./_testHelpers');
const { UnauthorizedError } = require('../expressError');




beforeAll(helpersBeforeAll);
beforeEach(helpersBeforeEach);
afterEach(helpersAfterEach);
afterAll(helpersAfterAll);



// GET /:username/all

describe('GET /:username/all' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .get('/comments/testUser1/all')
        .set('authorization' , user1Token);
        const respjson = JSON.parse(resp.text)
        expect(respjson.results.length).toBe(2)
    })

    test('throws error if user is not logged in' , async function () {
        try{
            const resp = await request(app)
            .get('/comments/testUser1/all')
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        }
    })
})

// POST /:username/:mealId/postcomment

describe('POST /:username/:mealId/postcomment' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .post('/comments/testUser1/52963/postcomment')
        .set('authorization' , user1Token)
        .send({
            comment : 'test comment'
        })
        expect(resp.body.results).toEqual({
            username : 'testUser1' ,
            api_id : 52963,
            comment : 'test comment',
            date_posted : expect.any(String)
        })

        // query DB to make sure the comment exists

        const dbQuery = await db.query(`SELECT * FROM comments WHERE username = 'testUser1' AND api_id = 52963`);

        expect(dbQuery.rows[0]).toEqual({
            username : 'testUser1' ,
            api_id : 52963,
            comment : 'test comment',
            date_posted : expect.any(Date),
            is_edited : false,
            id : 5,
            comment_commented_on : null
        })
    })

    test('does not post comment if user is not logged in' , async function () {
        try{
        const resp = await request(app)
        .post('/comments/testUser1/52963/postcomment')
        .send({
            comment : 'test comment'
        })
    }catch(e) {
        expect(e instanceof UnauthorizedError).toBeTruthy();
    }
    })

})

// DELETE /delete/:username/:commentId

describe('DELETE /delete/:username/:commentId' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .delete('/comments/delete/testUser1/1')
        .set('authorization' , user1Token);
        expect(resp.body.results).toEqual({
            msg : 'deleted'
        })

        // query DB to make sure comment got deleted

        const dbQuery = await db.query(`SELECT * FROM comments WHERE id = 1`);
        expect(dbQuery.rows[0]).toBeFalsy();
    })

    test('does not delete if user is not logged in' , async function () {
        try{
            const resp = await request(app)
            .delete('/comments/delete/testUser1/1')
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();
        

        // query DB to make sure comment still exists

        const dbQuery = await db.query(`SElECT username , id , comment FROM comments WHERE id = 1 AND username = 'testUser1 AND comment = 'test comment'`);
        expect(dbQuery.rows[0]).toEqual({
            username : 'testUser1',
            id : 1,
            comment : 'test comment'
        })
    }
    })
})


// PATCH /edit/:username/:commentId
describe('/edit/:username/:commentId' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .patch('/comments/edit/testUser1/1')
        .set('authorization' , user1Token)
        .send({
            comment : 'this is an edited comment'
        })
        expect(resp.body.results).toEqual({
            username : 'testUser1',
            api_id : 52804,
            comment : 'this is an edited comment',
            date_posted : expect.any(String),
            is_edited : true
        })

        // query DB to see if comment was edited

        const dbQuery = await db.query(`SELECT comment , is_edited FROM comments WHERE id = 1`)
        expect(dbQuery.rows[0]).toEqual({
            comment : 'this is an edited comment',
            is_edited : true
        })
    })

    test('does not allow update if user is not logged in' , async function () {
        try {
            const resp = await request(app)
            .patch('/comments/edit/testUser1/1')
            .send({
                comment : 'this is an edited comment'
            })
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();

            // query DB to make sure comment is unchanged

            const dbQuery = await db.query(`SELECT comment , is_edited FROM comments WHERE id = 1`)

            expect(dbQuery.rows[0]).toEqual({
                comment : 'test comment',
                is_edited : false
            })
        }
    })
})



// POST /:mealId/:username/:commentId/commentoncomment

describe('/:mealId/:username/:commentId/commentoncomment' , function () {
    test('works' , async function () {
        const resp = await request(app)
        .post('/comments/52804/testUser1/1/commentoncomment')
        .set('authorization' , user1Token)
        .send({
            comment : 'this is a comment on a comment'
        })
        console.log(resp.body.results)
        expect(resp.body).toEqual({
           results : {
            username : 'testUser1',
            api_id : 52804,
            comment : 'this is a comment on a comment',
            date_posted : expect.any(String),
            comment_commented_on : 1
           }
        })

        // query DB to make sure that the new comment exists

        const dbQuery = await db.query(`SELECT comment FROM comments WHERE comment_commented_on = 1`);
        expect(dbQuery.rows[0]).toEqual({
            comment : 'this is a comment on a comment'
        })
    })

    test('does not work if user is not logged in' , async function () {
        try{
            const resp = await request(app)
            .post('/comments/52804/testUser1/1/commentoncomment')
            .send({
                comment : 'this should not work'
            })
        }catch(e) {
            expect(e instanceof UnauthorizedError).toBeTruthy();

            // query DB to make sure that this does not exist

            const dbQuery = await db.query(`SELECT * FROM comments WHERE comment_commented_on = 1`);
            expect(dbQuery.rows[0]).toBeFalsy();
        }
    })
})