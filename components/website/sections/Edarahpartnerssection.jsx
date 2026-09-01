"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { Handshake } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/card";

const BRAND = "#5E1E2B";

// ============================================================
// PARTNERS
// ============================================================

const rowOne = [
  { name: "الإنماء", logo: "/partners/alinma.png" },
  { name: "مصرف الراجحي", logo: "/partners/alrajhi-bank.png" },
  { name: "غرفة الطائف", logo: "/partners/taif-chamber.png" },
  { name: "غرفة الرياض", logo: "/partners/riyadh-chamber.png" },
  { name: "وزارة الصحة", logo: "/partners/ministry-of-health.png" },
  { name: "وزارة التجارة", logo: "/partners/ministry-of-commerce.png" },
  { name: "الدانوب", logo: "/partners/danube.png" },
  { name: "شعور", logo: "/partners/shuoor.png" },
  { name: "بن داود", logo: "/partners/bin-dawood.png" },
  { name: "هامات", logo: "/partners/hamat.png" },
  { name: "التعاونية", logo: "/partners/tawuniya.png" },
  { name: "بنك الرياض", logo: "/partners/riyad-bank.png" },
  { name: "بنك البلاد", logo: null },
];

const rowTwo = [
  { name: "تيرا مول", logo: "/partners/tera-mall.png" },
  { name: "الدريس", logo: "/partners/aldrees.png" },
  { name: "STC", logo: null },
  { name: "اسمنت أم القرى", logo: null },
  { name: "ألبان الطائف", logo: "/partners/alban-altaif-dairy.png" },
  { name: "مدينة الورود", logo: "/partners/madinat-alwouroud.png" },
  { name: "دار تاج الهندي", logo: "/partners/dar-taj-indian.png" },
  { name: "فندق إيريديوم", logo: "/partners/iridium-hotel.png" },
  {
    name: "فندق أوالف الدولي",
    logo: "/partners/awaliv-international-hotel.png",
  },
  { name: "ذا بارك مول", logo: "/partners/the-park-mall.png" },
  { name: "الأمين", logo: "/partners/alamin.png" },
  { name: "إدارة", logo: "/partners/edarah-construction.png" },
  { name: "بلاتينيوم بارك", logo: "/partners/platinum-park.png" },
  { name: "فالي سنتر", logo: "/partners/valley-center.png" },
];

// ============================================================
// MARQUEE SPEED
// ============================================================
//
// Actual physical speed in pixels per second.
// Both rows use the same value so they move at the same
// visual speed regardless of how many logos each contains.
//

const PIXELS_PER_SECOND = 42;

// ============================================================
// LOGO CARD
// ============================================================

