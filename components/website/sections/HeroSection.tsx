"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import {
  ArrowLeft,
  ArrowRight,
  Download,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

// ============================================================
// BRAND
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";
const LIGHT_BG = "#FBFBFA";
const COMPANY_PROFILE_PDF = "/الملف التعريفي انصات.pdf";

// ============================================================
// SLIDES
// ============================================================

const slideContent = [
  {
    id: 1,
    type: "video" as const,
    src: "/hero.mp4",
    copy: "slide1",
    primaryHref: "#contact",
    secondaryHref: "#services",
    showDownload: true,
    showVideoButton: false,
  },

  // {
  //   id: 2,
  //   type: "video" as const,
  //   src: "/hero-2.mp4",

  //   copy: "slide2",
  //   primaryHref: "#contact",
  //   secondaryHref: "#",
  //   showDownload: false,
  //   showVideoButton: true,
  // },
];

// ============================================================
// FRAMER MOTION VARIANTS
// ============================================================

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },

  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

// ============================================================
// HERO
// ============================================================

export default function Hero() {
  const t = useTranslations("Hero");
  const isRtl = useLocale() === "ar";
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentSlide = slideContent[activeSlide];

  // ============================================================
  // NEXT SLIDE
  // ============================================================

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === slideContent.length - 1 ? 0 : current + 1,
    );
  };

  // ============================================================
  // PREVIOUS SLIDE
  // ============================================================

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? slideContent.length - 1 : current - 1,
    );
  };

  // ============================================================
  // VIDEO PLAYBACK
  // ============================================================

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.currentTime = 0;
    video.muted = isMuted;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browser prevented autoplay.
      });
    }
  }, [activeSlide, isMuted]);

  // ============================================================
  // TOGGLE SOUND
  // ============================================================

  const toggleMute = () => {
    setIsMuted((current) => !current);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section
      id="home"
      dir={t("direction")}
      className="relative min-h-screen overflow-hidden bg-[#FBFBFA] "
    >
      {/* ========================================================
          HERO FRAME
      ======================================================== */}

      <div
        className="
          relative
          min-h-[calc(100vh-12px)]
          overflow-hidden
          bg-[#141414]
  
        "
      >
        {/* ======================================================
            BACKGROUND MEDIA
        ====================================================== */}

        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              key={currentSlide.id}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              onEnded={nextSlide}
              className="
                absolute
                inset-0
                h-full
                w-full
                scale-[1.02]
                object-cover
              "
            >
              <source src={currentSlide.src} type="video/mp4" />
            </video>
          </motion.div>
        </AnimatePresence>

        {/* ======================================================
            BRAND CINEMATIC OVERLAY
        ====================================================== */}

        {/* General darkening */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-black/30
          "
        />

        {/* Burgundy ambient tint */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            mix-blend-multiply
            opacity-30
          "
          style={{
            backgroundColor: BRAND,
          }}
        />

        {/* Main cinematic gradient */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#141414]/95
            via-[#141414]/35
            to-[#141414]/15
          "
        />

        {/* Burgundy radial glow */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-50
            [background:radial-gradient(circle_at_25%_45%,rgba(94,30,43,0.32),transparent_55%)]
          "
        />

        {/* Dark side treatment */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            [background:linear-gradient(90deg,rgba(20,20,20,0.15),rgba(20,20,20,0.7))]
          "
        />

        {/* ======================================================
            SUBTLE GRAIN
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            opacity-[0.045]
            mix-blend-screen
          "
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E")
            `,
          }}
        />

        {/* ======================================================
            CONTENT CONTAINER
        ====================================================== */}

        <div
          className="
            relative
            z-20
            flex
            min-h-[calc(100vh-12px)]
            flex-col
            justify-between
            px-4
            py-7
            sm:px-6
            md:px-12
            md:py-10
            lg:px-16
            lg:py-12
          "
        >
          <div
            className="
              flex
              flex-1
              items-center
              pb-12
              sm:pb-24
              md:items-end
            "
          >
            <div className="flex h-full w-full flex-col justify-between gap-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full text-start"
                >
                  {/* =================================================
                      EYEBROW
                  ================================================= */}

                  <motion.div
                    variants={itemVariants}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      border
                      px-4
                      py-2
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.08em]
                      text-white
                      backdrop-blur-md
                      md:text-xs
                    "
                    style={{
                      borderColor: `${BRAND}80`,
                      backgroundColor: `${BRAND}B3`,
                    }}
                  >
                    {t(`${currentSlide.copy}.eyebrow`)}
                  </motion.div>

                  {/* =================================================
                      TITLE
                  ================================================= */}

                  <motion.h1
                    variants={itemVariants}
                    className="
                      mt-9
                      mx-auto
                      max-w-[950px]
                      text-[clamp(1.5rem,7.5vw,2.8rem)]
                      sm:mt-6
                      sm:mx-0
                      sm:text-[clamp(2.8rem,6vw,6.5rem)]
                      font-medium
                      leading-[1.08]
                      tracking-[-0.035em]
                      whitespace-pre-line
                      text-white
                    "
                  >
                    {t(`${currentSlide.copy}.title`)}
                  </motion.h1>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  {activeSlide === 0 && (
                    <motion.p
                      variants={itemVariants}
                      className="
                        mt-9
                        mx-auto
                        max-w-[680px]
                        text-xs
                        leading-5
                        text-white/75
                        sm:mt-7
                        sm:text-sm
                        sm:leading-7
                        md:text-base
                        md:leading-8
                        lg:text-lg
                        sm:mx-0
                      "
                    >
                      {t(`${currentSlide.copy}.description`)}
                    </motion.p>
                  )}

                  {/* =================================================
                      BUTTONS
                  ================================================= */}

                  <motion.div
                    variants={itemVariants}
                    className="
                      mt-9
                      flex
                      w-full
                      flex-col
                      items-stretch
                      gap-3
                      sm:mt-7
                      sm:w-auto
                      sm:flex-row
                      sm:flex-wrap
                      sm:items-center
                      sm:gap-3
                      md:mt-9
                      md:gap-4
                    "
                  >
                    {/* PRIMARY */}

                    <a
                      href={currentSlide.primaryHref}
                      className="
                        group
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-4
                        rounded-full
                        px-5
                        py-2
                        text-xs
                        font-medium
                        text-white
                        shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        md:px-6
                        md:py-3.5
                        md:text-base
                        sm:w-auto
                        sm:justify-start
                        sm:py-3
                        sm:text-sm
                      "
                      style={{
                        backgroundColor: BRAND,
                      }}
                    >
                      <span>{t(`${currentSlide.copy}.primaryCta`)}</span>

                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          bg-white/15
                          transition-transform
                          duration-300
                          group-hover:-translate-x-1
                          ltr:group-hover:translate-x-1
                          md:h-8
                          md:w-8
                        "
                      >
                        {isRtl ? (
                          <ArrowLeft className="h-4 w-4" />
                        ) : (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </span>
                    </a>

                    {/* SECONDARY */}

                    <a
                      href={currentSlide.secondaryHref}
                      className="
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-3
                        rounded-full
                        border
                        border-white/30
                        bg-white/10
                        px-5
                        py-2
                        text-xs
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-white/50
                        hover:bg-white/20
                        md:px-7
                        md:py-3.5
                        md:text-base
                        sm:w-auto
                        sm:py-3
                        sm:text-sm
                      "
                    >
                      {t(`${currentSlide.copy}.secondaryCta`)}

                      {currentSlide.showVideoButton && (
                        <Play className="h-4 w-4 fill-current" />
                      )}
                    </a>

                    {/* DOWNLOAD */}

                    {currentSlide.showDownload && (
                      <a
                        href={COMPANY_PROFILE_PDF}
                        download="Edarah-Company-Profile.pdf"
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-3
                          rounded-full
                          border
                          border-white/25
                          bg-white/5
                          px-6
                          py-2
                          text-xs
                          text-white
                          backdrop-blur-md
                          transition-all
                          duration-300
                          hover:border-white/40
                          hover:bg-white/15
                          w-full
                          sm:w-auto
                          sm:py-3.5
                          sm:text-sm
                        "
                      >
                        <span>{t("download_proposal")}</span>

                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* ====================================================
                  BOTTOM CAROUSEL CONTROLS
              ==================================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-5
                  sm:justify-between
                "
              >
                {/* LEFT CONTROLS */}

                <div className="flex items-center gap-3">
                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label={t("previous_slide")}
                    className="
                      hidden
                      h-11
                      w-11
                      items-center
                      justify-center
                      sm:flex
                      rounded-full
                      border
                      border-white/25
                      bg-white/10
                      text-white
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:border-white/50
                      hover:bg-white/20
                    "
                  >
                    {isRtl ? (
                      <ArrowRight className="h-4 w-4" />
                    ) : (
                      <ArrowLeft className="h-4 w-4" />
                    )}
                  </button>

                  {/* INDICATORS */}

                  <div className="flex items-center gap-2 px-1">
                    {slideContent.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={t("go_to_slide", { number: index + 1 })}
                        className="
                          relative
                          h-1.5
                          overflow-hidden
                          rounded-full
                        "
                      >
                        <span
                          className={`
                            block
                            h-full
                            rounded-full
                            transition-all
                            duration-500
                            ${activeSlide === index ? "w-10 md:w-14" : "w-2.5"}
                          `}
                          style={{
                            backgroundColor:
                              activeSlide === index
                                ? BRAND
                                : "rgba(255,255,255,0.4)",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label={t("next_slide")}
                    className="
                      hidden
                      h-11
                      w-11
                      items-center
                      justify-center
                      sm:flex
                      rounded-full
                      border
                      border-white/25
                      bg-white/10
                      text-white
                      backdrop-blur-md
                      transition-all
                      duration-300
                      hover:border-white/50
                      hover:bg-white/20
                    "
                  >
                    {isRtl ? (
                      <ArrowLeft className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* ==================================================
                    SOUND
                ================================================== */}

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? t("unmute_video") : t("mute_video")}
                  className="
                    hidden
                    h-11
                    w-11
                    items-center
                    justify-center
                    sm:flex
                    rounded-full
                    border
                    border-white/30
                    bg-black/20
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:bg-white/15
                  "
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
