import { Routes } from "@generouted/react-router/lazy";
import { createRoot } from "react-dom/client";
import Provider from "./provider";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <Routes />
  </Provider>
);
