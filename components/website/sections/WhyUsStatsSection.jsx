"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Users,
  MapPin,
  Clock,
  Briefcase,
  ArrowUpLeft,
} from "lucide-react";

import CornerBrackets from "@/components/decor/Cornerbrackets";

const BRAND = "#5E1E2B";

export default function WhyUsStatsSection() {
  const t = useTranslations("WhyUs");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const kpis = [
    { value: "19+", icon: Briefcase, label: t("stat1_text") },
    { value: "400+", icon: Users, label: t("stat2_text") },
    { value: "5+", icon: MapPin, label: t("stat3_text") },
    { value: "24/7", icon: Clock, label: t("stat4_text") },
  ];

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#f5f5f3] px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24"
    >
      {/* Background texture — matches EdarahAboutSection */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute -left-24 top-0 h-64 w-64 rounded-full blur-[80px] sm:-left-40 sm:h-[500px] sm:w-[500px] sm:blur-[100px]"
          style={{ backgroundColor: `${BRAND}09` }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* ===================== HEADER ===================== */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-start sm:mb-10 md:mb-12"
        >
          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white sm:h-8 sm:w-8"
              style={{ backgroundColor: BRAND }}
            >
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
            <span
              className="text-[11px] font-bold tracking-[0.15em] sm:text-xs md:text-sm"
              style={{ color: BRAND }}
            >
              {t("badge")}
            </span>
          </div>

          <h2 className="max-w-4xl text-[clamp(1.75rem,5.5vw,3.25rem)] font-extrabold leading-[1.25] tracking-tight text-[#1c1c1c]">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-black/55 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
            {t("description")}
          </p>
        </motion.div>

        {/* ===================== BENTO: STAT CARDS + IMAGE ===================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:gap-5 md:gap-6 lg:grid-cols-12"
        >
          {/* Left: two data cards, side-by-side from the smallest screen */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:col-span-7">
            {[
              {
                value: "5362+",
                title: t("card1_title"),
                desc: t("card1_desc"),
              },
              {
                value: "2500+",
                title: t("card2_title"),
                desc: t("card2_desc"),
              },
            ].map((card, i) => (
              <motion.div key={i} variants={itemVariants} className="h-full">
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-black/[0.04] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] motion-reduce:hover:translate-y-0 sm:rounded-[26px] sm:p-7 md:p-8">
                  <CornerBrackets
                    color={BRAND}
                    className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-black tracking-tighter text-[#1c1c1c] sm:text-5xl md:text-6xl">
                      {card.value}
                    </span>
                    <span className="text-xs font-bold tracking-widest text-black/20">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-4 sm:mt-8">
                    <h3 className="mb-1.5 text-sm font-bold text-[#1c1c1c] sm:mb-3 sm:text-xl md:text-2xl">
                      {card.title}
                    </h3>
                    <p className="hidden text-black/50 sm:block sm:text-sm md:text-base sm:leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: hero image card */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-[20px] bg-black shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:rounded-[26px]">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[380px]">
                <img
                  src="/security-team.webp"
                  alt="Edarah Security Team"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ backgroundColor: `${BRAND}1A` }}
                />

                <CornerBrackets />

                <div
                  className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:left-6 sm:top-6 sm:h-11 sm:w-11"
                  style={{ backgroundColor: BRAND }}
                >
                  <ArrowUpLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                  <h4 className="text-lg font-bold sm:text-2xl">
                    {t("image_title")}
                  </h4>
                  <p className="mt-1.5 text-xs leading-5 text-white/75 sm:mt-2 sm:text-sm sm:leading-relaxed">
                    {t("image_desc")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===================== BOTTOM KPI ROW ===================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-black/10 pt-8 sm:gap-6 sm:pt-9 md:grid-cols-4 md:pt-10"
        >
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col gap-1.5 sm:gap-2"
              >
                <span
                  className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
                  style={{ color: BRAND }}
                >
                  {kpi.value}
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-black/70 sm:text-sm md:text-base">
                  <Icon
                    className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                    style={{ color: BRAND }}
                  />
                  <span>{kpi.label}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
