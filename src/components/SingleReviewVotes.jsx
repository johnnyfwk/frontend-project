import * as api from '../utils/api';

export default function SingleReviewVotes( {singleReview, setVotesChange, wasVotesChangedSuccessfully, setWasVotesChangedSuccessfully} ) {
    function add1ToReviewVotes() {
        setVotesChange((currentVotesChange) => {
            return currentVotesChange + 1;
        });
        api.patchVotesByReviewId(singleReview.review_id, 1)
            .then((response) => {
                setWasVotesChangedSuccessfully(true);
            })
            .catch((error) => {
                setVotesChange((currentVotesChange) => {
                    return currentVotesChange - 1;
                })
                setWasVotesChangedSuccessfully(false);
            })
    }

    function subtract1FromReviewVotes() {
        setVotesChange((currentVotesChange) => {
            return currentVotesChange - 1;
        });
        api.patchVotesByReviewId(singleReview.review_id, -1)
            .then((response) => {
                setWasVotesChangedSuccessfully(true);
            })
            .catch((error) => {
                setVotesChange((currentVotesChange) => {
                    return currentVotesChange + 1;
                })
                setWasVotesChangedSuccessfully(false);
            })
    }

    return (
        <section id='single-review-votes'>
            {wasVotesChangedSuccessfully === false ? <p id='review-votes-not-updated'>Could not update votes.</p> : null}
            <div>                    
                <button id='single-review-decrement-vote' onClick={subtract1FromReviewVotes}>Vote -1</button>
                <button id='single-review-increment-vote' onClick={add1ToReviewVotes}>Vote +1</button>
            </div>
        </section>
    )
}