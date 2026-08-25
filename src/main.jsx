import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PackageProvider } from "./context/PackageContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <BrowserRouter>
        <PackageProvider>
            <App />
        </PackageProvider>
    </BrowserRouter>,
    // </StrictMode>,
);
