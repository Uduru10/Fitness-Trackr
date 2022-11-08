import { useEffect, useState } from "react";
import RoutinesContext from "../context/RoutinesContext";
import { fetchRoutines } from "../api/routines";

export default function RoutineProvider({ children }) {
  const [routines, setRoutines] = useState([]);
  useEffect(() => {
    async function getRoutines() {
      const routines = await fetchRoutines();
      setRoutines(routines);
    }
    getRoutines();
  }, []);
  return (
    <RoutinesContext.Provider value={{ routines, setRoutines }}>
      {" "}
      {children}
    </RoutinesContext.Provider>
  );
}
