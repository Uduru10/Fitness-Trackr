import { useEffect, useState } from "react";
import ActivitiesContext from "../context/ActivitiesContext";
import { fetchActivities } from "../api/activities";

export default function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    async function getActivities() {
      const activities = await fetchActivities();
      setActivities(activities);
    }
    getActivities();
  }, []);
  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {" "}
      {children}
    </ActivitiesContext.Provider>
  );
}
