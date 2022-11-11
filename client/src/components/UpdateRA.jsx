import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { editRA } from "../api/ra";

export default function UpdateRoutine() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <div>
      <h3> Edit Routine Activity</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ count, duration, routineId });
          const result = await editRA(count, duration, +routineId);
          console.log("Awaiting editRoutine", result);
          navigate("/");
        }}
      >
        <input
          type="text"
          placeholder="count"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="duration"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
