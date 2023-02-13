import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import ReviewCard from './ReviewCard';
import OrderBy from './OrderBy';
import ReviewProperties from './ReviewProperties';

function Reviews( {reviews, setReviews, categories, setCategories} ) {
    const [ areReviewsLoading, setAreReviewsLoading ] = useState( true );
    const [ searchParams, setSearchParams ] = useSearchParams();    
    const [ errorMessage, setErrorMessage ] = useState( null );
    const [ orderBy, setOrderBy ] = useState( "desc" );
    const [ reviewProperties, setReviewProperties ] = useState( ["title", "designer", "owner", "created_at", "votes", "comment_count"] );
    const [ selectCategory, setSelectedCategory ] = useState( "strategy" );

    const categoryQuery = searchParams.get( 'category' );
    const sortByQuery = searchParams.get( 'sort_by' );

    useEffect(() => {
        setErrorMessage(null);
        setAreReviewsLoading(true);
        api.getReviews(categoryQuery, sortByQuery, orderBy)
            .then((response) => {
                setReviews(response);
                setAreReviewsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error);
                setAreReviewsLoading(false);
            })
    }, [categoryQuery, sortByQuery, orderBy]);

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

            <ReviewProperties reviewProperties={reviewProperties} categoryQuery={categoryQuery}/>

            <OrderBy orderBy={orderBy} setOrderBy={setOrderBy}/>     

            <section id='review-cards'>
                {reviews.map((review) => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
        </main>
    )
}

export default Reviews;