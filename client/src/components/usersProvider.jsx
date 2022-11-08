import { useEffect, useState } from "react";
import UsersContext from "../context/usersContext";
import { fetchUsers } from "../api/users";

export default function usersProvider({ children }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const users = await fetchUsers();
      setUsers(users);
    }
    getUsers();
  }, []);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {" "}
      {children}
    </UsersContext.Provider>
  );
}
