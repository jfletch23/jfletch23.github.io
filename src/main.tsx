import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

// ✅ make sure Tailwind/global styles are loaded
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HashRouter>
            <nav className="w-full bg-[#2a2a2a] text-white px-6 py-4 flex justify-center">
                <div className="space-x-8 text-xl font-semibold">
                    <a href="#" className="hover:text-teal-500">Home</a>
                    <a href="#/ProblemsPage" className="hover:text-teal-500">Problems</a>
                    <a href="#/SolutionsPage" className="hover:text-teal-500">Solutions</a>
                    <a href="#/Quiz" className="hover:text-teal-500">Quiz</a>
                    <a href="#/ScanPage" className="hover:text-teal-500">Facial Scan</a>
                    <a href="#/Representatives" className="hover:text-teal-500">Representatives</a>
                </div>
            </nav>
            <App />
        </HashRouter>
    </React.StrictMode>
);
