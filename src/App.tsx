import { Routes, Route } from "react-router-dom";
// NOTE: your filename looked like "Homepage.tsx" in the import you sent.
// It should be "Homepage.tsx". Update the import path/filename accordingly.
import {Homepage} from "./Homepage.tsx";
import {ScanPage} from "./ScanPage.tsx";



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/ScanPage" element={<ScanPage />} />
        </Routes>
    );
}
