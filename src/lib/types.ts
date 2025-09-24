// Normalized type for both federal + state/local reps
export interface Representative {
    id: string;
    name: string;
    office: string;                  // e.g., "U.S. Senator" or "State Representative"
    level: "federal" | "stateLocal"; // category for grouping

    // Contact info (arrays since there may be multiple)
    emails?: string[];
    phones?: string[];
    faxes?: string[];
    addresses?: string[];
    websites?: string[];
    contactForms?: string[];
}
