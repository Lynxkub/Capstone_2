"use strict";


const db = require('../db');
const { NotFoundError , BadRequestError } = require('../expressError');
let now = new Date()




class Comment {


    // Adds a user comment to a meal
    static async makeComment(mealId , comment , username) {

        // User comment needs to have data otherwise error is thrown
        if(comment.length === 0) {
            throw new BadRequestError(`Comment is empty`)
        }
        let date = now.toLocaleDateString();
        const results = await db.query(`INSERT INTO comments
        (username , api_id , comment , date_posted , is_edited)
        VALUES ($1 , $2 , $3 , $4 , $5) 
        RETURNING username , api_id , comment , date_posted`,
        [username , mealId, comment , date , false]);
        return results.rows[0];
    }

    // Deletes a user comment from a meal
    static async deleteComment(commentId) {

        // initial check to see if the comment id exists
        const initialCheck = await db.query(`SELECT * FROM comments WHERE id = ${commentId}`);
        if(!initialCheck.rows[0]) {
            throw new NotFoundError('Comment does not exist')
        }

        const results = await db.query(`DELETE FROM comments
        WHERE id = '${commentId}'`);
        return ({
            msg : 'deleted'
        })

    }

    static async editComment(commentId , comment) {
        
        // initial check to see if comment id exists

        const initialCheck = await db.query(`SELECT * FROM comments WHERE id = ${commentId}`);
        if(!initialCheck.rows[0]) {
            throw new NotFoundError('Comment does not exist');
        }

        const results = await db.query(`
        Update comments
        SET is_edited = $1 , comment = $2
        RETURNING username , api_id , comment , date_posted , is_edited`,
        [true , comment]);
        return results.rows[0];
    }

    static async getAllUserComments(username) {

       
        const results = await db.query(`
        SELECT * FROM comments WHERE username = $1` ,
        [username]);

        if(!results.rows) {
            throw new NotFoundError(`${username} does not exist`)
        }
       
        return results.rows;
    }


    // Allows a user to comment on a comment

    static async commentOnComment(comment , origionalCommentId , username , mealId) {

        // initial check to make sure the origional comment exists and that the comment has a length
        if(comment.length < 0) {
            throw new BadRequestError('Comment does not have any contet')
        }
        const initialCheck = await db.query(`SELECT * FROM comments WHERE id = $1` , [origionalCommentId]);
        if(!initialCheck.rows[0]) {
            throw new NotFoundError(`Cannot comment on a comment that does not exist`)
        }
        let date = now.toLocaleDateString();

        const results = await db.query(`INSERT INTO comments (username , api_id , comment , date_posted , is_edited , comment_commented_on)
        VALUES ($1 , $2 , $3 , $4 , $5, $6)
        RETURNING username , api_id , comment , date_posted , comment_commented_on` ,
        [username , mealId , comment , date , false , origionalCommentId])

        return results.rows[0];
    }

    // Gets all comments made on a recipe

    static async getAllRecipeComments(mealId) {
        const res = await db.query(`SELECT * FROM comments WHERE api_id = $1` , [mealId]);
        return res.rows;
    }


    static async getSubComments(origionalCommentId) {
        const res = await db.query(`SELECT * FROM comments WHERE comment_commented_on = $1` , [origionalCommentId]);
        return res.rows;
    }
}

module.exports = Comment;