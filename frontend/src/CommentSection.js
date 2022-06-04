import React , {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom';
import FoodlyApi from './api';
import Comment from './Comment';


 
const CommentSection = ( { addComment , handleKeyPress , trigger }) => {
    const {id} = useParams();
    const [comments , setComments] = useState();
    const [isLoading , setIsLoading] = useState(true);
    

    
   
    
 
    useEffect(() => {
        async function findComments () {
            const results = await FoodlyApi.getAllComments(id);
            setComments(results);
            setIsLoading(false);
        }

        findComments();
    } , [trigger]);

   


if(isLoading) {
    return(
        <div>Loading &hellip;</div>
    )
}else {
    return (
        <div>
            {comments.results.map(c => (
                !c.comment_commented_on ? 
                <div>
                <Comment comment = {c} key = {c.id} commentId = {c.id} addComment = {addComment} handleKeyPress = {handleKeyPress} trigger = {trigger}/> 
                <br />
                </div>
                : ''
            ))}
        
        </div>
    )
}

}

export default CommentSection;