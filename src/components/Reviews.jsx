import { useState, useEffect } from "react";
import * as api from '../utils/api';
import ReviewCard from './ReviewCard';

function Reviews( {reviews, setReviews} ) {
    const [areReviewsLoading, setAreReviewsLoading] = useState(true);

    useEffect(() => {
        setAreReviewsLoading(true);
        api.getReviews()
            .then((response) => {
                setReviews(response);
                setAreReviewsLoading(false);
            })
    }, []);

    if (areReviewsLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <h1>Reviews</h1>
            <section id='review-cards'>
                {reviews.map((review) => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
        </main>
    )
}

export default Reviews;