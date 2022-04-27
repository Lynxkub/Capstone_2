const bcrypt = require('bcrypt');

const db = require('../db.js');
const { BCRYPT_WORK_FACTOR } = require('../config');


async function helperBeforeAll() {
    await db.query("DELETE FROM users");

    await db.query(`
    INSERT INTO users
    (username , password , first_name , last_name , email)
    VALUES ('user1' , $1 , 'user1First' , 'user1Last' , 'user1@email.com'),
            ('user2' , $2 , 'user2First' , 'user2Last' , 'user2@email.com')
            RETURNING username` , 
            [
                await bcrypt.hash('password1' , BCRYPT_WORK_FACTOR),
                await bcrypt.hash('password2' , BCRYPT_WORK_FACTOR)
            ]);
}

async function helperBeforeEach() {
    await db.query("BEGIN");
}

async function helperAfterEach() {
    await db.query("ROLLBACK");
}

async function helperAfterAll() {
    await db.end();
}



module.exports = {
    helperBeforeAll,
    helperAfterAll,
    helperAfterEach,
    helperBeforeEach
}