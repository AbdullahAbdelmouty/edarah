"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

// ============================================================
// BRAND
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#351018";
const CTA_START = "#481620";

// ============================================================
// FRAMER MOTION VARIANTS
// ============================================================

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ============================================================
// UPGRADE CTA
// ============================================================

export default function CallToAction() {
  const t = useTranslations("CallToAction");
  const locale = useLocale();

  return (
    <section
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="
        relative
        w-full
        overflow-hidden
        border-b
        border-white/10
        px-6
        py-20
        sm:py-24
        md:py-28
      "
      style={{
        background: `linear-gradient(180deg, ${CTA_START} 0%, ${BRAND_DARK} 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
        }}
      />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="
          relative
          mx-auto
          flex
          max-w-2xl
          flex-col
          items-center
          gap-5
          text-center
        "
      >
        <motion.div variants={itemVariants}>
          <ShieldCheck className="h-7 w-7 text-white/75" strokeWidth={1.5} />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="
            max-w-xl
            text-[1.9rem]
            font-semibold
            leading-tight
            text-white
            sm:text-4xl
          "
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="
            max-w-md
            text-sm
            leading-6
            text-white/70
            sm:text-base
            sm:leading-7
          "
        >
          {t("description")}
        </motion.p>

        <motion.a
          variants={itemVariants}
          href="mailto:info@edarah-ss.com"
          className="
            mt-2
            inline-flex
            items-center
            justify-center
            rounded-lg
            bg-white
            px-6
            py-3.5
            text-sm
            font-medium
            transition-transform
            duration-300
            hover:scale-[1.03]
          "
          style={{ color: BRAND }}
        >
          {t("button")}
        </motion.a>
      </motion.div>
    </section>
  );
}
