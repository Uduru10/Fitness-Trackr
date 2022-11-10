import { useEffect, useState } from "react";
import UsersContext from "../context/UsersContext";
import { fetchMe } from "../api/users";

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState({ users: "Guest" });
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    async function getMe() {
      const users = await fetchMe();
      console.log("users in UsersProvider component:", users);
      setUsers(users);
      if (users.loggedIn === false) {
        setUsers({ users: "Guest" });
        setLoggedIn(false);
      } else {
        setUsers(users);
        setLoggedIn(true);
      }
    }
    getMe();
  }, [loggedIn]);
  return (
    <UsersContext.Provider value={{ users, setUsers, loggedIn, setLoggedIn }}>
      {children}
    </UsersContext.Provider>
  );
}
