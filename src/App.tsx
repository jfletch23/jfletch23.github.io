import { Routes, Route } from "react-router-dom";
import {ScanPage} from "./pages/ScanPage.tsx";
import {RepsPage} from "./pages/RepsPage.tsx";
import {LandingPage} from "./pages/LandingPage.tsx";
import {QuizPage} from "./pages/QuizPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ScanPage" element={<ScanPage />} />
            <Route path="/Representatives" element={<RepsPage />} />
            <Route path="/Quiz" element={<QuizPage />} />
        </Routes>
    );
}
