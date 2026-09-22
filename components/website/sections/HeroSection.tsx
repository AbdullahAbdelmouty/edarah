"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

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

// ============================================================
// SLIDES
// ============================================================

const slides = [
  {
    id: 1,
    type: "video" as const,
    src: "/hero.mp4",

    eyebrow: "COMMERCIAL EXCELLENCE",

    title: (
      <>
        Spotless environments
        <br />
        for serious
        <br />
        professionals.
      </>
    ),

    description:
      "We maintain premium office and commercial spaces with exacting standards, ensuring your environment reflects the quality of your business.",

    primaryCta: "Request a Consultation",
    secondaryCta: "View Our Services",
    thirdCta: "Download Proposal",

    primaryHref: "#contact",
    secondaryHref: "#services",

    showDescription: true,
    showDownload: true,
    showVideoButton: false,
  },

  {
    id: 2,
    type: "video" as const,
    src: "/hero-2.mp4",

    eyebrow: "ROYAL GREEN IN MOTION",

    title: (
      <>
        Spotless environments
        <br />
        for serious professionals.
      </>
    ),

    description: "",

    primaryCta: "Request a Consultation",
    secondaryCta: "Video Tour",

    primaryHref: "#contact",
    secondaryHref: "#",

    showDescription: false,
    showDownload: false,
    showVideoButton: true,
  },
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentSlide = slides[activeSlide];

  // ============================================================
  // NEXT SLIDE
  // ============================================================

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  // ============================================================
  // PREVIOUS SLIDE
  // ============================================================

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
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
      dir="rtl"
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
            px-6
            py-7
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
              pb-24
              md:items-end
              md:pb-24
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
                  className="w-full"
                >
                  {/* =================================================
                      EYEBROW
                  ================================================= */}

                  <motion.div
                    variants={itemVariants}
                    className="
                      inline-flex
                      items-center
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
                    {currentSlide.eyebrow}
                  </motion.div>

                  {/* =================================================
                      TITLE
                  ================================================= */}

                  <motion.h1
                    variants={itemVariants}
                    className="
                      mt-6
                      max-w-[950px]
                      font-serif
                      text-[clamp(2.8rem,6vw,6.5rem)]
                      font-medium
                      leading-[0.92]
                      tracking-[-0.035em]
                      text-white
                    "
                  >
                    {currentSlide.title}
                  </motion.h1>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  {currentSlide.showDescription && (
                    <motion.p
                      variants={itemVariants}
                      className="
                        mt-7
                        max-w-[680px]
                        text-sm
                        leading-7
                        text-white/75
                        md:text-base
                        md:leading-8
                        lg:text-lg
                      "
                    >
                      {currentSlide.description}
                    </motion.p>
                  )}

                  {/* =================================================
                      BUTTONS
                  ================================================= */}

                  <motion.div
                    variants={itemVariants}
                    className="
                      mt-7
                      flex
                      flex-wrap
                      items-center
                      gap-3
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
                        items-center
                        gap-4
                        rounded-full
                        px-5
                        py-3
                        text-sm
                        font-medium
                        text-white
                        shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                        transition-all
                        duration-300
                        hover:scale-[1.02]
                        md:px-6
                        md:py-3.5
                        md:text-base
                      "
                      style={{
                        backgroundColor: BRAND,
                      }}
                    >
                      <span>{currentSlide.primaryCta}</span>

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
                          md:h-8
                          md:w-8
                        "
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </span>
                    </a>

                    {/* SECONDARY */}

                    <a
                      href={currentSlide.secondaryHref}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-3
                        rounded-full
                        border
                        border-white/30
                        bg-white/10
                        px-5
                        py-3
                        text-sm
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:border-white/50
                        hover:bg-white/20
                        md:px-7
                        md:py-3.5
                        md:text-base
                      "
                    >
                      {currentSlide.secondaryCta}

                      {currentSlide.showVideoButton && (
                        <Play className="h-4 w-4 fill-current" />
                      )}
                    </a>

                    {/* DOWNLOAD */}

                    {currentSlide.showDownload && (
                      <a
                        href="/proposal.pdf"
                        download
                        className="
                          hidden
                          items-center
                          justify-center
                          gap-3
                          rounded-full
                          border
                          border-white/25
                          bg-white/5
                          px-6
                          py-3.5
                          text-sm
                          text-white
                          backdrop-blur-md
                          transition-all
                          duration-300
                          hover:border-white/40
                          hover:bg-white/15
                          lg:inline-flex
                        "
                      >
                        <span>{currentSlide.thirdCta}</span>

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
                  justify-between
                  gap-5
                "
              >
                {/* LEFT CONTROLS */}

                <div className="flex items-center gap-3">
                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
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
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {/* INDICATORS */}

                  <div className="flex items-center gap-2 px-1">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
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
                    aria-label="Next slide"
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
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
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>

                {/* ==================================================
                    SOUND
                ================================================== */}

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
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
