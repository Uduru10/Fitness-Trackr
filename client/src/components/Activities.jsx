import { useEffect } from "react";
import { fetchActivities } from "../api/activities";
import useActivities from "../hooks/useActivities";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import styles from "../styles/Routines.module.css";
function Activities() {
  const navigate = useNavigate();
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
    <div>
      <h2>Activities List</h2>
      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <h2> {activity.name} </h2>
            <h4> Description: {activity.description}</h4>
            <Button
              className={styles.button}
              variant="warning"
              onClick={async () => {
                navigate(`/change/${activity.id}`);
              }}
            >
              Change the Activity
            </Button>
            <Button
              className={styles.button}
              variant="warning"
              onClick={() => {
                navigate(`/activities/${activity.id}/routines`);
              }}
            >
              See Routines
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default Activities;
