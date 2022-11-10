import { fetchRoutines } from "../api/routines";
import { useEffect } from "react";
import useRoutines from "../hooks/useRoutines";

function Routines() {
  const { routines, setRoutines } = useRoutines([]);

  useEffect(() => {
    async function getRoutines() {
      const info = await fetchRoutines();
      setRoutines(info);
      console.log("info:", info);
    }
    getRoutines();
  }, []);
  return <div>{JSON.stringify(routines)}</div>;
}

export default Routines;
