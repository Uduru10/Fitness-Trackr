import "./App.css";
import useRoutines from "./hooks/useRoutines";
import useActivies from "./hooks/useActivities";
import Navigation from "./components/navigation";
import { Routes, Route } from "react-router-dom";

function App() {
  const { routines } = useRoutines();
  const { activities } = useActivies;

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" />
      </Routes>
    </div>
  );
}
export default App;
