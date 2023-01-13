import { useState } from 'react';
import * as api from '../utils/api';

export default function SingleReviewPostComment( {usernameLoggedIn, singleReview, wasReviewCommentPostedSuccessfully, setWasReviewCommentPostedSuccessfully, setCurrentNumberOfComments, setCommentsByReviewId, setIsCommentDeletedSuccessfully} ) {
    const [reviewCommentInput, setReviewCommentInput] = useState( "" );
    const [isReviewCommentInputEmpty, setIsReviewCommentInputEmpty] = useState( null );
    const [isCommentBeingPosted, setIsCommentBeingPosted] = useState( false );

    function onChangeReviewCommentInput(event) {        
        setReviewCommentInput(event.target.value);
    }

    function onClickSubmitCommentButton(event) {
        event.preventDefault();
        setWasReviewCommentPostedSuccessfully(null);
        setIsCommentBeingPosted(false);
        setIsCommentDeletedSuccessfully(null)
                
        if (reviewCommentInput === "") {
            setIsReviewCommentInputEmpty(true);
        }
        else {
            setIsReviewCommentInputEmpty(false);
            setIsCommentBeingPosted(true);
            api.postReviewComment(usernameLoggedIn, singleReview.review_id, reviewCommentInput)
                .then((response) => {
                    setCommentsByReviewId((currentCommentsById) => {
                        return [ response.data.comment, ...currentCommentsById ];
                    })
                    setReviewCommentInput("");
                    setWasReviewCommentPostedSuccessfully(true);
                    setIsCommentBeingPosted(false);
                    setCurrentNumberOfComments((currentNumberOfComments) => {
                        return currentNumberOfComments + 1;
                    })
                })
                .catch((error) => {
                    setWasReviewCommentPostedSuccessfully(false);
                })
        }
    }

    if (!usernameLoggedIn) {
        return null;
    }

	return (
		<section>
            <h2>Post a Comment</h2>
			<form id="review-comment-input-form">
				<label htmlFor="review-comment-input">Share your views about this review by posting a comment.</label>

                {isReviewCommentInputEmpty === null
                    ? null
                    : isReviewCommentInputEmpty === true
                        ? <p id="review-comment-input-empty">Please enter a comment</p>
                        : null}
                {wasReviewCommentPostedSuccessfully === null
                    ? null
                    : wasReviewCommentPostedSuccessfully === true
                        ? <p id="review-comment-posting-successful">Your comment was posted successfully!</p>
                        : <p id="review-comment-posting-failed">Your comment was not posted.</p>}
                {isCommentBeingPosted ? <p>Posting comment...</p> : null}

                <textarea
                    id="review-comment-input"
                    name="review-comment-input"
                    value={reviewCommentInput}
                    onChange={onChangeReviewCommentInput}>
                </textarea>

                <button onClick={onClickSubmitCommentButton} disabled={isCommentBeingPosted}>Submit Comment</button>				
			</form>
		</section>
	)
}