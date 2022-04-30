"use strict";

const db = require('../db');
const bcrypt = require('bcrypt');
const { NotFoundError , BadRequestError , UnauthorizedError} = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');
// need to create helper functions to help with updates

const { BCRYPT_WORK_FACTOR } = require('../config.js');
const res = require('express/lib/response');

// User class for User related functions

class User {

    // Registers a new user

    // Returns { username , firstName , lastName , email }

    // Throws a BadRequestError if a user with the username already exists


    static async register({ username , password , first_name , last_name , email} ) {
        // check if the user already exists. Primary key is the username, so no duplicate usernames are permitted
        const userAlreadyExists = await db.query(`SELECT username FROM users WHERE username = $1` , [username]);
        if(userAlreadyExists.rows[0]) {
            throw new BadRequestError(`Username already exists: ${username}`);
        }


        const hashedPassword = await bcrypt.hash(password , BCRYPT_WORK_FACTOR);
       
        const result = await db.query(`
        INSERT INTO users
        (username , password , first_name , last_name , email)
        VALUES($1 , $2 , $3 , $4 , $5)
        RETURNING username , first_name, last_name , email`,
        [username , hashedPassword , first_name , last_name , email]);

        const user = result.rows[0];

        return user;
    }


    static async authenticate(username , password) {
        // check to see if the user exists first
        const result = await db.query(`
        SELECT username , password , first_name , last_name, email
        FROM users
        WHERE username = $1` ,
        [username]);

        const user = result.rows[0];
      
        if(user) {
            // compare hashed password and newly hashed password
            const isValid = await bcrypt.compare(password , user.password);
            console.log(isValid);
            if(isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError('Invalid username/password');
    }

    static async get(username) {
        // check to see if the user exists first
        const result = await db.query(`
        SELECT username ,  first_name , last_name , email
        FROM users
        WHERE username = $1` ,
        [username]);

        const user = result.rows[0];
       

        if(!user) {
            throw new UnauthorizedError(`User does not exist : ${username} `)
        }

        return user;
        
    }

    static async update(username , data) {
    if(data.password) {
        data.password = await bcrypt.hash(data.password , BCRYPT_WORK_FACTOR);
    }
    
// Username must be unique. Check to see if the username that is being changed already exists. Throw error if it exists.

    if(data.username !== username) {
         const usernameCheck = await db.query(`
        SELECT username FROM users WHERE username = '${data.username}'`);
        if(usernameCheck.rows[0]){
            console.log('inside')
            throw new BadRequestError(`Username ${data.username} already exists. Please choose another`)
        }
    }
        const {setCols , values } = sqlForPartialUpdate(
            data , 
            {
                first_name : "first_name",
                last_name : "last_name"
            }
        )

        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users 
                            SET ${setCols}
                            WHERE username = ${usernameVarIdx}
                            RETURNING username, first_name , last_name , email`
                    
        const result = await db.query(querySql , [...values , username]);
        const user = result.rows[0];

        if(!user) throw new BadRequestError(`No user : ${username}`);

        delete user.password;
        return user;
    }


    static async delete(username) {
        // check to see if username exists
        const result = await db.query(`
        SELECT username FROM users WHERE username = '${username}'`);
        let user = result.rows[0];

        if(!user) throw new BadRequestError(`Username ${username} does not exist`);

        await db.query(`
        DELETE FROM users WHERE username = '${username}'`)

        return {msg : 'deleted'}
    }


}


module.exports = User;