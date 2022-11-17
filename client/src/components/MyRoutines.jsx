import { fetchRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import Dropdown from "./Dropdown";

function MyRoutines() {
  const [routines, setRoutines] = useState([]);
  const { users } = useUsers();

  // const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info);
      console.log("info:", info);
    }
    getRoutines();
  }, []);

  // function displayEdit() {
  //   setShowEdit(true);
  // }
  console.log("routines:", routines);
  return (
    <div>
      <h1>My Routines</h1>
      <div>
        {routines.map((routine) => {
          return (
            <>
              {routine.creatorName === users.username ? (
                <div>
                  <h4>
                    Routine #{routine.id}: {routine.goal}
                  </h4>
                  {routine.activities.map((activity) => {
                    return (
                      <div>
                        <h6>
                          Linked to Activity #{activity.id}: {activity.name}
                        </h6>
                      </div>
                    );
                  })}
                  <Dropdown />
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
