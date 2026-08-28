import { Star01 } from "@untitledui/icons";

// Placeholder faces for demo purposes only, from a service built for
// exactly this (generated/stand-in photos, not real people or customers).
// Swap for real, consented customer photos before any real launch.
const AVATARS = [
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=32",
    "https://i.pravatar.cc/150?img=47",
    "https://i.pravatar.cc/150?img=68",
];

export function TrustBadge({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
                {AVATARS.map((src) => (
                    <img key={src} src={src} alt="" loading="lazy" className="size-9 rounded-full border-2 border-ink object-cover" />
                ))}
            </div>

            <div>
                <div className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star01 key={i} fill="currentColor" className="size-3.5 text-brass" />
                    ))}
                </div>
                <p className="mt-1 font-mono text-xs text-mist">{label}</p>
            </div>
        </div>
    );
}
