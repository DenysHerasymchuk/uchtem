import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterTextProps {
    phrases: string[];
    typingSpeedMs?: number;
    erasingSpeedMs?: number;
    pauseMs?: number;
    className?: string;
}

/**
 * Types out each phrase, pauses, erases it, then moves to the next —
 * looping. Shows the first phrase fully on mount (no empty flash, and
 * screen readers / reduced-motion get a real static heading) and only
 * starts cycling after the initial pause.
 */
export function TypewriterText({ phrases, typingSpeedMs = 75, erasingSpeedMs = 40, pauseMs = 1800, className }: TypewriterTextProps) {
    const [text, setText] = useState(phrases[0] ?? "");
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion || phrases.length <= 1) return;

        let phraseIndex = 0;
        let charIndex = phrases[0]?.length ?? 0;
        let mode: "pause" | "typing" | "erasing" = "pause";
        let timeoutId: number;

        function tick() {
            if (mode === "pause") {
                mode = "erasing";
                timeoutId = window.setTimeout(tick, pauseMs);
                return;
            }

            if (mode === "erasing") {
                charIndex -= 1;
                setText(phrases[phraseIndex].slice(0, charIndex));
                if (charIndex <= 0) {
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    mode = "typing";
                    timeoutId = window.setTimeout(tick, 300);
                } else {
                    timeoutId = window.setTimeout(tick, erasingSpeedMs);
                }
                return;
            }

            // typing
            charIndex += 1;
            setText(phrases[phraseIndex].slice(0, charIndex));
            if (charIndex >= phrases[phraseIndex].length) {
                mode = "pause";
                timeoutId = window.setTimeout(tick, pauseMs);
            } else {
                timeoutId = window.setTimeout(tick, typingSpeedMs);
            }
        }

        timeoutId = window.setTimeout(tick, pauseMs);
        return () => window.clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phrases.join("|"), prefersReducedMotion]);

    return (
        <span className={className}>
            <span aria-hidden="true">
                {text}
                <span className="animate-blink text-brass">|</span>
            </span>
            <span className="sr-only">{phrases[0]}</span>
        </span>
    );
}
