import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Search by Image</Link>
        <Link to="/recommendations" className="nav-link">Recommendations</Link>
        <Link to="/search-results" className="nav-link">Search Results</Link>
      </div>
    </nav>
  );
}

export default NavBar;