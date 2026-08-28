import { motion, useInView } from "framer-motion";
import { useRef, useId } from "react";

interface MinimalLineChartProps {
    points: number[];
    className?: string;
    strokeClassName?: string;
    /** 0-1 delay before the draw-in animation starts */
    delay?: number;
}

/**
 * A single-series line chart with no axes, ticks, or grid — the plot itself
 * is the whole visual. Line draws in once on scroll entry; the area beneath
 * fades from the brand signal color to transparent.
 */
export function MinimalLineChart({ points, className = "", strokeClassName = "stroke-signal", delay = 0 }: MinimalLineChartProps) {
    const ref = useRef<SVGSVGElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const gradientId = useId();

    const width = 400;
    const height = 160;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;

    const coords = points.map((value, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height - ((value - min) / range) * (height - 24) - 12;
        return [x, y] as const;
    });

    const linePath = coords.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

    return (
        <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none" aria-hidden="true">
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" className="text-signal" stopColor="currentColor" stopOpacity="0.28" />
                    <stop offset="100%" className="text-signal" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
            </defs>

            <motion.path
                d={areaPath}
                fill={`url(#${gradientId})`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: delay + 0.4 }}
            />

            <motion.path
                d={linePath}
                fill="none"
                strokeWidth={1.5}
                className={strokeClassName}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
            />
        </svg>
    );
}
