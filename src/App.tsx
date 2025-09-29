import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ScanPage } from "./pages/ScanPage.tsx";
import { RepsPage } from "./pages/RepsPage.tsx";
import { LandingPage } from "./pages/LandingPage.tsx";
import { QuizPage } from "./pages/QuizPage.tsx";
import {SolutionsInfoPage} from "./pages/SolutionsInfoPage.tsx";
import {ProblemsInfoPage} from "./pages/ProblemsInfoPage.tsx";

export default function App() {
    const location = useLocation();

    // This hook runs every time the URL path changes
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls the page to the top
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Representatives" element={<RepsPage />} />
            <Route path="/Quiz" element={<QuizPage />} />
            <Route path="/ScanPage" element={<ScanPage />} />
            <Route path="/SolutionsPage" element={<SolutionsInfoPage/>} />
            <Route path="/ProblemsPage" element={<ProblemsInfoPage/>} />
        </Routes>
    );
}
