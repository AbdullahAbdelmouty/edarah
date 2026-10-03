"use client";

import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const BRAND = "#5E1E2B";

type Value = { id: string; title: string; desc: string; icon: LucideIcon };

type Props = {
  badge: string; // t("values.badge")
  title: string; // t("values.title")
  items: Value[];
};

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
  }),
};

export default function ValuesSection({ badge, title, items }: Props) {
  return (
    <section className="px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl border border-[#5E1E2B]/10 bg-[#F3E6E8]/60 p-6 shadow-[0_20px_50px_-20px_rgba(72,22,32,0.25)] sm:p-10">
        {/* subtle dot pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `radial-gradient(circle, ${BRAND} 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center rounded-full border border-[#5E1E2B]/20 bg-white px-4 py-1.5 text-[11px] font-medium text-[#481620] shadow-sm md:text-xs">
            {badge}
          </span>
          <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-tight text-[#481620]">
            {title}
          </h2>
        </div>

        {/* 3 cards on the first row, 2 wider cards on the second */}
        <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {items.map(({ id, title: name, desc, icon: Icon }, i) => (
            <motion.article
              key={id}
              custom={i}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className={`group relative overflow-hidden rounded-2xl border border-[#5E1E2B]/10 bg-[#FBFBFA] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#5E1E2B]/25 hover:shadow-[0_20px_40px_-18px_rgba(72,22,32,0.3)] sm:p-7 sm:last:col-span-2 ${
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              } lg:last:col-span-3`}
            >
              {/* large ghost number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-4 end-4 select-none transition-transform duration-500 group-hover:scale-105"
              >
                <bdi
                  dir="ltr"
                  className="block text-7xl font-semibold tabular-nums text-[#5E1E2B]/[0.06]"
                >
                  0{i + 1}
                </bdi>
              </span>

              <div className="relative">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_10px_20px_-8px_rgba(72,22,32,0.6)] transition-transform duration-300 group-hover:-rotate-6"
                  style={{
                    background: `linear-gradient(135deg, #7A2A3B 0%, ${BRAND} 100%)`,
                  }}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <p className="mt-6 text-[11px] font-medium text-[#5E1E2B]/60">
                  <bdi dir="ltr" className="tracking-[0.2em]">
                    0{i + 1}
                  </bdi>
                </p>
                <h3 className="mt-1.5 text-xl font-semibold text-[#141414]">
                  {name}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-[#363036]/75 md:text-[15px]">
                  {desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
