/**
 * Spinner – zero-dependency loading indicator using Tailwind CSS animations.
 *
 * Props:
 *   size  – "sm" | "lg"  (default "lg")
 *           "sm" → small white spinning ring, for use inside buttons
 *           "lg" → three staggered bouncing dots, for full-page / section loaders
 */
export default function Spinner({ size = "lg" }) {
    if (size === "sm") {
        return (
            <span
                className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                aria-label="Loading"
                role="status"
            />
        );
    }

    // "lg" — three bouncing dots
    return (
        <div
            className="flex items-center justify-center gap-2"
            aria-label="Loading"
            role="status">
            <span className="h-3 w-3 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-3 w-3 rounded-full bg-primary-500 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-3 w-3 rounded-full bg-primary-500 animate-bounce" />
        </div>
    );
}
