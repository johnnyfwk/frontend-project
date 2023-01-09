import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/users">Users</Link>
        </nav>
    )
}

export default Nav;