import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PlaylistProvider } from "./context/PlaylistContext.jsx";
import "./styles/global.css";
import "./styles/layout.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </StrictMode>
);
