"use strict";

const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require('./middleware/auth'); 

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const commentRoutes = require('./routes/comments');
const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use('/auth' , authRoutes);
app.use('/users' , userRoutes);
app.use('/recipes' , recipeRoutes);
app.use('/comments' , commentRoutes);


app.use(function(req , res , next) {
    return next(new NotFoundError());
})

// Generic error handler. Any error that does not match any of the created errors will go through here
app.use(function(err , req , res , next) {
    if(process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error : {message , status}
    })
})


module.exports = app;