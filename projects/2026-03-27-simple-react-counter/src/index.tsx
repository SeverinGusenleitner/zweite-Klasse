import React from "react";
import { createRoot } from "react-dom/client";
import {App} from "./App.tsx";
import './styles.css';

const rootEl = document.getElementById("root") as HTMLDivElement;

const root = createRoot(rootEl);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);