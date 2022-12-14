import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoutine } from "../api/routines";
import Button from "react-bootstrap/Button";

export default function NewRoutine() {
  const navigate = useNavigate();
  const [is_public, setPublic] = useState();
  const [name, setName] = useState();
  const [goal, setGoal] = useState();

  return (
    <div>
      <h3> Create a new Routine</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRoutine(is_public, name, goal);
          console.log("Awaiting createRoutine", result);
          navigate("/");
        }}
      >
        <label>Public</label>
        <input
          type="checkbox"
          placeholder="is_public true or false"
          value={is_public}
          onChange={() => {
            setPublic(!is_public);
          }}
        ></input>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="goal"
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
          }}
        ></input>
        <Button variant="warning" type="submit">
          {" "}
          Submit
        </Button>
      </form>
    </div>
  );
}
