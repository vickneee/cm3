import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-job">Add Job</a>
      </div>
    </nav>
  );
}

export default Navbar;
