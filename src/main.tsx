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
                    <a href="#" className="hover:text-teal-500">About</a>
                    <a href="#" className="hover:text-teal-500">Contact</a>
                </div>
            </nav>
            <App />
        </HashRouter>
    </React.StrictMode>
);
