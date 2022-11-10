import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { editRoutine } from "../api/routines";

export default function UpdateRoutine() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [is_public, setPublic] = useState(true);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  return (
    <div>
      <h3> Edit Routine</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ is_public, name, goal, routineId });
          const result = await editRoutine(is_public, name, goal, +routineId);
          console.log("Awaiting editRoutine", result);
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
