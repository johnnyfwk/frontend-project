import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as api from '../utils/api';
import * as utils from '../utils/utils';
import ReviewCard from './ReviewCard';

export default function SingleCategory( {setCategories} ) {
    const { category } = useParams();
    const [ reviewsByCategory, setReviewsByCategory ] = useState( [] );

    useEffect(() => {
        api.getCategories()
            .then((response) => {
                setCategories(response.map((element) => element.slug))
            })
    }, []);

    useEffect(() => {
        api.getReviews()
            .then((response) => {
                setReviewsByCategory(response.filter((element) => element.category === category));
            })
    }, [])

    return (
        <main>
            <h1>{utils.createUserFriendlyCategoryName(category)}</h1>
            <section id='review-cards'>
                {reviewsByCategory.map((review) => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
        </main>
    )
}