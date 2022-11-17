import { useState, useEffect } from "react";
import { DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { useNavigate } from "react-router-dom";
import { fetchActivities } from "../api/activities";
import { createRA } from "../api/ra";
import styles from "../styles/MyRoutines.module.css";
import ActivitiesForMyRoutines from "./ActivitiesForMyRoutines";
function Dropdown() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [routine_id, setRoutine] = useState();
  const [activity_id, setActivity] = useState();
  const [duration, setDuration] = useState();
  const [count, setCount] = useState();
  useEffect(() => {
    async function getActivities() {
      const info = await fetchActivities();
      setActivities(info);
      console.log("info:", info);
    }
    getActivities();
  }, []);
  return (
    <>
      {" "}
      <h3>Dropdown Edition</h3>
      <form
        className={styles.dropdown}
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRA(
            routine_id,
            activity_id,
            duration,
            count
          );
          console.log("Awaiting createRA", result);
          window.location.reload(true);
        }}
      >
        <DropdownButton variant="warning" title="Add Activity">
          {activities.map((activity) => {
            <DropdownItem
              onClick={async () => {
                const result = await createRA(
                  routine_id,
                  activity_id,
                  duration,
                  count
                );
              }}
            ></DropdownItem>;
            <select>
              <option>{activity.name}</option>
            </select>;
          })}
          <div className={styles.activities}>
            <ActivitiesForMyRoutines />
          </div>
          <label>Routine #</label>
          <input
            type="text"
            placeholder="routine_id"
            value={routine_id}
            onChange={(e) => {
              setRoutine(+e.target.value);
            }}
          />
          <label>Activity #</label>
          <input
            type="text"
            placeholder="activity_id"
            value={activity_id}
            onChange={(e) => {
              setActivity(+e.target.value);
            }}
          />
          <label>Duration</label>
          <input
            type="text"
            placeholder="duration"
            value={duration}
            onChange={(e) => {
              setDuration(+e.target.value);
            }}
          />
          <label>Count</label>
          <input
            type="text"
            placeholder="count"
            value={count}
            onChange={(e) => {
              setCount(+e.target.value);
            }}
          />
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </DropdownButton>
      </form>
    </>
  );
}

export default Dropdown;