function LogoCard({ name, logo }) {
  return (
    <Card
      className="
        group
        relative
        flex
        h-[90px]
        w-[190px]
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-[18px]
        border-black/[0.05]
        bg-white
        px-6
        shadow-[0_8px_30px_rgba(0,0,0,0.02)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_16px_35px_rgba(0,0,0,0.06)]
        sm:h-[100px]
        sm:w-[210px]
      "
    >
      {logo ? (
        <Image
          src={logo}
          alt={name}
          fill
          sizes="210px"
          className="
            object-contain
            p-5
            grayscale
            transition-all
            duration-300
            group-hover:grayscale-0
          "
        />
      ) : (
        <span
          className="
            text-center
            text-sm
            font-bold
            text-black/35
            transition-colors
            duration-300
            group-hover:text-[#5E1E2B]
            md:text-base
          "
        >
          {name}
        </span>
      )}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-[3px]
          w-0
          -translate-x-1/2
          rounded-full
          transition-all
          duration-300
          group-hover:w-1/2
        "
        style={{
          backgroundColor: BRAND,
        }}
      />
    </Card>
  );
}

// ============================================================
// MARQUEE ROW
// ============================================================

function MarqueeRow({ items, direction = "left", speed = PIXELS_PER_SECOND }) {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  // Imperative animation controls — this is the key change.
  // Instead of relying on Framer Motion diffing `initial` vs
  // `animate` (which depends on exact render timing and broke
  // under the previous key-remount approach), we explicitly
  // SET the starting position and explicitly START the loop
  // once we know the real track width. No ambiguity, no races.
  const controls = useAnimation();

  // ----------------------------------------------------------
  // Measure the track (and re-measure on resize)
  // ----------------------------------------------------------

  useEffect(() => {
    const element = trackRef.current;

    if (!element) return;

    const measure = () => {
      setTrackWidth(element.getBoundingClientRect().width);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // ----------------------------------------------------------
  // Drive the animation once width is known
  // ----------------------------------------------------------
  //
  // duration = distance / speed, so both rows share the same
  // physical px/sec speed regardless of item count.
  //

  useEffect(() => {
    if (trackWidth <= 0) return;

    const duration = trackWidth / speed;

    const from = direction === "left" ? 0 : -trackWidth;
    const to = direction === "left" ? -trackWidth : 0;

    // Snap to the correct starting point instantly (no animation)...
    controls.set({ x: from });

    // ...then explicitly kick off the infinite linear loop.
    controls.start({
      x: to,
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      },
    });
  }, [trackWidth, direction, speed, controls]);

  return (
    <div
      dir="ltr"
      className="
        relative
        w-full
        overflow-hidden
      "
    >
      <motion.div
        className="
          flex
          w-max
          shrink-0
        "
        animate={controls}
        style={{
          willChange: "transform",
        }}
      >
        {/* ==================================================
            TRACK 1
        ================================================== */}

        <div
          ref={trackRef}
          className="
            flex
            shrink-0
            gap-4
            pr-4
          "
        >
          {items.map((item, index) => (
            <LogoCard
              key={`track-1-${item.name}-${index}`}
              name={item.name}
              logo={item.logo}
            />
          ))}
        </div>

        {/* ==================================================
            TRACK 2
        ================================================== */}

        <div
          className="
            flex
            shrink-0
            gap-4
            pr-4
          "
        >
          {items.map((item, index) => (
            <LogoCard
              key={`track-2-${item.name}-${index}`}
              name={item.name}
              logo={item.logo}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// MAIN SECTION
// ============================================================

export default function EdarahPartnersSection() {
  const reveal = {
    hidden: {
      opacity: 0,
      y: 22,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      dir="rtl"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f5f5f3]
        px-4
        py-12
        sm:px-6
        sm:py-14
        md:px-8
        md:py-16
        lg:py-20
      "
    >
      {/* ======================================================
          BACKGROUND
      ======================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top left glow */}

        <div
          className="
            absolute
            -left-24
            top-0
            h-64
            w-64
            rounded-full
            blur-[80px]
            sm:-left-40
            sm:h-[500px]
            sm:w-[500px]
            sm:blur-[100px]
          "
          style={{
            backgroundColor: `${BRAND}09`,
          }}
        />

        {/* Bottom right glow */}

        <div
          className="
            absolute
            -bottom-32
            -right-32
            h-72
            w-72
            rounded-full
            blur-[100px]
          "
          style={{
            backgroundColor: `${BRAND}06`,
          }}
        />
      </div>

      {/* ======================================================
          CONTENT
      ======================================================= */}

      <div className="relative mx-auto max-w-[1400px]">
        {/* ====================================================
            HEADER
        ===================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          {/* Eyebrow */}

          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                text-white
                sm:h-8
                sm:w-8
              "
              style={{
                backgroundColor: BRAND,
              }}
            >
              <Handshake className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>

            <span
              className="
                text-[11px]
                font-bold
                tracking-[0.15em]
                sm:text-xs
                md:text-sm
              "
              style={{
                color: BRAND,
              }}
            >
              EDARAH / PARTNERS
            </span>
          </div>

          {/* Heading + Description */}

          <div
            className="
              grid
              gap-5
              sm:gap-8
              lg:grid-cols-[1fr_420px]
              lg:items-end
            "
          >
            <div>
              <h2
                className="
                  text-[clamp(2rem,6vw,4rem)]
                  font-black
                  leading-[1.12]
                  tracking-tight
                  text-[#1c1c1c]
                "
              >
                شركاء النجاح
              </h2>

              <div
                className="mt-4 h-[3px] w-12 sm:mt-6 sm:w-14"
                style={{
                  backgroundColor: BRAND,
                }}
              />
            </div>

            <p
              className="
                max-w-lg
                text-sm
                leading-6
                text-black/55
                sm:text-[15px]
                sm:leading-8
                md:text-base
              "
            >
              أكثر من 400 عميل من القطاعين العام والخاص وضعوا ثقتهم في منظومتنا
              الأمنية، من البنوك والجهات الحكومية إلى المجمعات التجارية والمنشآت
              الصناعية.
            </p>
          </div>
        </motion.div>

        {/* ====================================================
            TWO SYNCHRONIZED OPPOSITE MARQUEES
        ===================================================== */}

        <div className="relative flex flex-col gap-4">
          {/* ==================================================
              ROW 1
              LEFT ←
          ================================================== */}

          <div className="min-h-[90px] sm:min-h-[100px]">
            <MarqueeRow
              items={rowOne}
              direction="left"
              speed={PIXELS_PER_SECOND}
            />
          </div>

          {/* ==================================================
              ROW 2
              RIGHT →
          ================================================== */}

          <div className="min-h-[90px] sm:min-h-[100px]">
            <MarqueeRow
              items={rowTwo}
              direction="right"
              speed={PIXELS_PER_SECOND}
            />
          </div>

          {/* ==================================================
              LEFT FADE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-10
              w-16
              bg-gradient-to-r
              from-[#f5f5f3]
              to-transparent
              sm:w-28
              md:w-40
            "
          />

          {/* ==================================================
              RIGHT FADE
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              z-10
              w-16
              bg-gradient-to-l
              from-[#f5f5f3]
              to-transparent
              sm:w-28
              md:w-40
            "
          />
        </div>

        {/* ====================================================
            FOOTER
        ===================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-black/10
            pt-5
            sm:mt-12
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:pt-6
          "
        >
          {/* Trust */}

          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: BRAND,
              }}
            />

            <span className="text-xs font-medium text-black/40">
              ثقة تُبنى بالنتائج.
            </span>
          </div>

          {/* Brand */}

          <span
            className="
              text-[10px]
              font-bold
              tracking-[0.2em]
              text-black/20
            "
          >
            EDARAH SECURITY SERVICES
          </span>
        </motion.div>
      </div>
    </section>
  );
}
