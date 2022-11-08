import { useContext } from "react";
import RoutinesContext from "../context/RoutinesContext";

const useRoutines = () => {
  const { routines, setRoutines } = useContext(RoutinesContext);

  return {
    routines,
    setRoutines,
  };
};

export default useRoutines;
