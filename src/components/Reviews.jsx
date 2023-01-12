import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import ReviewCard from './ReviewCard';

function Reviews( {reviews, setReviews, categories, setCategories} ) {
    const [areReviewsLoading, setAreReviewsLoading] = useState( true );
    const [searchParams, setSearchParams] = useSearchParams();
    const categorySearchParam = searchParams.get( 'category' );

    useEffect(() => {
        setAreReviewsLoading(true);
        api.getReviews()
            .then((response) => {
                if (categorySearchParam === null) {
                    setReviews(response);
                }
                else if (categorySearchParam) {
                    setReviews(response.filter((element) => element.category === categorySearchParam));
                }                
                setAreReviewsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [categorySearchParam]);

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
            <h1>Reviews</h1>

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