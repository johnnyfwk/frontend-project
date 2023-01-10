import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';
import CommentCard from './CommentCard';

export default function SingleReview() {
    const {review_id} = useParams();
    const [singleReview, updateSingleReview] = useState( {} );
    const [isReviewLoading, updateIsReviewLoading] = useState(true);
    const [commentsByReviewId, updateCommentsByReviewId] = useState( [] );
    const [areCommentsLoading, updateAreCommentsLoading] = useState( true );

    useEffect(() => {
        api.getSingleReview(review_id)
            .then((response) => {
                updateSingleReview(response);
                updateIsReviewLoading(false);
            })
    }, []);

    useEffect(() => {
        api.getCommentsByReviewId(review_id)
            .then((response) => {
                updateCommentsByReviewId(response);
                updateAreCommentsLoading(false);
            })
    }, [])

    if (isReviewLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <h1>{singleReview.title}</h1>

            <section>
                <img src={singleReview.review_img_url} alt={singleReview.title}></img>
                <p><span className='review-card-key'>Category: </span>{singleReview.category}</p>
                <p><span className='review-card-key'>Designer: </span>{singleReview.designer}</p>
                <p><span className='review-card-key'>Owner: </span>{singleReview.owner}</p>
                <p><span className='review-card-key'>Votes: </span>{singleReview.votes}</p>
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