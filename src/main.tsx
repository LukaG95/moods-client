import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import { TransitionProvider } from "./context/TransitionContext";
import "@/styles/global.scss";
import "@/styles/_fonts.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TransitionProvider>
          <App />
        </TransitionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
