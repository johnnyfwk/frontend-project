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