import { Link } from "react-router-dom";
import { logoutUser } from "../api/users";
import useUsers from "../hooks/useUsers";
import styles from "../styles/Navigation.module.css";
import F1 from "../assets/images/Frame 1.svg";

function Navigation() {
  const { loggedIn, setLoggedIn, users } = useUsers();
  console.log("users:", users);
  return (
    <nav className={styles.background}>
      <span className={styles.title}>
        {" "}
        <img src={F1} className={styles.logo} />
      </span>
      <span className={styles.welcome}>Welcome, {users.username}</span>

      <Link className={styles.text} to="/">
        {" "}
        Routines
      </Link>
      <Link className={styles.text} to="/activities">
        {" "}
        Activities
      </Link>
      {!loggedIn ? (
        <>
          <Link className={styles.text} to="/register">
            Register
          </Link>
          <Link className={styles.text} to="/login">
            {" "}
            LogIn
          </Link>
        </>
      ) : null}
      {loggedIn ? (
        <>
          <Link className={styles.text} to="/createRoutine">
            Create A Routine
          </Link>
          <Link className={styles.text} to="/createActivity">
            Create An Activity
          </Link>
          <Link className={styles.text} to="/ActivityToRoutine">
            Activity To Routine
          </Link>
          <Link className={styles.text} to="/MyRoutines">
            My Routines
          </Link>
          <Link
            className={styles.text}
            onClick={() => {
              logoutUser();
              // navigate("/login");

              setLoggedIn(false);
            }}
            to="/login"
          >
            Log Out
          </Link>
        </>
      ) : null}
    </nav>
  );
}

export default Navigation;
