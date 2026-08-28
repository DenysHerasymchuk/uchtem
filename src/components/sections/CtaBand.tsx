import { useTranslation } from "react-i18next";
import { ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Reveal } from "@/components/ui/Reveal";
import { useLocalizedPath } from "@/i18n/locale";

interface CtaBandProps {
    headline: string;
    supporting?: string;
    ctaLabel?: string;
    /** Bare (Ukrainian-locale) path — localized automatically for the current language. */
    ctaHref?: string;
}

export function CtaBand({ headline, supporting, ctaLabel, ctaHref = "/contact" }: CtaBandProps) {
    const { t } = useTranslation();
    const lp = useLocalizedPath();

    return (
        <section className="bg-ink py-28 text-ivory lg:py-36">
            <div className="mx-auto max-w-content px-6 text-center lg:px-10">
                <Reveal>
                    <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] text-balance">{headline}</h2>
                    {supporting && <p className="mx-auto mt-5 max-w-xl text-mist">{supporting}</p>}
                    <div className="mt-10">
                        <Button href={lp(ctaHref)} size="lg" color="primary-inverted" iconTrailing={ArrowRight}>
                            {ctaLabel ?? t("cta.startConversation")}
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
