/**
 * Spinner – zero-dependency loading indicator using Tailwind CSS animations.
 *
 * Props:
 *   size  – "sm" | "lg"  (default "lg")
 *           "sm" → small white spinning ring, for use inside buttons
 *           "lg" → four staggered bouncing dots, for full-page / section loaders
 */
export default function Spinner({ size = "lg", dots = true }) {
    if (size === "sm") {
        return (
            <span
                className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                aria-label="Loading"
                role="status"
            />
        );
    }

    // "lg" — four bouncing dots
    return (
        <div className="flex items-center justify-center gap-2" aria-label="Loading" role="status">
            {dots ? (
                <>
                    <span className="h-3 w-3 rounded-full bg-red-500 animate-bounce [animation-delay:-0.45s]" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-3 w-3 rounded-full bg-green-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce" />
                </>
            ) : (
                <>
                    <span className="rounded-full text-2xl text-red-500 animate-bounce [animation-delay:-1s]">L</span>
                    <span className="rounded-full text-2xl text-yellow-500 animate-bounce [animation-delay:-0.90s]">O</span>
                    <span className="rounded-full text-2xl text-green-500 animate-bounce [animation-delay:-0.75s]">A</span>
                    <span className="rounded-full text-2xl text-pink-500 animate-bounce [animation-delay:-0.60s]">D</span>
                    <span className="rounded-full text-2xl text-black animate-bounce [animation-delay:-0.45s]">I</span>
                    <span className="rounded-full text-2xl text-purple-500 animate-bounce [animation-delay:-0.30s]">N</span>
                    <span className="rounded-full text-2xl text-orange-500 animate-bounce">G</span>
                </>
            )}
        </div>
    );
}
