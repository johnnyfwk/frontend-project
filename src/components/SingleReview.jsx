import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';
import CommentCard from './CommentCard';

export default function SingleReview() {
    const {review_id} = useParams();
    const [singleReview, setSingleReview] = useState( {} );
    const [isReviewLoading, setIsReviewLoading] = useState( true );
    const [commentsByReviewId, setCommentsByReviewId] = useState( [] );
    const [areCommentsLoading, setAreCommentsLoading] = useState( true );
    const [votesChange, setVotesChange] = useState( 0 );
    const [wasVotesChangedSuccessfully, setWasVotesChangedSuccessfully] = useState( null );

    useEffect(() => {
        setIsReviewLoading(true);
        api.getSingleReview(review_id)
            .then((response) => {
                setSingleReview(response);
                setIsReviewLoading(false);
            })
    }, []);

    useEffect(() => {
        setAreCommentsLoading(true);
        api.getCommentsByReviewId(review_id)
            .then((response) => {
                setCommentsByReviewId(response);
                setAreCommentsLoading(false);
            })
    }, [])

    if (isReviewLoading) {
        return <p>Loading...</p>
    }

    function add1ToReviewVotes() {
        setVotesChange((currentVotesChange) => {
            return currentVotesChange + 1;
        });
        api.patchVotesByReviewId(singleReview.review_id, 1)
            .then((response) => {
                setWasVotesChangedSuccessfully(true);
            })
            .catch((error) => {
                setVotesChange((currentVotesChange) => {
                    return currentVotesChange - 1;
                })
                setWasVotesChangedSuccessfully(false);
            })
    }

    function subtract1FromReviewVotes() {
        setVotesChange((currentVotesChange) => {
            return currentVotesChange - 1;
        });
        api.patchVotesByReviewId(singleReview.review_id, -1)
            .then((response) => {
                setWasVotesChangedSuccessfully(true);
            })
            .catch((error) => {
                setVotesChange((currentVotesChange) => {
                    return currentVotesChange + 1;
                })
                setWasVotesChangedSuccessfully(false);
            })
    }

    return (
        <main>
            <h1>{singleReview.title}</h1>

            <section id='single-review'>
                <img src={singleReview.review_img_url} alt={singleReview.title}></img>
                <p><span className='review-card-key'>Category: </span>{singleReview.category}</p>
                <p><span className='review-card-key'>Designer: </span>{singleReview.designer}</p>
                <p><span className='review-card-key'>Owner: </span>{singleReview.owner}</p>
                <p><span className='review-card-key'>Votes: </span>{singleReview.votes + votesChange}</p>
                {wasVotesChangedSuccessfully === false ? <p id='review-votes-not-updated'>Could not update votes.</p> : null}
                <div id='single-review-vote-buttons'>                    
                    <button id='single-review-decrement-vote' onClick={subtract1FromReviewVotes}>Vote -1</button>
                    <button id='single-review-increment-vote' onClick={add1ToReviewVotes}>Vote +1</button>
                </div>                
                <p>{singleReview.review_body}</p>
            </section>

            <section>
                <h2>Comments ({singleReview.comment_count})</h2>
                {areCommentsLoading ? <p>Loading...</p> : null}
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