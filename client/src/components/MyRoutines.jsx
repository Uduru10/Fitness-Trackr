import { fetchRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import styles from "../styles/MyRoutines.module.css";

import Button from "react-bootstrap/Button";
import useActivities from "../hooks/useActivities";
import { createRA } from "../api/ra";
function MyRoutines() {
  const [routines, setRoutines] = useState([]);
  const [duration, setDuration] = useState("");
  const [count, setCount] = useState("");
  const { users } = useUsers();
  const { activities } = useActivities();

  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info);
    }
    getRoutines();
  }, []);

  return (
    <div>
      <h1>My Routines</h1>
      <div>
        {routines.map((routine) => {
          return (
            <>
              {routine.creatorName === users.username ? (
                <div key={routine.id}>
                  <h4>
                    Routine #{routine.id}: {routine.goal}
                  </h4>
                  {routine.activities.map((activity) => {
                    return (
                      <div key={activity.id}>
                        <h6>
                          Linked to Activity #{activity.id}: {activity.name}
                        </h6>
                      </div>
                    );
                  })}
                  <h3>Dropdown Edition</h3>
                  <form
                    className={styles.dropdown}
                    onSubmit={async (e) => {
                      e.preventDefault();
                      console.log("routine.id", routine.id);
                      const activity_id = e.target[0].value;
                      const result = await createRA(
                        routine.id,
                        activity_id,
                        duration,
                        count
                      );
                      console.log("Awaiting createRA", result);
                      window.location.reload(true);
                    }}
                  >
                    <select>
                      {activities?.map((activity) => {
                        return (
                          <option value={activity.id}>{activity.name}</option>
                        );
                      })}
                    </select>
                    ;<label>Duration</label>
                    <input
                      type="text"
                      placeholder="duration"
                      value={duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                      }}
                    />
                    <label>Count</label>
                    <input
                      type="text"
                      placeholder="count"
                      value={count}
                      onChange={(e) => {
                        setCount(e.target.value);
                      }}
                    />
                    <Button variant="warning" type="submit">
                      Submit
                    </Button>
                  </form>
                  {/* <h3>Before Dropdown Edition</h3>
                  <Button variant="warning" onClick={displayEdit}>
                    Add Activity
                  </Button>
                  {showEdit === true ? (
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
                      <div className={styles.activities}>
                        <ActivitiesForMyRoutines />
                      </div>
                      <div>
                        <label></label>
                        <input
                          type="text"
                          placeholder="routine_id"
                          value={routine_id}
                          onChange={(e) => {
                            setRoutine(e.target.value);
                          }}
                        />
                        <label></label>
                        <input
                          type="text"
                          placeholder="activity_id"
                          value={activity_id}
                          onChange={(e) => {
                            setActivity(e.target.value);
                          }}
                        />
                        <label></label>
                        <input
                          type="text"
                          placeholder="duration"
                          value={duration}
                          onChange={(e) => {
                            setDuration(e.target.value);
                          }}
                        />
                        <label></label>
                        <input
                          type="text"
                          placeholder="count"
                          value={count}
                          onChange={(e) => {
                            setCount(e.target.value);
                          }}
                        />
                        <Button variant="warning" type="submit">
                          Submit
                        </Button>
                      </div>
                    </form>
                  ) : null} */}
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default MyRoutines;
