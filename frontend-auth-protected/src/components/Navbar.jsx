import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-job">Add Job</Link>
      </div>
        <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
    </nav>
  );
}

export default Navbar;
