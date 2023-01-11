import { useState } from 'react';
import * as api from '../utils/api';

export default function SingleReviewPostComment( {usernameLoggedIn, singleReview, wasReviewCommentPostedSuccessfully, setReviewWasCommentPostedSuccessfully} ) {
    const [reviewCommentInput, setReviewCommentInput] = useState( "" );
    const [isReviewCommentInputEmpty, setIsReviewCommentInputEmpty] = useState( null );
    const [isCommentBeingPosted, setIsCommentBeingPosted] = useState( false );

    function onChangeReviewCommentInput(event) {        
        setReviewCommentInput(event.target.value);
    }

    function onClickSubmitCommentButton(event) {
        event.preventDefault();
        setReviewWasCommentPostedSuccessfully(null);
        setIsCommentBeingPosted(false);
                
        if (reviewCommentInput === "") {
            setIsReviewCommentInputEmpty(true);
        }
        else {
            setIsReviewCommentInputEmpty(false);
            setIsCommentBeingPosted(true);
            api.postReviewComment(usernameLoggedIn, singleReview.review_id, reviewCommentInput)
                .then((response) => {
                    setReviewCommentInput("");
                    setReviewWasCommentPostedSuccessfully(true);
                    setIsCommentBeingPosted(false);
                })
                .catch((error) => {
                    setReviewWasCommentPostedSuccessfully(false);
                })
        }
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

				<input
                    type="text"
                    id="review-comment-input"
                    name="review-comment-input"
                    value={reviewCommentInput}
                    onChange={onChangeReviewCommentInput}>
                </input>
                <button onClick={onClickSubmitCommentButton}>Submit Comment</button>
			</form>
		</section>
	)
}