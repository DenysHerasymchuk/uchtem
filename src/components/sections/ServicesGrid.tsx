import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, BarChartSquare01, Lightbulb02, TrendUp01, Wallet02 } from "@untitledui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { useLocalizedPath } from "@/i18n/locale";

const OUTCOMES_META = [
    { to: "/services/financial-management", icon: BarChartSquare01 },
    { to: "/services/financial-management", icon: Wallet02 },
    { to: "/services/business-consulting", icon: TrendUp01 },
    { to: "/services/business-consulting", icon: Lightbulb02 },
];

const AUTO_ADVANCE_MS = 3200;
const RESUME_DELAY_MS = 5000;

export function ServicesGrid() {
    const { t } = useTranslation("home");
    const lp = useLocalizedPath();
    const outcomes = t("servicesGrid.outcomes", { returnObjects: true }) as { title: string; body: string }[];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const resumeTimeoutRef = useRef<number | null>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Below the `sm` breakpoint the cards stack in a single column, so the
    // active card follows scroll position instead of the hover/timer carousel.
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 639px)");
        setIsMobile(mql.matches);
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, []);

    // Auto-advance the active card, but only while not paused by a hover, and not on mobile.
    useEffect(() => {
        if (isPaused || isMobile) return;
        const interval = window.setInterval(() => {
            setActiveIndex((i) => (i + 1) % outcomes.length);
        }, AUTO_ADVANCE_MS);
        return () => window.clearInterval(interval);
    }, [isPaused, isMobile, outcomes.length]);

    // On mobile, whichever card crosses the vertical center of the viewport becomes active.
    useEffect(() => {
        if (!isMobile) return;
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const index = cardRefs.current.findIndex((el) => el === entry.target);
                    if (index !== -1) setActiveIndex(index);
                }
            },
            { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
        );
        cardRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [isMobile, outcomes.length]);

    // Clear any pending resume timer on unmount.
    useEffect(() => {
        return () => {
            if (resumeTimeoutRef.current !== null) window.clearTimeout(resumeTimeoutRef.current);
        };
    }, []);

    function handleMouseEnter(i: number) {
        if (isMobile) return;
        if (resumeTimeoutRef.current !== null) {
            window.clearTimeout(resumeTimeoutRef.current);
            resumeTimeoutRef.current = null;
        }
        setIsPaused(true);
        setActiveIndex(i);
    }

    function handleMouseLeave() {
        if (isMobile) return;
        resumeTimeoutRef.current = window.setTimeout(() => {
            setIsPaused(false);
            resumeTimeoutRef.current = null;
        }, RESUME_DELAY_MS);
    }

    return (
        <section className="bg-ivory py-24 lg:py-32">
            <div className="mx-auto max-w-content px-6 lg:px-10">
                <Reveal>
                    <p className="font-mono text-xs tracking-widest text-stone uppercase">{t("servicesGrid.eyebrow")}</p>
                    <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] text-ink">
                        {t("servicesGrid.headline")}
                    </h2>
                </Reveal>

                <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-ink/12 sm:grid-cols-2 lg:grid-cols-4">
                    {outcomes.map((outcome, i) => {
                        const Icon = OUTCOMES_META[i].icon;
                        const isActive = activeIndex === i;
                        return (
                            <Reveal key={outcome.title} delay={0.08 * i} className="h-full">
                                <Link
                                    ref={(el) => {
                                        cardRefs.current[i] = el;
                                    }}
                                    to={lp(OUTCOMES_META[i].to)}
                                    onMouseEnter={() => handleMouseEnter(i)}
                                    onMouseLeave={handleMouseLeave}
                                    onFocus={() => handleMouseEnter(i)}
                                    onBlur={handleMouseLeave}
                                    className={`relative flex h-full flex-col p-8 transition-colors duration-500 ${isActive ? "bg-ink" : "bg-ivory"}`}
                                >
                                    <span
                                        className={`pointer-events-none absolute top-4 right-4 h-4 w-4 border-t border-r border-brass transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                                    />

                                    <div className="flex items-center justify-between">
                                        <Icon
                                            className={`size-6 text-brass transition-transform duration-500 ${isActive ? "-translate-y-0.5 scale-110" : ""}`}
                                        />
                                        <span className={`font-mono text-sm transition-colors duration-500 ${isActive ? "text-mist" : "text-ink/40"}`}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <h3 className={`mt-6 font-display text-xl transition-colors duration-500 ${isActive ? "text-ivory" : "text-ink"}`}>
                                        {outcome.title}
                                    </h3>
                                    <p className={`mt-4 flex-1 text-sm leading-relaxed transition-colors duration-500 ${isActive ? "text-mist" : "text-stone"}`}>
                                        {outcome.body}
                                    </p>

                                    <ArrowUpRight
                                        className={`mt-6 size-4 transition-all duration-500 ${isActive ? "translate-x-0.5 -translate-y-0.5 text-brass opacity-100" : "text-ink/30 opacity-0"}`}
                                    />
                                </Link>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
