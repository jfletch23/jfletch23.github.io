import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// ✅ make sure Tailwind/global styles are loaded
import "./index.css";

const repoName = '/';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter basename={repoName}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
