"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";

// Ring geometry (viewBox 0 0 200 200)
const R = 86;
const C = 2 * Math.PI * R;
const FILL = 0.78; // how much of the ring is drawn (decorative)

type Props = {
  value: number; // e.g. 19
  label: string; // t("quality.medal_label")
  sub: string; // t("quality.medal_sub")
  badge: string; // t("quality.ribbon")
};

export default function ExperienceCard({ value, label, sub, badge }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();

  const count = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduce, value, count]);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-sm overflow-hidden rounded-[2rem] p-7 text-white ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(72,22,32,0.55)] sm:p-8"
      style={{
        background: `linear-gradient(145deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
      }}
    >
      {/* dot texture (same as the hero banners) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      {/* soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -end-16 h-56 w-56 rounded-full bg-white/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -start-16 h-56 w-56 rounded-full bg-black/30 blur-3xl"
      />

      {/* badge */}
      <div className="relative flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-medium backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          {badge}
        </span>
      </div>

      {/* progress ring + animated number */}
      <div className="relative mx-auto mt-6 h-52 w-52">
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 -rotate-90"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="expRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F3E6E8" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="10"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="url(#expRing)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: reduce ? C * (1 - FILL) : C }}
            animate={inView ? { strokeDashoffset: C * (1 - FILL) } : undefined}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-[22px] flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-sm">
          <p
            dir="ltr"
            className="flex items-start text-6xl font-semibold leading-none tracking-tight tabular-nums"
          >
            <motion.span>{rounded}</motion.span>
            <span className="mt-1 text-4xl text-white/70">+</span>
          </p>
        </div>
      </div>

      {/* labels */}
      <div className="relative mt-6 text-center">
        <p className="text-lg font-semibold">{label}</p>
        <p className="mt-1 text-sm text-white/65">{sub}</p>
      </div>
    </div>
  );
}
