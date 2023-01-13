import { Link } from 'react-router-dom';

export default function ReviewCard( {review} ) {
    return (
        <div className='review-card'>
            <Link to={`/reviews/${review.review_id}`}>
                <h2>{review.title}</h2>
            </Link>
            <Link to={`/reviews/${review.review_id}`}>
                <img src={review.review_img_url} alt={review.title}></img>
            </Link>            
            <p><span className='review-card-key'>Category: </span>{review.category}</p>
            <p><span className='review-card-key'>Designer: </span>{review.designer}</p>
            <p><span className='review-card-key'>Owner: </span>{review.owner}</p>
            <p><span className='review-card-key'>Votes: </span>{review.votes}</p>
        </div>
    )
}