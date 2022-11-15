import { fetchRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router";

function MyRoutines() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const { users } = useUsers();

  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info);
      console.log("info:", info);
    }
    getRoutines();
  }, []);

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
                        Activity #{activity.id}: {activity.name}
                      </h4>
                      <h6>
                        Tied with my routine #{routine.id}: {routine.goal}
                      </h6>
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
