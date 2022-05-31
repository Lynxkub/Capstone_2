import React from 'react';
import Card from 'react-bootstrap/Card'

const SubComment = ( {comment }) => {
  
    return (
        <div>
            <Card>
                <Card.Header>{comment.username}</Card.Header>
                <Card.Body>
                    <p>
                        {comment.comment}
                    </p>
                    <footer>
                        {comment.date_posted}
                    </footer>
                </Card.Body>
            </Card>
        </div>
    )
}


export default SubComment;