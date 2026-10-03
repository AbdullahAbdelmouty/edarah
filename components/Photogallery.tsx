"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type Photo = { src: string; alt: string };

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: i * 0.12 },
  }),
};

// Same shape for every card, so all photos share one height.
const SHAPE = "aspect-[4/3] sm:aspect-[4/5]";

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {photos.map((photo, i) => (
          <motion.figure
            key={photo.src}
            custom={i}
            variants={card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`group relative overflow-hidden rounded-3xl bg-[#e5e5e5] shadow-[0_24px_50px_-20px_rgba(72,22,32,0.45)] ring-1 ring-black/5 ${SHAPE}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none"
            />

            {/* depth: bottom fade + inner hairline */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141414]/65 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15" />

            {/* index + caption (decorative; alt text already covers a11y) */}
            {/* <figcaption
              aria-hidden="true"
              className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/30 p-2.5 pe-4 text-white backdrop-blur-md transition duration-500 sm:translate-y-1 sm:opacity-90 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#5E1E2B] text-[11px] font-semibold tabular-nums">
                0{i + 1}
              </span>
              <span className="line-clamp-2 text-xs leading-5 text-white/90">
                {photo.alt}
              </span>
            </figcaption> */}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
