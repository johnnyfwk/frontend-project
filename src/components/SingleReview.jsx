import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';
import CommentCard from './CommentCard';
import SingleReviewDetails from './SingleReviewDetails';
import SingleReviewVotes from './SingleReviewVotes';
import SingleReviewPostComment from './SingleReviewPostComment';

export default function SingleReview( {usernameLoggedIn} ) {
    const {review_id} = useParams();
    const [singleReview, setSingleReview] = useState( {} );
    const [isReviewLoading, setIsReviewLoading] = useState( true );
    const [commentsByReviewId, setCommentsByReviewId] = useState( [] );
    const [areCommentsLoading, setAreCommentsLoading] = useState( true );
    const [votesChange, setVotesChange] = useState( 0 );
    const [wasVotesChangedSuccessfully, setWasVotesChangedSuccessfully] = useState( null );
    const [wasReviewCommentPostedSuccessfully, setWasReviewCommentPostedSuccessfully] = useState( null );
    const [currentNumberOfComments, setCurrentNumberOfComments] = useState( 0 );
    const [wereCommentsRetrievedSuccessfully, getWereCommentsRetrievedSuccessfully] = useState( null );

    useEffect(() => {
        setIsReviewLoading(true);
        api.getSingleReview(review_id)
            .then((response) => {
                setSingleReview(response);
                setIsReviewLoading(false);
                setCurrentNumberOfComments(response.comment_count);
            })
    }, []);

    useEffect(() => {
        getWereCommentsRetrievedSuccessfully(null);
        setAreCommentsLoading(true);
        api.getCommentsByReviewId(review_id)
            .then((response) => {
                if (response) {
                    const commentsByReviewIdSorted = response.sort((a, b) => {
                        if (a.votes > b.votes) {
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    })
                    setCommentsByReviewId(commentsByReviewIdSorted);
                }
                else {
                    setCommentsByReviewId(response);
                }                
                setAreCommentsLoading(false);
            })
            .catch((error) => {
                getWereCommentsRetrievedSuccessfully(false);
                setAreCommentsLoading(false);
            })
    }, [])

    if (isReviewLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <h1>{singleReview.title}</h1>

            <SingleReviewDetails singleReview={singleReview} votesChange={votesChange}/>

            <SingleReviewVotes
                singleReview={singleReview}
                setVotesChange={setVotesChange}
                wasVotesChangedSuccessfully={wasVotesChangedSuccessfully}
                setWasVotesChangedSuccessfully={setWasVotesChangedSuccessfully}
            />

            <SingleReviewPostComment
                usernameLoggedIn={usernameLoggedIn}
                singleReview={singleReview}
                wasReviewCommentPostedSuccessfully={wasReviewCommentPostedSuccessfully}
                setWasReviewCommentPostedSuccessfully={setWasReviewCommentPostedSuccessfully}
                setCurrentNumberOfComments={setCurrentNumberOfComments}
                setCommentsByReviewId={setCommentsByReviewId}
            />

            <section>
                <h2>Comments ({currentNumberOfComments})</h2>
                {areCommentsLoading ? <p>Loading...</p> : null}
                {wereCommentsRetrievedSuccessfully === null ? null : <p>Could not retrieve comments for this review.</p>}
                <div id='comment-cards'>
                    {commentsByReviewId === undefined ? <p>No one has posted any comments for this review.</p>
                        : commentsByReviewId.map((comment) => {
                            return <CommentCard key={comment.comment_id} comment={comment}/>
                        })}
                </div>
            </section>            
        </main>
    )
}