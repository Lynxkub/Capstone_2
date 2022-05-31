"use strict";

const db = require('../db.js');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const { createToken } = require('../helpers/tokens');

async function helpersBeforeAll() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM saved_recipes");
    await db.query("DELETE FROM comments");
    await db.query("ALTER SEQUENCE comments_id_seq RESTART WITH 1");
    await db.query("ALTER SEQUENCE saved_recipes_id_seq RESTART WITH 1")


await User.register({
    username : 'testUser1',
    first_name: 'firstName1',
    last_name : 'lastName1',
    email : 'one@one.com',
    password: 'password1'
})

await User.register({
    username : 'testUser2',
    first_name: 'firstName2',
    last_name : 'lastName2',
    email : 'two@two.com',
    password: 'password2'
})

await User.register({
    username : 'testUser3',
    first_name: 'firstName3',
    last_name : 'lastName3',
    email : 'three@three.com',
    password: 'password3'
})

await Recipe.saveMeal('testUser1' , 52804);
await Comment.makeComment(52804 , 'test comment' , 'testUser1');
await Comment.makeComment(52804 , 'this is another test comment' , 'testUser1');
await Comment.makeComment(52804 , 'user 2 test comment' , 'testUser2');
await Comment.makeComment(52804 , 'user 3 test comment' , 'testUser3');
await Comment.commentOnComment('test comment on comment' , 1 , 'testUser2' , 52804)


}


async function  helpersBeforeEach() {
    await db.query("BEGIN");
}

async function helpersAfterEach() {
    await db.query("ROLLBACK");
}

async function helpersAfterAll() {
    await db.end();
}

const user1Token = createToken({ username : 'testUser1'})
const user2Token = createToken({ username : 'testUser2'})
const user3Token = createToken({ username : 'testUser3'})


module.exports = {
    helpersAfterAll,
    helpersAfterEach,
    helpersBeforeAll,
    helpersBeforeEach,
    user1Token,
    user2Token,
    user3Token
}