import "./App.css";
import Routines from "./components/Routines";
import User from "./components/User";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import SingleRoutine from "./components/SingleRoutine";
import NewRoutine from "./components/CreateRoutine";
import UpdateRoutine from "./components/UpdateRoutine";
import UpdateRA from "./components/UpdateRA";
import Activities from "./components/Activities";
import NewActivity from "./components/CreateActivity";
import ActivityToRoutine from "./components/ActivityToRoutine";
import SingleActivity from "./components/SingleActivity";
import UpdateActivity from "./components/UpdateActivity";
import MyRoutines from "./components/MyRoutines";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Routes>
        <Route path="/" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/:method" element={<User />} />
        <Route path="/createRoutine" element={<NewRoutine />} />
        <Route path="/createActivity" element={<NewActivity />} />
        <Route path="/ActivityToRoutine" element={<ActivityToRoutine />} />
        <Route path="/MyRoutines" element={<MyRoutines />} />
        <Route path="/routines/:routineId" element={<SingleRoutine />} />
        <Route
          path="/activities/:activityId/routines"
          element={<SingleActivity />}
        />

        <Route path="/edit/:routineId" element={<UpdateRoutine />} />
        <Route path="/change/:activityId" element={<UpdateActivity />} />
        <Route path="/update/:routineId/:activityId" element={<UpdateRA />} />
      </Routes>
    </div>
  );
}
export default App;
