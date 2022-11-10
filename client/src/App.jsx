import "./App.css";
import Routines from "./components/Routines";
import User from "./components/User";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import SingleRoutine from "./components/SingleRoutine";
import NewRoutine from "./components/CreateRoutine";
import UpdateRoutine from "./components/UpdateRoutine";
import Activities from "./components/Activities";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/:method" element={<User />} />
        <Route path="/createRoutine" element={<NewRoutine />} />
        <Route path="/routines/:routineId" element={<SingleRoutine />} />
        <Route path="/edit/:routineId" element={<UpdateRoutine />} />
      </Routes>
    </div>
  );
}
export default App;
