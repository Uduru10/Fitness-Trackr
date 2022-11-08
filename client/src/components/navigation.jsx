import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="Navbar">
      <Link to="/"> Fitness Tracker</Link>
      <Link to="/Activities"> Activities</Link>
      <Link to="/Routines"> Routines</Link>
      <Link to="/Users"> Users</Link>
    </nav>
  );
}

export default Navigation;
