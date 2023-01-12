import { Link } from 'react-router-dom';

export default function CategoryCard( {category} ) {
    return (
        <div className="category-card">
            <Link to={`/categories/${category.slug}`}>
                <h2>{category.userFriendlyName}</h2>
            </Link>            
            <p>{category.description}</p>
        </div>
    )
}