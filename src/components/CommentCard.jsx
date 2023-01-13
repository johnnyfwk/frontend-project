import { useState } from 'react';
import * as api from '../utils/api';

export default function CommentCard( {comment, usernameLoggedIn} ) {
    
    const [isCommentDeleted, setIsCommentDeleted] = useState( null );
    const [isCommentBeingDeleted, setIsCommentBeingDeleted] = useState( false );

    function deleteComment(commentId) {
        console.log("Delete comment button clicked.")
        console.log(commentId, "----------- commentId")
        setIsCommentBeingDeleted(true);
        api.deleteComment(commentId)
            .then((response) => {
                console.log("Comment has been sauccessfully deleted!");
                setIsCommentDeleted(true);
                setIsCommentBeingDeleted(false);
            })
            .catch((error) => {
                console.log("Comment could not be deleted");
                setIsCommentDeleted(false);
                setIsCommentBeingDeleted(false);
            })
    }

    return (
        <div className='comment-card'>
            <p>{comment.body}</p>
            <p><span className='review-card-key'>Author: </span>{comment.author}</p>
            <p><span className='review-card-key'>Votes: </span>{comment.votes}</p>
            <p><span className='review-card-key'>Date posted: </span>{comment.created_at.replace("T", " ").slice(0, 19)}</p>
            {usernameLoggedIn === comment.author ? <button onClick={() => deleteComment(comment.comment_id)} disabled={isCommentBeingDeleted} id="delete-comment-button">Delete Your Comment</button> : null}
        </div>
    )
}