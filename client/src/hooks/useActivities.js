import { useContext } from "react";
import ActivitiesContext from "../context/ActivitiesContext";

const useActivies = () => {
  const { activities, setActivities } = useContext(ActivitiesContext);

  return {
    activities,
    setActivities,
  };
};

export default useActivies;
