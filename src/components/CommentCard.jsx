export default function CommentCard( {comment} ) {
    return (
        <div className='comment-card'>
            <p>{comment.body}</p>
            <p><span className='review-card-key'>Author: </span>{comment.author}</p>
            <p><span className='review-card-key'>Votes: </span>{comment.votes}</p>
            <p><span className='review-card-key'>Date posted: </span>{comment.created_at.replace("T", " ").slice(0, 19)}</p>
        </div>
    )
}