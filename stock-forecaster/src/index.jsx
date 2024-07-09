import React from "react";
import ReactDOM from "react-dom/client";
import Particles from "./Components.jsx/Particles.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Particles id="particles" />
    <App />
  </React.StrictMode>
);
