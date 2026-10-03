"use client";

import { motion, type Variants } from "framer-motion";
import { Eye, Target, type LucideIcon } from "lucide-react";

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";

type Item = { kind: "vision" | "mission"; label: string; text: string };

const ICONS: Record<Item["kind"], LucideIcon> = {
  vision: Eye,
  mission: Target,
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
  }),
};

type Props = {
  items: Item[];
  /** "soft": light cards that blend with a white section (default).
   *  "contrast": mission card is dark burgundy. */
  variant?: "soft" | "contrast";
};

export default function VisionMission({ items, variant = "soft" }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(({ kind, label, text }, i) => {
        const Icon = ICONS[kind];
        const dark = variant === "contrast" && kind === "mission";

        return (
          <motion.div
            key={kind}
            custom={i}
            variants={card}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`group relative overflow-hidden rounded-3xl p-6 transition duration-300 hover:border-[#5E1E2B]/30 sm:p-7 ${
              dark
                ? "text-white shadow-[0_20px_40px_-18px_rgba(72,22,32,0.55)] ring-1 ring-white/10"
                : `border border-[#5E1E2B]/10 text-[#141414] ${
                    kind === "vision"
                      ? "bg-white shadow-[0_12px_30px_-18px_rgba(72,22,32,0.25)]"
                      : "bg-[#F3E6E8]/50"
                  }`
            }`}
            style={
              dark
                ? {
                    background: `linear-gradient(145deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                  }
                : undefined
            }
          >
            {/* dot texture on the dark card */}
            {dark && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.1]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
            )}


            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    dark
                      ? "border border-white/20 bg-white/10 backdrop-blur-md"
                      : "text-white shadow-md"
                  }`}
                  style={dark ? undefined : { backgroundColor: BRAND }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{label}</h3>
              </div>

              <div
                className={`my-4 h-0.5 w-10 rounded-full ${
                  dark ? "bg-white/50" : "bg-[#5E1E2B]"
                }`}
              />

              <p
                className={`text-sm leading-7 sm:text-[15px] sm:leading-8 ${
                  dark ? "text-white/85" : "text-[#363036]/80"
                }`}
              >
                {text}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
