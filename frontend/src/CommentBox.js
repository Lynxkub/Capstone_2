import React , {useState} from 'react';
import {useParams} from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Button from 'react-bootstrap/Button';
const CommentBox = ( { addComment , origionalCommentId , handleKeyPress} ) => {
    const {id} = useParams()
    const INITIAL_STATE = {
        comment : "",
        username : localStorage.getItem('username'),
        api_id : id,
        origionalCommentId : origionalCommentId || ''
    }

    const [comment , setComment] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const {name , value } = e.target;
        setComment(comment => ({
            ...comment , 
            [name] : value
        }))
    }


    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        await addComment(comment)
        setComment(INITIAL_STATE);
        handleKeyPress()
        }catch (e){
          return 
        }
       
    }
    return(
        <div>
            <div>
            <Form onSubmit = {handleSubmit} className='p-2'>
            <FloatingLabel controlId='comment' label='Thoughts?'>
                <Form.Control 
                as='textarea'
                className='w-50' 
                style={{height : '100px'}} 
                value = {comment.comment} 
                onChange={handleChange}
                name='comment'
                />
            </FloatingLabel>
            <Button id = 'submitComment' variant='primary' onClick={handleSubmit}>Add Comment</Button>
            </Form>
            </div>
        </div>
    )
}

export default CommentBox;