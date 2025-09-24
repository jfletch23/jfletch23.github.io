import { Routes, Route } from "react-router-dom";
import {ScanPage} from "./pages/ScanPage.tsx";
import {RepsPage} from "./pages/RepsPage.tsx";
import {LandingPage} from "./pages/LandingPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ScanPage" element={<ScanPage />} />
            <Route path="/Representatives" element={<RepsPage />} />
        </Routes>
    );
}
