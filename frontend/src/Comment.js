import React , {useState , useEffect} from 'react';
import FoodlyApi from './api';
import CommentBox from './CommentBox';
import SubComment from './SubComment';
import uuid from 'react-uuid'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';

const Comment = ( { comment , addComment , commentId , handleKeyPress , trigger}) => {
    const [isHovering , setIsHovering] = useState(false);
    const [isReplying , setIsReplying] = useState(false);
    const [subComments , setSubComments] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [subCommentsExist , setSubCommentsExist] = useState(false);
    useEffect(() => {
        async function getAllSubcomments () {
            setSubComments(await FoodlyApi.getSubComments(commentId));
            setIsLoading(false);
        }
        getAllSubcomments();

    } , [trigger])

    useEffect(() => {
        setSubCommentsExist(true)
    } , [subComments])


    let isCurrUserComment = false;
    if(comment.username === localStorage.getItem('username')) {
        isCurrUserComment = true;
    }

    const handleHoverOver = (e) => {
        setIsHovering(true);
    }

    const handleHoverOut = (e) => {
            setIsHovering(false)
            setIsReplying(false)
    }
    const handleDelete = async(e) => {
        e.preventDefault();
        await FoodlyApi.deleteComment(comment.id , comment.username)
        handleKeyPress();
        
    }

    const handleReply = async(e) => {
        e.preventDefault();
        setIsReplying(true);
    }


    
    if(isLoading) {
        return (
            <Spinner animation='border' />
        )
    }else {
    return (
                <div>
                    <Accordion alwaysOpen key={uuid()}>
                        <Accordion.Item eventKey='0'>
                            
        <Card onMouseEnter = {handleHoverOver} onMouseLeave = {handleHoverOut}  >
            
            <Card.Header >{comment.username}</Card.Header>
            <Accordion.Header>
                <Card.Body>
                    <p>
                        {comment.comment}
                        {isCurrUserComment && isHovering ? <><CloseButton  onClick = {handleDelete} ></CloseButton></> : ''}
                        {isReplying ? <CommentBox handleKeyPress = {handleKeyPress} addComment = {addComment} origionalCommentId = {commentId}/> : ''}
                    </p>
                <footer className='blockquote-footer'>
                    {comment.date_posted} {isHovering ? <Button onClick = {handleReply} size='sm'>Reply</Button> : ''}
                    {subCommentsExist ? subComments.length === 1 ? '1 Reply' : `${subComments.length} Replies` : ''}
                </footer>
                </Card.Body>
                </Accordion.Header>
                <Accordion.Body>
                <div>
                <ListGroup variant = 'flush'>
                    {subCommentsExist ? subComments.map(sc => (
                        <ListGroup.Item>
                        <SubComment comment = {sc} key = {uuid()} />
                        </ListGroup.Item>
                    ))
                    
                : ''
                }
                </ListGroup>
                </div>
                </Accordion.Body>
        </Card>
      
        </Accordion.Item>
        </Accordion>
        </div>

        // {/* </div> */}
    )
                    }
}

export default Comment


// 52814