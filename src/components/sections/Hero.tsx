import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { DotGrid } from "@/components/backgrounds/DotGrid";
import { TrustBadge } from "./TrustBadge";
import { useLocalizedPath } from "@/i18n/locale";

export function Hero() {
  const { t } = useTranslation("home");
  const lp = useLocalizedPath();

  return (
    <section className="relative flex flex-col overflow-hidden bg-ink text-ivory lg:min-h-screen">
      <div className="absolute inset-0">
        <DotGrid
          dotSize={5}
          gap={30}
          baseColor="#2a2822"
          activeColor="#b99a5b"
          proximity={270}
          shockStrength={2.5}
          shockRadius={100}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 pt-40 pb-16 lg:px-10 lg:pt-48 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-widest text-mist uppercase"
        >
          {t("hero.eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] text-balance"
        >
          {t("hero.headlineStart")}{" "}
          <span className="font-bold text-brass underline decoration-brass decoration-4 underline-offset-[0.12em] lg:decoration-8">
            {t("hero.headlineEmphasis")}
          </span>
          .
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="hidden max-w-lg text-lg leading-relaxed text-mist lg:block">
            {t("hero.subhead")}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Button
              href={lp("/contact")}
              size="lg"
              color="primary-inverted"
              iconTrailing={ArrowRight}
            >
              {t("hero.ctaPrimary")}
            </Button>
            <Button
              href="#method"
              size="lg"
              color="secondary-inverted"
              iconTrailing={ChevronDown}
            >
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <TrustBadge label={t("hero.trustBadge")} />
        </motion.div>
      </div>
    </section>
  );
}
