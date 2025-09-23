import { Routes, Route } from "react-router-dom";
// NOTE: your filename looked like "Hompage.tsx" in the import you sent.
// It should be "Homepage.tsx". Update the import path/filename accordingly.
import { Homepage} from "./pages/Hompage.tsx";
import {ScanPage} from "./pages/ScanPage.tsx";



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/scan" element={<ScanPage />} />
        </Routes>
    );
}
