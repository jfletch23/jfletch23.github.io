// src/components/RepresentativeList.tsx
import type {Representative} from "../lib/types.ts";
import { RepresentativeCard } from "./RepresentativeCard";

type Props = {
    reps: {
        federal: Representative[];
        stateLocal: Representative[];
    };
    selectedRep: Representative | null;
    onSelect: (rep: Representative) => void;
};

export function RepresentativeList({ reps, selectedRep, onSelect }: Props) {
    return (
        <div className="space-y-6">
            {/* Federal Section */}
            <div>
                <h2 className="font-semibold text-white mb-2">Federal Representatives</h2>
                {reps.federal.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                        No federal representatives found.
                    </div>
                ) : (
                    reps.federal.map((rep) => (
                        <RepresentativeCard
                            key={rep.id}
                            rep={rep}
                            selected={selectedRep?.id === rep.id}
                            onSelect={() => onSelect(rep)}
                        />
                    ))
                )}
            </div>

            {/* State/Local Section */}
            <div>
                <h2 className="font-semibold mb-2 text-white">State / Local Representatives</h2>
                {reps.stateLocal.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                        No state/local representatives found.
                    </div>
                ) : (
                    reps.stateLocal.map((rep) => (
                        <RepresentativeCard
                            key={rep.id}
                            rep={rep}
                            selected={selectedRep?.id === rep.id}
                            onSelect={() => onSelect(rep)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}