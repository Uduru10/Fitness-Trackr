import { fetchRoutines } from "../api/routines";
import useRoutines from "../hooks/useRoutines";

import { useEffect } from "react";
import styles from "../styles/RoutineActivity.module.css";

function RoutineActivity() {
  const { routines, setRoutines } = useRoutines([]);

  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info);
      console.log("info in the RoutineActivity component:", info);
    }
    getRoutines();
  }, []);

  console.log("routines in the RoutineActivity component:", routines);
  return (
    <>
      {routines.map((routine) => {
        return (
          <div className={styles.pairs}>
            <div key={routine.id}>
              <h5>
                {" "}
                Routine #{routine.id}: {routine.name}{" "}
              </h5>

              {routine?.activities.map((activity) => {
                return (
                  <div>
                    <h6>+Activity #{activity.id}</h6>
                    <h6>Count: {activity.count}</h6>
                    <h6>Duration: {activity.duration}</h6>
                  </div>
                );
              })}
              <h6>Made by: {routine.creatorName}</h6>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RoutineActivity;
