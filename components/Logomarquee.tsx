"use client";

import Image from "next/image";

type Props = {
  logos: string[]; // file names inside /public/partners
  basePath?: string;
  /** seconds each logo takes to pass; total speed stays constant as you add logos */
  secondsPerLogo?: number;
};

/**
 * Seamless infinite logo loop.
 *
 * The track holds TWO identical groups. Each group ends with the same spacing
 * (padding, not gap), so moving the track by exactly -50% lands on an identical
 * frame and the animation restarts without any visible jump.
 *
 * The OUTER wrapper is forced to dir="ltr". In an RTL page a box wider than its
 * container is pinned to the RIGHT edge, so moving it left by 50% would slide
 * into empty space. With ltr it starts at the left edge in every language.
 */
export default function LogoMarquee({
  logos,
  basePath = "/partners",
  secondsPerLogo = 3.2,
}: Props) {
  const duration = `${Math.max(20, Math.round(logos.length * secondsPerLogo))}s`;

  const group = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pe-10 sm:gap-12 sm:pe-12"
    >
      {logos.map((logo) => (
        <div
          key={`${hidden ? "b" : "a"}-${logo}`}
          className="flex h-14 w-28 shrink-0 items-center justify-center opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-16 sm:w-32"
        >
          <Image
            src={`${basePath}/${logo}`}
            alt={hidden ? "" : logo.replace(/\.[^.]+$/, "").replace(/-/g, " ")}
            width={120}
            height={56}
            loading="eager"
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div
      dir="ltr"
      className="relative overflow-hidden rounded-2xl border border-[#5E1E2B]/10 bg-white py-8 shadow-[0_8px_24px_rgba(72,22,32,0.06)]"
    >
      <style>{`
        @keyframes edarah-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .edarah-marquee-track { animation: edarah-marquee var(--marquee-duration) linear infinite; will-change: transform; }
        .edarah-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .edarah-marquee-track { animation: none; } }
      `}</style>

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent sm:w-32" />

      <div
        className="edarah-marquee-track flex w-max"
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
