import { Routes, Route } from "react-router-dom";
import {Homepage} from "./pages/Homepage.tsx";
import {ScanPage} from "./pages/ScanPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ScanPage" element={<ScanPage />} />
        </Routes>
    );
}
