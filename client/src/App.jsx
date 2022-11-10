import "./App.css";
import Routines from "./components/Routines";
import User from "./components/User";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Routines />} />
        <Route path="/:method" element={<User />} />
      </Routes>
    </div>
  );
}
export default App;
