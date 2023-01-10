import { useEffect } from "react";
import * as api from '../utils/api';
import ReviewCard from './ReviewCard';

function Reviews( {reviews, updateReviews} ) {
    useEffect(() => {
        api.getReviews()
            .then((response) => {
                updateReviews(response);
            })
    }, []);

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