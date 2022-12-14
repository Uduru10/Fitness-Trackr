import { useState } from "react";
import { registerUser, loginUser } from "../api/users";
import { useNavigate, useParams } from "react-router";
import useUsers from "../hooks/useUsers";
import Button from "react-bootstrap/Button";

export default function User() {
  const { method } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setLoggedIn } = useUsers();
  console.log("Error:", error);
  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          let result;
          if (method === "register") {
            result = await registerUser(username, password);
          }

          if (method === "login") {
            result = await loginUser(username, password);
          }
          console.log("Login/Register result", result);
          if (result.user) {
            setPassword("");
            setUsername("");
            setLoggedIn(true);
            navigate("/");
          } else {
            setError(result.message);
          }
        }}
      >
        {error && <h5>{error}</h5>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
        />
        <Button variant="warning" type="submit">
          {method === "register" ? "Register" : "Login"}
        </Button>
      </form>
    </div>
  );
}
