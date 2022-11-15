import { fetchRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import { createRA } from "../api/ra";
import styles from "../styles/MyRoutines.module.css";
import ActivitiesForMyRoutines from "./ActivitiesForMyRoutines";
function MyRoutines() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const { users } = useUsers();
  const [routine_id, setRoutine] = useState();
  const [activity_id, setActivity] = useState();
  const [duration, setDuration] = useState();
  const [count, setCount] = useState();

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info);
      console.log("info:", info);
    }
    getRoutines();
  }, []);

  function displayEdit() {
    setShowEdit(true);
  }

  return (
    <>
      <h1>My Routines</h1>

      {routines.map((routine) => {
        return (
          <div>
            {routine.activities.map((activity) => {
              return (
                <div>
                  {routine.creatorName === users.username ? (
                    <div>
                      <h4>
                        My routine #{routine.id}: {routine.goal}
                        <h6>
                          Linked to Activity #{activity.id}: {activity.name}{" "}
                        </h6>
                      </h4>

                      <Button variant="warning" onClick={displayEdit}>
                        {" "}
                        Add Another Activity
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
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default MyRoutines;
