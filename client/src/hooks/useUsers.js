import { useContext } from "react";
import UsersContext from "../context/UsersContext";

const useUsers = () => {
  const { users, setUsers, loggedIn, setLoggedIn } = useContext(UsersContext);

  return {
    users,
    setUsers,
    loggedIn,
    setLoggedIn,
  };
};

export default useUsers;
