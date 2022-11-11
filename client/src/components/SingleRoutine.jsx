import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchSingleRoutine, deleteRoutineById } from "../api/routines";

function SingleRoutine() {
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

  return (
    <div>
      <h1>Routine: {singleRoutine.name}</h1>
      <button
        onClick={async () => {
          navigate(`/edit/${singleRoutine.id}`);
        }}
      >
        Edit this Routine
      </button>
      <h2>Made by: {singleRoutine.creatorName}</h2>
      <h3>Goal: {singleRoutine.goal}</h3>
      <h6>Id #{singleRoutine.id}</h6>
      <button
        onClick={async () => {
          await deleteRoutineById(singleRoutine.id);
          to = "/";
        }}
      >
        Delete this routine
      </button>
      {singleRoutine?.activities?.map((activity) => {
        return (
          <div key={activity.id}>
            <h3>Activity: {activity.name}</h3>
            <h4>description: {activity.description}</h4>
            <h5>Count: {activity.count}</h5>
            <h5> Duration: {activity.duration}</h5>
            <h6>Id #{activity.id}</h6>
            <button
              onClick={async () => {
                navigate(`/update/${singleRoutine.id}`);
              }}
            >
              Edit the routine activity
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SingleRoutine;
