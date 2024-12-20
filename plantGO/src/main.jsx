import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { createBrowserRouter } from "react-router-dom";
import Sign from "./components/signin/Sign.jsx";
import Register from "./components/Navbar/Register.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </ClerkProvider>
  </StrictMode>
);
