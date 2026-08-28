import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/ui/Reveal";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { ContactForm } from "./ContactForm";

interface ContactSectionProps {
    /** The page's own <h1> lives here on /contact; everywhere else this is a subsection, so <h2>. */
    headingLevel?: "h1" | "h2";
    className?: string;
}

/**
 * "Contact us" copy on the left, the lead-capture form on the right —
 * shared by the Contact page (as its main section) and the homepage's
 * closing section.
 */
export function ContactSection({ headingLevel = "h2", className = "bg-ivory py-24 lg:py-32" }: ContactSectionProps) {
    const { t } = useTranslation("contact");
    const Heading = headingLevel;
    const typewriterPhrases = t("hero.typewriterPhrases", { returnObjects: true }) as string[];

    return (
        <section className={className}>
            <div className="mx-auto max-w-content px-6 lg:px-10">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <p className="font-mono text-xs tracking-widest text-stone uppercase">{t("hero.eyebrow")}</p>
                        <Heading className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-ink">
                            <TypewriterText phrases={typewriterPhrases} />
                        </Heading>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-stone">{t("hero.supporting")}</p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <ContactForm />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
