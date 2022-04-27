"use strict";

const db = require('../db');
const bcrypt = require('bcrypt');
const { NotFoundError , BadRequestError , UnauthorizedError} = require('../expressError');

// need to create helper functions to help with updates

const { BCRYPT_WORK_FACTOR } = require('../config.js');

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
        console.log(user);

        if(!user) {
            throw new UnauthorizedError(`User does not exist : ${username} `)
        }

        return user;
        
    }






}


module.exports = User;