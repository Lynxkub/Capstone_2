"use strict";

const db = require('../db.js');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');

async function helpersBeforeAll() {
    await db.query("DELETE FROM users");


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