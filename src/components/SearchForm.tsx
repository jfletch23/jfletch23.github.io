import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";

type LocationSuggestion = {
    display_name: string;
    lat: string;
    lon: string;
    address?: {
        house_number?: string;
        road?: string;
        postcode?: string;
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        country?: string;
    };
};

type SearchFormProps = {
    onSearch: (params: { lat: number; lng: number; locationName: string }) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null);

    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounced search function
    const searchLocations = async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=jsonv2&addressdetails=1&limit=5&countrycodes=us`;

            const response = await fetch(url, {
                headers: {
                    "Accept-Language": "en",
                    "User-Agent": "RepresentativesFinder/1.0"
                }
            });

            if (!response.ok) throw new Error(`Nominatim error ${response.status}`);

            const data = await response.json();

            // Filter and limit to 4 most relevant results
            const filtered = (data || [])
                .filter((item: LocationSuggestion) => {
                    const addr = item.address;
                    if (!addr) return false;

                    // Keep: Addresses, Cities/neighborhoods, States, ZIP areas
                    return (
                        (addr.house_number && addr.road) || // Address
                        addr.city || addr.town || addr.village || // City/neighborhood
                        (addr.state && !addr.city && !addr.town && !addr.village) || // State only
                        addr.postcode // ZIP code area
                    );
                })
                .slice(0, 4);

            setSuggestions(filtered);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes with debouncing
    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (query && !selectedLocation) {
                searchLocations(query);
            }
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, selectedLocation]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setSelectedLocation(null);

        if (!value) {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const formatDisplayName = (suggestion: LocationSuggestion): string => {
        const addr = suggestion.address;
        if (!addr) return suggestion.display_name;

        // Format address: "6 mara road" not "6, mara road"
        if (addr.house_number && addr.road) {
            return `${addr.house_number} ${addr.road}, ${addr.city || addr.town || addr.village || ''}, ${addr.state || ''}`.replace(/, ,/g, ',').replace(/,$/, '');
        }

        // City/neighborhood format
        if (addr.city || addr.town || addr.village) {
            const city = addr.city || addr.town || addr.village;
            return `${city}, ${addr.state || ''}`.replace(/,$/, '');
        }

        // ZIP code format
        if (addr.postcode) {
            const city = addr.city || addr.town || addr.village || '';
            return city ? `${addr.postcode}, ${city}, ${addr.state || ''}` : `${addr.postcode}, ${addr.state || ''}`;
        }

        // State format
        if (addr.state && !addr.city && !addr.town && !addr.village) {
            return addr.state;
        }

        return suggestion.display_name;
    };

    const handleSuggestionClick = (suggestion: LocationSuggestion) => {
        const formattedName = formatDisplayName(suggestion);
        setQuery(formattedName);
        setSelectedLocation(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedLocation) {
            // If no location selected but there are suggestions, use the first one
            if (suggestions.length > 0) {
                const firstSuggestion = suggestions[0];
                handleSuggestionClick(firstSuggestion);
                onSearch({
                    lat: parseFloat(firstSuggestion.lat),
                    lng: parseFloat(firstSuggestion.lon),
                    locationName: firstSuggestion.display_name
                });
            }
            return;
        }

        onSearch({
            lat: parseFloat(selectedLocation.lat),
            lng: parseFloat(selectedLocation.lon),
            locationName: selectedLocation.display_name
        });
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (inputRef.current && !inputRef.current.contains(target) && !target.closest('.suggestions-dropdown')) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="bg-white border-b shadow-sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Find Your Representatives</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                            Location
                        </Label>

                        <div className="relative">
                            <Input
                                ref={inputRef}
                                id="location"
                                value={query}
                                onChange={handleInputChange}
                                placeholder="Enter ZIP code, city, or address"
                                className="w-full pr-10"
                                autoComplete="off"
                            />

                            {loading && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                </div>
                            )}

                            {/* Suggestions dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="suggestions-dropdown absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleSuggestionClick(suggestion);
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleSuggestionClick(suggestion);
                                            }}
                                        >
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatDisplayName(suggestion)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                            <strong>Note:</strong> Broad locations like states or large cities may not show local representatives. Enter a ZIP code or specific address for complete results.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
                        disabled={!query.trim()}
                    >
                        Find Representatives
                    </Button>
                </form>
            </div>
        </div>
    );
}