"use strict";


// Shared config for application; can be required many places.

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

const PORT = +process.env.PORT || 3001;


// Use dev database , testing database , or via env var , production database

function getDatabaseUri() {
    return(process.env.NODE_ENV === 'test') ? 'foodly_test' : process.env.DATABASE_URL || 'foodly';
}

// test cases will run with 1 to speed up process
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12

console.log("Foodly Config:".green);
console.log("SECRET_KEY:".yellow , SECRET_KEY);
console.log("PORT:".yellow , PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow , BCRYPT_WORK_FACTOR);
console.log("Database:".yellow , getDatabaseUri());
console.log("---");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}