import {Link} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Navbar = ({isAuthenticated, setIsAuthenticated}) => {
  
  const handleLogOutClick = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  const storedUser = JSON.parse(localStorage.getItem('user')); // Get the user string from localStorage
  
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <div>
            <Link to="jobs/add-job">Add Job</Link>
            <span> {storedUser.username}</span>
            <Link to="/" onClick={handleLogOutClick} className="btn">Log out</Link>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
