export default function ReviewCard( {review} ) {
    return (
        <div className='review-card'>
            <h2>{review.title}</h2>
            <img src={review.review_img_url} alt={review.title}></img>
            <p><span className='review-card-key'>Category: </span>{review.category}</p>
            <p><span className='review-card-key'>Designer: </span>{review.designer}</p>
            <p><span className='review-card-key'>Owner: </span>{review.owner}</p>
        </div>
    )
}