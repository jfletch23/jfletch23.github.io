// src/pages/RepsPage.tsx
import { useState } from "react";
import { SearchForm} from "../components/SearchForm.tsx";
import { RepresentativeList } from "../components/RepresentativeList";
import { EmailTemplate } from "../components/EmailTemplate";
import type {Representative} from "../lib/types";
import {getRepresentativesByLocation} from "../lib/api.ts";

export function RepsPage() {
    const [reps, setReps] = useState<{ federal: Representative[]; stateLocal: Representative[] }>({
        federal: [],
        stateLocal: [],
    });
    const [selectedRep, setSelectedRep] = useState<Representative | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchLocation, setSearchLocation] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSearch = async (params: { lat: number; lng: number; locationName: string }) => {
        setLoading(true);
        setSelectedRep(null);
        setError("");
        setSearchLocation(params.locationName);

        try {
            const results = await getRepresentativesByLocation(params.lat, params.lng, params.locationName);
            setReps({
                federal: results.federal,
                stateLocal: results.stateLocal
            });

            // If no local reps found and location seems broad, show info message
            if (results.stateLocal.length === 0 && isBroadLocation(params.locationName)) {
                setError("No local representatives found for this broad location. Try entering a specific ZIP code or address for local results.");
            }
        } catch (err) {
            console.error("❌ Error fetching reps", err);
            setError("Unable to find representatives for this location. Please try a different search or check your spelling.");
            setReps({ federal: [], stateLocal: [] });
        } finally {
            setLoading(false);
        }
    };

    // Helper function to detect if a location is too broad
    const isBroadLocation = (locationName: string): boolean => {
        const broadTerms = [
            ', United States',
            'County,',
            'State,',
            // State names without cities
            ', New York, United States',
            ', California, United States',
            ', Texas, United States',
            ', Florida, United States'
        ];

        return broadTerms.some(term => locationName.includes(term)) &&
            !locationName.includes('ZIP') &&
            !locationName.match(/\d{5}/); // No ZIP code in the name
    };

    return (
        <div className="flex h-screen">
            {/* Left column - Search and Representative List */}
            <div className="w-1/2 bg-[#1f1f1f] flex flex-col">
                {/* Search form */}
                <SearchForm onSearch={handleSearch} />

                {/* Representative List with scroll */}
                <div className="flex-1 overflow-y-auto p-4">
                    {error && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-800">{error}</p>
                        </div>
                    )}

                    {searchLocation && !loading && (
                        <div className="mb-4">
                            <p className="text-sm text-white">
                                Showing representatives for: <span className="font-medium">{searchLocation}</span>
                            </p>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                            <span className="text-sm text-white">Finding representatives...</span>
                        </div>
                    ) : (
                        <RepresentativeList
                            reps={reps}
                            selectedRep={selectedRep}
                            onSelect={setSelectedRep}
                        />
                    )}
                </div>
            </div>

            {/* Right column - Email Template */}
            <div className="w-1/2 bg-[#2a2a2a]">
                <div className="h-full overflow-y-auto p-4">
                    <EmailTemplate selectedRep={selectedRep} />
                </div>
            </div>
        </div>
    );
}