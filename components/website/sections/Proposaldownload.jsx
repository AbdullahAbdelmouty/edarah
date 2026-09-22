"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Download, FileText } from "lucide-react";

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";
const PROFILE_PDF = "/الملف التعريفي انصات.pdf";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function ProposalDownload() {
  const t = useTranslations("ProposalDownload");
  const locale = useLocale();

  return (
    <section className="w-full bg-[#eeeeee] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        dir={locale === "ar" ? "rtl" : "ltr"}
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-[1280px] flex-col gap-8 rounded-2xl border border-[#5E1E2B]/10 bg-white p-5 shadow-[0_16px_40px_rgba(72,22,32,0.08)] sm:p-8 md:flex-row md:items-center md:gap-10 lg:p-10"
      >
        <div
          className="relative flex min-h-[250px] w-full shrink-0 flex-col justify-between overflow-hidden rounded-xl p-6 sm:min-h-[290px] sm:p-8 md:w-[40%] lg:min-h-[326px]"
          style={{ backgroundColor: BRAND }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(155deg, transparent 35%, ${BRAND_DARK} 100%)`,
            }}
          />

          <FileText
            aria-hidden="true"
            className="relative h-9 w-9 text-white/90"
            strokeWidth={1.5}
          />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70 sm:text-base">
              {t("card_label")}
            </p>
            <h2 className="mt-3 max-w-sm text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {t("card_title")}
            </h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">
              {t("card_caption")}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-4 sm:gap-5">
          <h3 className="max-w-2xl  text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-[#141414]">
            {t("title")}
          </h3>
          <p className="max-w-2xl text-base leading-7 text-[#363036]/75 sm:text-lg sm:leading-8">
            {t("description")}
          </p>

          <div className="mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={PROFILE_PDF}
              download="Edarah-Company-Profile.pdf"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold text-white transition-colors hover:brightness-90 sm:min-w-[190px]"
              style={{ backgroundColor: BRAND }}
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              <span>{t("download_button")}</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg border border-[#5E1E2B]/15 bg-[#FBFBFA] px-5 py-3 text-sm font-medium text-[#481620] transition-colors hover:bg-[#5E1E2B]/[0.06] sm:min-w-[190px]"
            >
              {t("contact_button")}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
