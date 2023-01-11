export default function SingleReviewDetails( {singleReview, votesChange} ) {
    return (
        <section id='single-review-details'>
            <img src={singleReview.review_img_url} alt={singleReview.title}></img>
            <p><span className='review-card-key'>Category: </span>{singleReview.category}</p>
            <p><span className='review-card-key'>Designer: </span>{singleReview.designer}</p>
            <p><span className='review-card-key'>Owner: </span>{singleReview.owner}</p>
            <p>{singleReview.review_body}</p>
            <p><span className='review-card-key'>Votes: </span>{singleReview.votes + votesChange}</p>
        </section>
    )
}