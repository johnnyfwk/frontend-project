import { useState, useEffect } from "react";
import * as api from '../utils/api';
import ReviewCard from './ReviewCard';

function Reviews( {reviews, updateReviews, categories, updateCategories} ) {
    const [selectedCategory, updateSelectedCategory] = useState( "all" );

    useEffect(() => {
        api.getReviews(selectedCategory)
            .then((response) => {
                if (selectedCategory === "all") {
                    updateReviews(response);
                }
                else {
                    const reviewsByCategory = response.filter((review) => {
                        return review.category === selectedCategory;
                    })
                    updateReviews(reviewsByCategory);
                }
            })
    }, [selectedCategory]);

    useEffect(() => {
        api.getCategories()
            .then((response) => {
                updateCategories(response.map((category) => category.slug));
            })
    }, []);

    const categoriesToRender = [ 'all', ...categories ];

    const categoriesToRenderInDropdown = categoriesToRender.map((category) => {
        return <option key={category} value={category}>{category}</option>
    })

    function changeCategory(event) {
        updateSelectedCategory(event.target.value);
    }

    return (
        <main>
            <h1>Reviews</h1>
            <form id="form-dropdown-categories">
                <select name="dropdown-categories" id="dropdown-categories" form="form-dropdown-categories" onChange={changeCategory}>
                {categoriesToRenderInDropdown}
                </select>
            </form>

            <br />

            <section id='review-cards'>
                {reviews.map((review) => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
            
            
        </main>
    )
}

export default Reviews;