import { useState } from 'react';
import * as api from '../utils/api';

export default function CommentCard( {comment, usernameLoggedIn, setCommentsByReviewId, setCurrentNumberOfComments, setIsCommentDeletedSuccessfully} ) {
    
    
    const [isCommentBeingDeleted, setIsCommentBeingDeleted] = useState( false );

    function deleteComment(commentId) {
        setIsCommentBeingDeleted(true);
        api.deleteComment(commentId)
            .then((response) => {
                setCommentsByReviewId((currentCommentsByReviewId) => {
                    const commentsMinusDeleted = [];
                    currentCommentsByReviewId.forEach((comment) => {
                        if (comment.comment_id !== commentId) {
                            commentsMinusDeleted.push(comment);
                        }
                    })
                    setCurrentNumberOfComments(commentsMinusDeleted.length);
                    return commentsMinusDeleted;
                })
                setIsCommentDeletedSuccessfully(true);
                setIsCommentBeingDeleted(false);
            })
            .catch((error) => {
                setIsCommentDeletedSuccessfully(false);
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