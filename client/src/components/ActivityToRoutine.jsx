import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRA } from "../api/ra";
import RoutineActivity from "./RoutineActivity";
import Button from "react-bootstrap/Button";

export default function ActivityToRoutine() {
  const navigate = useNavigate();
  const [routine_id, setRoutine] = useState();
  const [activity_id, setActivity] = useState();
  const [duration, setDuration] = useState();
  const [count, setCount] = useState();

  return (
    <div>
      <h3>Link an Activity to a Routine</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRA(
            routine_id,
            activity_id,
            duration,
            count
          );
          console.log("Awaiting createRA", result);
          navigate("/");
        }}
      >
        <input
          type="text"
          placeholder="routine_id"
          value={routine_id}
          onChange={(e) => {
            setRoutine(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="activity_id"
          value={activity_id}
          onChange={(e) => {
            setActivity(e.target.value);
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
        <input
          type="text"
          placeholder="count"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        ></input>
        <Button variant="warning" type="submit">
          {" "}
          Submit
        </Button>
      </form>
      <h5>Routine Activity Pairs</h5>

      <div>
        <RoutineActivity />
      </div>
    </div>
  );
}
