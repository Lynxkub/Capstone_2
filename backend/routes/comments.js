"use strict";

const express = require('express');
const { BadRequestError , UnauthorizedError } = require('../expressError');
const Comment = require('../models/comment');
const { ensureCorrectUser } = require('../middleware/auth.js');

const router = express.Router();

// GET /:username/all => { comments }

// Returns { user comments }

// Authroization required : ensureCorrectUser

router.get('/:username/all' , ensureCorrectUser ,async function (req , res , next) {
    try {
        const results = await Comment.getAllUserComments(req.params.username);
        return res.json({ results })
    }catch(e) {
        return next(e);
    }
})

// POST /:username/:mealId/postcomment => { comment }

// Returns { comment_id , username , comment , date , is_edited }

// Authroization required : ensureCorrectUser

router.post('/:username/:mealId/postcomment' , ensureCorrectUser , async function (req , res , next) {
    try{
        const comment = req.body.comment;
        console.log(comment);
        const results = await Comment.makeComment(req.params.mealId , comment , req.params.username);
        return res.json({ results });
    }catch(e) {
        return next(e)
    }
})


// DELETE /delete/:username/:commentId => { deleted }

// Returns { msg : deleted }

// Authroization required : ensureCorrectUser

router.delete('/delete/:username/:commentId' , ensureCorrectUser , async function (req , res , next) {
    try {
        const results = await Comment.deleteComment(req.params.commentId);
        return res.json({ results })
    }catch(e) {
        return next(e);
    }
})


// PATCH /edit/:username/:commentId => { comment }

// Returns { comment_id , username , api_id , comment , date_posted , is_edited}

// Authroization required : ensureCorrectUser

router.patch('/edit/:username/:commentId' , ensureCorrectUser , async function (req , res , next) {
    try{
        const results = await Comment.editComment(req.params.commentId , req.body.comment);
        return res.json({ results })
    }catch(e) {
        return next(e);
    }
})


// POST /:mealId/:username/:commentId/commentoncomment => { comment }

// Returns { comment_id , username , api_id , comment , date_posted , comment_commented_on }

// Authroization required : ensureCorrectUser

router.post('/:mealId/:username/:commentId/commentoncomment' , ensureCorrectUser , async function (req , res , next) {
    try{
        const comment = req. body.comment;
        const results = await Comment.commentOnComment(comment , req.params.commentId , req.params.username , req.params.mealId);
        return res.json({ results })
    }catch(e) {

    }
})

module.exports = router;