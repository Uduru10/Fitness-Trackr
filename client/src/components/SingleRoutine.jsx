import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchSingleRoutine, deleteRoutineById } from "../api/routines";
import { deleteRA } from "../api/ra";
import useUsers from "../hooks/useUsers";
import Button from "react-bootstrap/Button";
import styles from "../styles/SingleRoutine.module.css";

function SingleRoutine() {
  const { users } = useUsers();
  const navigate = useNavigate();
  const [singleRoutine, setSingleRoutine] = useState({});
  const { routineId } = useParams();
  console.log("The routineId is", routineId);

  useEffect(() => {
    async function getRoutineById() {
      const listing = await fetchSingleRoutine(routineId);
      setSingleRoutine(listing);
    }

    getRoutineById();
  }, []);
  console.log("singleRoutine", singleRoutine);
  return (
    <div>
      <h1>Routine: {singleRoutine.name}</h1>
      {users.id === singleRoutine.creator_id ? (
        <Button
          variant="warning"
          onClick={async () => {
            navigate(`/edit/${singleRoutine.id}`);
          }}
        >
          Edit this Routine
        </Button>
      ) : null}

      <h2>Made by: {singleRoutine.creatorName}</h2>
      <h3>Goal: {singleRoutine.goal}</h3>
      <h6>Id #{singleRoutine.id}</h6>
      {users.id === singleRoutine.creator_id ? (
        <Button
          variant="warning"
          onClick={async () => {
            await deleteRoutineById(singleRoutine.id);
            navigate("/");
          }}
        >
          Delete this routine
        </Button>
      ) : null}

      {singleRoutine?.activities?.map((activity) => {
        return (
          <div key={activity.id}>
            <h3>Activity: {activity.name}</h3>
            <h4>description: {activity.description}</h4>
            <h5>Count: {activity.count}</h5>
            <h5> Duration: {activity.duration}</h5>
            <h6>Id #{activity.id}</h6>

            {users.id === singleRoutine.creator_id ? (
              <Button
                className={styles.editRA}
                variant="warning"
                onClick={async () => {
                  navigate(`/update/${routineId}/${activity.id}`);
                }}
              >
                Edit the routine activity
              </Button>
            ) : null}
            {users.id === singleRoutine.creator_id ? (
              <Button
                variant="warning"
                onClick={async () => {
                  deleteRA(singleRoutine.id, activity.id);
                  navigate(`/MyRoutines`);
                }}
              >
                Delete this Activity
              </Button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default SingleRoutine;
