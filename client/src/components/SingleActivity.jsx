import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchRoutines } from "../api/routines";

function SingleActivity() {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const { activityId } = useParams();
  console.log("The activityId is", activityId);

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
      {routines.map((routine) => {
        return (
          <div>
            {routine.activities.map((activity) => {
              return (
                <div>
                  {activity.id === +activityId ? (
                    <div>
                      Activity: {activity.name}
                      <h2>
                        Routine #{routine.id}: {routine.name}
                      </h2>
                      <h3>Goal: {routine.goal}</h3>
                      <h4>Creator: {routine.creatorName}</h4>
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

export default SingleActivity;
