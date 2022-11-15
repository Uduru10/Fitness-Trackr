import { useEffect } from "react";
import { fetchActivities } from "../api/activities";
import useActivities from "../hooks/useActivities";
import styles from "../styles/ActivitiesForMyRoutines.module.css";

function ActivitiesForMyRoutines() {
  const { activities, setActivities } = useActivities([]);
  useEffect(() => {
    async function getActivities() {
      const info = await fetchActivities();
      setActivities(info);
      console.log("This is the activities info", info);
    }
    getActivities();
  }, []);

  return (
    <div className={styles.activities}>
      <h1>Activities</h1>
      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <h3>
              Activity#{activity.id}: {activity.name}{" "}
            </h3>
            <h4> Description: {activity.description}</h4>
          </div>
        );
      })}
    </div>
  );
}

export default ActivitiesForMyRoutines;
