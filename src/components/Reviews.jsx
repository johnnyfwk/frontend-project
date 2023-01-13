import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import ReviewCard from './ReviewCard';

function Reviews( {reviews, setReviews, categories, setCategories} ) {
    const [areReviewsLoading, setAreReviewsLoading] = useState( true );
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryQuery = searchParams.get( 'category' );

    console.log(reviews)

    useEffect(() => {
        setAreReviewsLoading(true);
        api.getReviews(categoryQuery)
            .then((response) => {
                if (categoryQuery === null) {
                    setReviews(response);
                }
                else if (categoryQuery) {
                    setReviews(response.filter((element) => element.category === categoryQuery));
                }
                setAreReviewsLoading(false);
            })
            .catch((error) => {
                console.log(error);
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

            <section id='review-cards'>
                {reviews.map((review) => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
        </main>
    )
}

export default Reviews;