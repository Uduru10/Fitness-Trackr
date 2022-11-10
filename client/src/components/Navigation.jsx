import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/users";
import useUsers from "../hooks/useUsers";

function Navigation() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, users } = useUsers();
  console.log("users:", users);
  return (
    <nav className="Navbar">
      <span>{users.username}</span>
      <Link to="/"> Fitness Tracker</Link>
      <Link to="/Activities"> Activities</Link>
      <Link to="/"> Routines</Link>
      {!loggedIn ? (
        <>
          <Link to="/login"> LogIn</Link>
          <Link to="/register">Register</Link>
        </>
      ) : null}
      {loggedIn ? (
        <>
          <Link
            onClick={() => {
              logoutUser();
              // navigate("/login");

              setLoggedIn(false);
            }}
            to="/login"
          >
            Log Out
          </Link>

          <Link to="/CreateRoutine">Create A Routine</Link>

          <Link to="/Profile">Profile</Link>
        </>
      ) : null}
    </nav>
  );
}

export default Navigation;
