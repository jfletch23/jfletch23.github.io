import { Routes, Route } from "react-router-dom";
import {Homepage} from "./pages/Homepage.tsx";
import {ScanPage} from "./pages/ScanPage.tsx";
import {RepsPage} from "./pages/RepsPage.tsx";
import {TestLandingPage} from "./pages/TestLandingPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ScanPage" element={<ScanPage />} />
            <Route path="/Representatives" element={<RepsPage />} />
            <Route path="/TestPage" element={<TestLandingPage/>} />
        </Routes>
    );
}
