import { useState, useEffect } from 'react';

function Reviews() {
    const [reviews, updateReviews] = useState( {} );
    const [categories, updateCategories] = useState( [] );
    const [selectedCategory, updateSelectedCategory] = useState( "" );

    useEffect(() => {
        
    }, [])

    return (
        <section>
            <h2>Reviews</h2>
        </section>
    )
}

export default Reviews;