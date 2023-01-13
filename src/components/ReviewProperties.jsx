import { Link } from 'react-router-dom';
import * as utils from '../utils/utils';

export default function ReviewProperties( {reviewProperties, categoryQuery} ) {
    const renderReviewPropertyLinks = reviewProperties.map((property) => {
        if (categoryQuery) {
            return <Link key={property} to={`/reviews?category=${categoryQuery}&sort_by=${property}`}>{utils.createUserFriendlyReviewPropertyNames(property)}</Link>
        }
        else {
            return <Link key={property} to={`/reviews?sort_by=${property}`}>{utils.createUserFriendlyReviewPropertyNames(property)}</Link>
        }
    })

    return (
        <section>
            <h3>Sort Reviews by Review Property:</h3>
            <div id="sort-by-review-properties">
                {renderReviewPropertyLinks}
            </div>            
        </section>
    )
}