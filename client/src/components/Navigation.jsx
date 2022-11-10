import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/users";
import useUsers from "../hooks/useUsers";

function Navigation() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, users } = useUsers();
  console.log("users:", users);
  return (
    <nav className="Navbar">
      <span>Fitness Tracker</span>
      <span>Welcome, {users.username}</span>

      <Link to="/"> Routines</Link>
      <Link to="/activities"> Activities</Link>
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

          <Link to="/createRoutine">Create A Routine</Link>

          <Link to="/profile">Profile</Link>
        </>
      ) : null}
    </nav>
  );
}

export default Navigation;
