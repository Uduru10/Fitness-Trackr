import { fetchRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import useRoutines from "../hooks/useRoutines";
import { useNavigate } from "react-router";

function Routines() {
  const { routines, setRoutines } = useRoutines([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info);
      console.log("info:", info);
    }
    getRoutines();
  }, []);

  function RoutineMatches(routine, text) {
    return routine.name.toLowerCase().includes(text);
  }

  const filteredRoutines = routines.filter((routine) =>
    RoutineMatches(routine, searchTerm)
  );
  const routinesToDisplay = searchTerm.length ? filteredRoutines : routines;
  return (
    <>
      <div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <h1> Routines</h1>
      </div>
      {routinesToDisplay.map((routine) => {
        return (
          <div key={routine.id}>
            <h3>Routine: {routine.name}</h3>
            <h4>Goal: {routine.goal}</h4>
            <button
              onClick={() => {
                navigate(`/routines/${routine.id}`);
              }}
            >
              See Activities
            </button>
            <h6>Made by: {routine.creatorName}</h6>
          </div>
        );
      })}
    </>
  );
}

export default Routines;
