import type {Representative} from "./types";

const OPENSTATES_KEY = import.meta.env.VITE_OPENSTATES_API_KEY as string | undefined;
const OPENSTATES_BASE = "https://v3.openstates.org";

// -----------------------------------------
// Map OpenStates person → Representative
// -----------------------------------------
function mapOpenStatesPerson(p: any): Representative {
    console.debug("Mapping person:", p?.name, {
        id: p?.id,
        email: p?.email,
        offices: p?.offices,
        contact_details: p?.contact_details,
    });

    let office = "Representative";
    let category: "federal" | "stateLocal" = "stateLocal";

    const emails: string[] = [];
    const contactForms: string[] = [];

    if (p.email) {
        if (p.email.startsWith("http")) {
            contactForms.push(p.email);
        } else {
            emails.push(p.email);
        }
    }

    const emailOrUrl = p.email || "";

    // --------------------------
    // Detect Federal roles
    // --------------------------
    if (/\.(senate\.gov)/i.test(emailOrUrl)) {
        office = "U.S. Senator";
        category = "federal";
    } else if (/\.(house\.gov)/i.test(emailOrUrl)) {
        office = "U.S. Representative";
        category = "federal";
    }

    // --------------------------
    // Detect State/Local Senator
    // --------------------------
    if (category === "stateLocal") {
        // Look at their name, given titles, or OpenStates extras
        const roleName = (p.current_role?.title || p.name || "").toLowerCase();
        if (roleName.includes("senator")) {
            office = "State Senator";
        } else if (roleName.includes("representative")) {
            office = "State Representative";
        }
    }

    // Collect phones, faxes, addresses, websites
    const phones: string[] = [];
    const faxes: string[] = [];
    const addresses: string[] = [];
    const websites: string[] = [];

    (p.offices || []).forEach((o: any) => {
        if (o.voice) phones.push(o.voice);
        if (o.fax) faxes.push(o.fax);
        if (o.address) addresses.push(o.address);
    });

    (p.contact_details || []).forEach((c: any) => {
        if (c.type === "voice" && c.value) phones.push(c.value);
        if (c.type === "fax" && c.value) faxes.push(c.value);
        if (c.type === "address" && c.value) addresses.push(c.value);
        if (c.type === "contact_form" && c.value) contactForms.push(c.value);
        if (c.type === "url" && c.value) websites.push(c.value);
    });

    (p.links || []).forEach((l: any) => {
        if (l.url) websites.push(l.url);
    });

    return {
        id: p.id,
        name: p.name,
        office,
        level: category,
        emails,
        phones,
        faxes,
        addresses,
        websites,
        contactForms,
    };
}


// -----------------------------------------
// Public function: get representatives by coordinates
// -----------------------------------------
export async function getRepresentativesByLocation(
    lat: number,
    lng: number,
    locationName: string
): Promise<{ federal: Representative[]; stateLocal: Representative[]; locationName: string }> {
    if (!OPENSTATES_KEY) throw new Error("Missing VITE_OPENSTATES_API_KEY");

    const url = `${OPENSTATES_BASE}/people.geo?lat=${lat}&lng=${lng}`;

    console.debug("🗺️ OpenStates request:", url, "for location:", locationName);
    const res = await fetch(url, { headers: { "X-API-KEY": OPENSTATES_KEY } });
    if (!res.ok) {
        const t = await res.text().catch(() => "");
        console.error("❌ OpenStates error:", res.status, t);
        throw new Error(`Unable to find representatives. Please try a more specific location or try again.`);
    }

    const data = await res.json();

    console.groupCollapsed("OpenStates raw results (first 3)");
    (data?.results ?? []).slice(0, 3).forEach((p: any, i: number) => {
        console.log(`Result #${i + 1}`, {
            id: p?.id,
            name: p?.name,
            email: p?.email,
            offices: p?.offices,
            contact_details: p?.contact_details,
        });
    });
    console.groupEnd();

    const all: Representative[] = (data?.results ?? []).map(mapOpenStatesPerson);

    return {
        federal: all.filter((r: Representative) => r.level === "federal"),
        stateLocal: all.filter((r: Representative) => r.level === "stateLocal"),
        locationName
    };
}

// Keep the old function for backward compatibility (if needed elsewhere)
export async function getRepresentatives(
    state: string,
    zip: string,
    address?: string
): Promise<{ federal: Representative[]; stateLocal: Representative[] }> {
    // Geocode with the old method for backward compatibility
    const q = [address, state, zip, "USA"].filter(Boolean).join(", ");
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(q)}`;

    const res = await fetch(url, { headers: { "Accept-Language": "en" } });
    if (!res.ok) throw new Error(`Geocoding failed`);

    const data = await res.json();
    const first = data?.[0];
    if (!first?.lat || !first?.lon) throw new Error("Location not found");

    const result = await getRepresentativesByLocation(
        parseFloat(first.lat),
        parseFloat(first.lon),
        q
    );

    return {
        federal: result.federal,
        stateLocal: result.stateLocal
    };
}