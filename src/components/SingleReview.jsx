import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../utils/api';

export default function SingleReview() {
    const {review_id} = useParams();
    const [singleReview, updateSingleReview] = useState( {} );
    const [isLoading, updateIsLoading] = useState(true);

    useEffect(() => {
        api.getSingleReview(review_id)
            .then((response) => {
                updateSingleReview(response);
                updateIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <h1>{singleReview.title}</h1>
            <img src={singleReview.review_img_url} alt={singleReview.title}></img>
            <p><span className='review-card-key'>Category: </span>{singleReview.category}</p>
            <p><span className='review-card-key'>Designer: </span>{singleReview.designer}</p>
            <p><span className='review-card-key'>Owner: </span>{singleReview.owner}</p>
            <p><span className='review-card-key'>Votes: </span>{singleReview.votes}</p>
            <p><span className='review-card-key'>Comment Count: </span>{singleReview.comment_count}</p>
            <p>{singleReview.review_body}</p>
        </main>
    )
}