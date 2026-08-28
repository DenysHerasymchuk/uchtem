import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
    /** Numeric target value the count-up animates to */
    value: number;
    /** Text placed before the number, e.g. "+" */
    prefix?: string;
    /** Text placed after the number, e.g. "%", "M", "hrs saved / mo" */
    suffix?: string;
    /** Decimal places to display */
    decimals?: number;
    duration?: number;
    className?: string;
}

/**
 * Mono-numeral stat that counts up from 0 once it scrolls into view —
 * reinforces the brand's "precision" register rather than a static figure.
 */
export function AnimatedStat({ value, prefix = "", suffix = "", decimals = 0, duration = 1.4, className = "" }: AnimatedStatProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const prefersReducedMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        if (prefersReducedMotion) {
            setDisplay(value);
            return;
        }

        const controls = animate(0, value, {
            duration,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (latest) => setDisplay(latest),
        });

        return () => controls.stop();
    }, [isInView, value, duration, prefersReducedMotion]);

    return (
        <span ref={ref} className={`font-mono tabular-nums ${className}`}>
            {prefix}
            {display.toFixed(decimals)}
            {suffix}
        </span>
    );
}
