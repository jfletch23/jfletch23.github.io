import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

// ✅ make sure Tailwind/global styles are loaded
import "./index.css";

const repoName = '/';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HashRouter basename={repoName}>
            <App />
        </HashRouter>
    </React.StrictMode>
);
