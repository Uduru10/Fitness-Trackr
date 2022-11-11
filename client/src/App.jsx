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
        <Route path="/routines/:routineId" element={<SingleRoutine />} />
        <Route path="/edit/:routineId" element={<UpdateRoutine />} />
        <Route path="/update/:routineId" element={<UpdateRA />} />
      </Routes>
    </div>
  );
}
export default App;
