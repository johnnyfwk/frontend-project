import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import ReviewCard from './ReviewCard';

function Reviews( {reviews, setReviews, categories, setCategories} ) {
    const [areReviewsLoading, setAreReviewsLoading] = useState( true );
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryQuery = searchParams.get( 'category' );
    const [errorMessage, setErrorMessage] = useState( null );
    useEffect(() => {
        setErrorMessage(null);
        setAreReviewsLoading(true);
        api.getReviews(categoryQuery)
            .then((response) => {
                setReviews(response);
                setAreReviewsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error);
                setAreReviewsLoading(false);
            })
    }, [categoryQuery]);

    useEffect(() => {
        api.getCategories()
            .then((response) => {            
                setCategories(response.map((element) => element.slug))
            })
    }, [])

    if (areReviewsLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            {categoryQuery ? <h1>{utils.createUserFriendlyCategoryName(categoryQuery)} Reviews</h1> : <h1>All Reviews</h1>}

            <div id="category-links">
                {categories.map((category) => {
                    return <Link key={category} to={`/reviews?category=${category}`}>{utils.createUserFriendlyCategoryName(category)}</Link>
                })}
            </div>

            {errorMessage ? <p>Reviews could not be loaded.</p> : null}            

            <section id='review-cards'>
                {reviews.map((review) => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
        </main>
    )
}

export default Reviews;