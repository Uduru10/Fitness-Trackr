import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import RoutineProvider from "./components/routineProvider";
import ActivitiesProvider from "./components/activityProvider";
import UsersProvider from "./components/usersProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RoutineProvider>
        <ActivitiesProvider>
          <App />
        </ActivitiesProvider>
      </RoutineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
