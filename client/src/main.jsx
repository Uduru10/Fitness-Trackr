import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import RoutineProvider from "./components/RoutineProvider";
import ActivitiesProvider from "./components/ActivityProvider";
import UsersProvider from "./components/UsersProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersProvider>
        <RoutineProvider>
          <ActivitiesProvider>
            <App />
          </ActivitiesProvider>
        </RoutineProvider>
      </UsersProvider>
    </BrowserRouter>
  </React.StrictMode>
);
