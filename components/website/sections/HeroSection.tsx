"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      className="relative min-h-screen bg-[#f5f5f3] px-2 md:px-3 overflow-hidden"
      dir="rtl"
    >
      {/* =========================================================
          HERO FRAME
      ========================================================= */}
      <div className="relative min-h-[calc(100vh-12px)] overflow-hidden rounded-[28px] md:rounded-[38px] bg-black">
        {/* =======================================================
            BACKGROUND VIDEO
        ======================================================= */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              scale-[1.03]
            "
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Cinematic color treatment */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Left / bottom cinematic gradient */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_35%,rgba(0,0,0,0.05),rgba(0,0,0,0.65)_80%)]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/85
              via-black/20
              to-black/20
            "
          />

          {/* Subtle grain */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.055]
              mix-blend-screen
              pointer-events-none
            "
            style={{
              backgroundImage: `
                url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")
              `,
            }}
          />
        </div>

        {/* =======================================================
            GRID
        ======================================================= */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
          <div className="absolute top-0 bottom-0 left-[18%] w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-[50%] w-px bg-white" />
          <div className="absolute top-0 bottom-0 left-[82%] w-px bg-white" />

          <div className="absolute left-0 right-0 top-[32%] h-px bg-white" />
          <div className="absolute left-0 right-0 top-[68%] h-px bg-white" />
        </div>

        {/* =======================================================
            GEOMETRIC PATTERN
        ======================================================= */}
        <div
          className="
            absolute
            -bottom-8
            -left-8
            md:-bottom-12
            md:-left-12
            w-[280px]
            h-[280px]
            md:w-[420px]
            md:h-[420px]
            opacity-[0.22]
            pointer-events-none
          "
        >
          <svg viewBox="0 0 420 420" className="w-full h-full" fill="none">
            <path
              d="M420 0L0 420V210L210 0H420Z"
              fill="white"
              fillOpacity=".14"
            />

            <path
              d="M420 105L105 420H210L420 210V105Z"
              fill="white"
              fillOpacity=".12"
            />

            <path
              d="M420 210L210 420H315L420 315V210Z"
              fill="white"
              fillOpacity=".1"
            />

            <path
              d="M315 0L0 315V210L210 0H315Z"
              fill="white"
              fillOpacity=".08"
            />

            <path
              d="M420 315L315 420H420V315Z"
              fill="white"
              fillOpacity=".12"
            />
          </svg>
        </div>

        {/* =======================================================
            CONTENT
        ======================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            relative
            z-20
            min-h-[calc(100vh-12px)]
            flex
            flex-col
            justify-between
            px-6
            py-7
            md:px-12
            md:py-10
            lg:px-16
            lg:py-12
          "
        >
          {/* =====================================================
              TOP
          ===================================================== */}
          <div className="flex items-start justify-between">
            {/* Logo */}
            <motion.div variants={itemVariants}>
              <img
                src="/logo.png"
                alt="Edarah"
                className="
                  w-28
                  md:w-36
                  lg:w-44
                  object-contain
                  brightness-0
                  invert
                "
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                }}
              />
            </motion.div>

            {/* Top right label */}
            <motion.div
              variants={itemVariants}
              className="
                hidden
                md:flex
                items-center
                gap-3
                text-white/60
                text-[10px]
                tracking-[0.28em]
                uppercase
                font-medium
              "
            >
              <span className="w-8 h-px bg-white/40" />
              EDARAH
              <span>SECURITY SOLUTIONS</span>
            </motion.div>
          </div>

          {/* =====================================================
              CENTER / HERO MESSAGE
          ===================================================== */}
          <div className="flex-1 flex items-center">
            <div className="w-full max-w-[1100px]">
              {/* Main headline */}
              <motion.h1
                variants={itemVariants}
                className="
                  max-w-5xl
                  text-white
                  font-semibold
                  tracking-[-0.035em]
                  leading-[1.2]
                  line-height-[1.2]
                  text-[clamp(2rem,4vw,4rem)]
                "
              >
                {t("title")}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="
                  mt-7
                  md:mt-9
                  max-w-xl
                  text-white/65
                  text-sm
                  md:text-base
                  lg:text-lg
                  leading-8
                "
              >
                {t("description")}
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="mt-8 md:mt-10 flex items-center gap-4"
              >
                <a
                  href="#services"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-4
                    rounded-full
                    bg-white
                    text-black
                    px-6
                    py-3.5
                    md:px-7
                    md:py-4
                    text-sm
                    md:text-base
                    font-medium
                    transition-all
                    duration-300
                    hover:bg-[#BC3437]
                    hover:text-white
                  "
                >
                  {t("cta_primary")}
                  <span
                    className="
                      flex
                      items-center
                      justify-center
                      w-8
                      h-8
                      rounded-full
                      bg-black
                      text-white
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </span>
                </a>

                <a
                  href="#contact"
                  className="
                    hidden
                    md:inline-flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/25
                    bg-white/5
                    backdrop-blur-md
                    text-white
                    px-7
                    py-4
                    text-sm
                    transition-all
                    duration-300
                    hover:bg-white/10
                    hover:border-white/50
                  "
                >
                  {t("cta_secondary")}
                </a>
              </motion.div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM
          ===================================================== */}
          <motion.div
            variants={itemVariants}
            className="
              flex
              items-end
              justify-between
              gap-6
            "
          >
            {/* Scroll */}
            <div
              className="
                hidden
                md:flex
                items-center
                gap-4
                text-white/50
                text-[10px]
                uppercase
                tracking-[0.25em]
              "
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20">
                <ArrowDownLeft className="w-4 h-4" />
              </span>
              {t("scroll_hint")}
            </div>

            {/* Bottom information */}
            <div
              className="
                mr-auto
                flex
                items-center
                gap-5
                text-white/50
                text-xs
                md:text-sm
              "
            >
              <span>{t("city")}</span>

              <span className="w-1 h-1 rounded-full bg-white/40" />

              <span>{t("country")}</span>
            </div>

            {/* Vertical number */}
            <div
              className="
                hidden
                md:block
                text-white/30
                text-[10px]
                tracking-[0.3em]
              "
            >
              2026
            </div>
          </motion.div>
        </motion.div>

        {/* =======================================================
            ACCENT LINE
        ======================================================= */}
        <div
          className="
            absolute
            bottom-0
            right-[12%]
            w-[120px]
            md:w-[180px]
            h-[2px]
            bg-[#10B981]
            z-30
          "
        />

        {/* =======================================================
            WHATSAPP
        ======================================================= */}
        <div
          className="
            absolute
            bottom-7
            left-6
            md:bottom-10
            md:left-10
            z-50
          "
        >
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="
              group
              relative
              flex
              items-center
              justify-center
              w-12
              h-12
              md:w-14
              md:h-14
              rounded-full
              bg-[#25D366]
              text-white
              shadow-[0_12px_40px_rgba(0,0,0,0.35)]
              transition-all
              duration-300
              hover:scale-110
            "
          >
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>

            <span
              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#25D366]
                animate-ping
                opacity-20
              "
            />
          </a>
        </div>
      </div>
    </section>
  );
}
