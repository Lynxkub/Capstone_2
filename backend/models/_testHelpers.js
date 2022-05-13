const bcrypt = require('bcrypt');

const db = require('../db.js');
const { BCRYPT_WORK_FACTOR } = require('../config');
let now = new Date();

async function helperBeforeAll() {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM saved_recipes");
    await db.query("DELETE FROM comments");
    await db.query("ALTER SEQUENCE comments_id_seq RESTART WITH 1");

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

    await db.query(`
    INSERT INTO saved_recipes
    (username , api_id)
    VALUES('user1' , 52804)`)

    await db.query(`
    INSERT INTO comments
    (api_id , comment , username , date_posted , is_edited)
    VALUES($1 , $2 , $3 , $4 , $5)`,
    [52804 , 'test comment' , 'user1' , now , false]);

    await db.query(`
    INSERT INTO comments
    (api_id , comment , username , date_posted , is_edited)
    VALUES($1 , $2 , $3 , $4 , $5)` ,
    [52963 , 'test comment' , 'user1' , now , false])

  

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