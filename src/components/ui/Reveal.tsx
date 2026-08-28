import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    /** Distance in pixels the element rises as it fades in */
    y?: number;
}

/**
 * Standard scroll-entry motion for the site: a soft blur-to-focus pull
 * combined with fade + small rise, once, respecting prefers-reduced-motion
 * via Framer Motion's global handling.
 */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
