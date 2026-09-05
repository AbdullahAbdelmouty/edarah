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
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  Building2,
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
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const features = [t("feature_1"), t("feature_2"), t("feature_3")];

  const kpis = [
    {
      value: "19+",
      icon: Briefcase,
      label: t("stat1_text"),
      sublabel: "من التميز والريادة",
    },
    {
      value: "400+",
      icon: Users,
      label: t("stat2_text"),
      sublabel: "جاهزية ميدانية تامة",
    },
    {
      value: "5+",
      icon: MapPin,
      label: t("stat3_text"),
      sublabel: "تغطية جغرافية واسعة",
    },
    {
      value: "24/7",
      icon: Clock,
      label: t("stat4_text"),
      sublabel: "غرفة عمليات متواصلة",
    },
  ];

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#FBFBFA] px-4 py-14 sm:px-6 sm:py-18 md:px-8 md:py-20 lg:py-24"
    >
      {/* Background texture & ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute -left-32 top-10 h-80 w-80 rounded-full blur-[100px] sm:h-[550px] sm:w-[550px]"
          style={{ backgroundColor: `${BRAND}0C` }}
        />
        <div
          className="absolute -right-32 bottom-20 h-72 w-72 rounded-full blur-[100px] sm:h-[450px] sm:w-[450px]"
          style={{ backgroundColor: `${BRAND}08` }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* ===================== HEADER SECTION ===================== */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start sm:mb-14 md:mb-16"
        >
          {/* Enriched & Enlarged Badge "لماذا نحن ؟" */}
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#5E1E2B]/15 bg-[#5E1E2B]/[0.06] px-4 py-2 shadow-sm backdrop-blur-sm transition-transform hover:scale-[1.02]">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white shadow-sm sm:h-7 sm:w-7"
              style={{ backgroundColor: BRAND }}
            >
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
            <span
              className="text-sm font-extrabold tracking-wide sm:text-base md:text-lg"
              style={{ color: BRAND }}
            >
              {t("badge")}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="max-w-5xl text-[clamp(1.85rem,5vw,3.25rem)] font-extrabold leading-[1.28] tracking-tight text-[#141414]">
            {t("title")}
          </h2>

          {/* Subtitle & Formatted Bullet Points */}
          <div className="mt-5 max-w-4xl">
            <p className="text-sm font-medium leading-relaxed text-black/70 sm:text-base md:text-[1.05rem]">
              {t("description_intro")}
            </p>

            <ul className="mt-3.5 flex flex-wrap gap-2.5 sm:gap-3">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="inline-flex items-center gap-2 rounded-xl border border-black/[0.06] bg-white/90 px-3.5 py-2 text-xs font-semibold text-[#1c1c1c] shadow-[0_2px_8px_rgba(0,0,0,0.02)] backdrop-blur-sm transition-all hover:border-[#5E1E2B]/25 hover:bg-white hover:shadow-[0_4px_12px_rgba(94,30,43,0.06)] sm:px-4 sm:py-2.5 sm:text-sm"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ===================== SECTION TITLE: إدارة في أرقام ===================== */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-black/[0.07] pb-4"
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm"
              style={{ backgroundColor: BRAND }}
            >
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">
                {t("stats_section_title")}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* ===================== BENTO STATS & IMAGE SHOWCASE ===================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-8 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12"
        >
          {/* Left / Stats Cards Grid: 2 High-impact Numbers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
            {/* Card 1: +5362 */}
            <motion.div variants={itemVariants} className="h-full">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-black/[0.06] bg-gradient-to-br from-white via-white to-[#FAF7F7] p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#5E1E2B]/20 hover:shadow-[0_22px_45px_rgba(94,30,43,0.08)] sm:p-7 md:p-8">
                <CornerBrackets
                  color={BRAND}
                  className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Card Top: Tag + Number */}
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: BRAND }}
                    >
                      <Building2 className="h-3 w-3" />
                      {t("card1_tag")}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight text-[#141414] sm:text-5xl md:text-6xl">
                      +5362
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Title & Desc */}
                <div className="mt-6 border-t border-black/[0.05] pt-5">
                  <h4 className="text-base font-bold text-[#141414] sm:text-lg md:text-xl">
                    {t("card1_title")}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-black/60 sm:text-sm">
                    {t("card1_desc")}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: +2500 */}
            <motion.div variants={itemVariants} className="h-full">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-black/[0.06] bg-gradient-to-br from-white via-white to-[#FAF7F7] p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#5E1E2B]/20 hover:shadow-[0_22px_45px_rgba(94,30,43,0.08)] sm:p-7 md:p-8">
                <CornerBrackets
                  color={BRAND}
                  className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Card Top: Tag + Number */}
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: BRAND }}
                    >
                      <Award className="h-3 w-3" />
                      {t("card2_tag")}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight text-[#141414] sm:text-5xl md:text-6xl">
                      +2500
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Title & Desc */}
                <div className="mt-6 border-t border-black/[0.05] pt-5">
                  <h4 className="text-base font-bold text-[#141414] sm:text-lg md:text-xl">
                    {t("card2_title")}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-black/60 sm:text-sm">
                    {t("card2_desc")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right / Hero Image Card with Black Uniform (/man3.webp) */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="group relative h-full min-h-[360px] overflow-hidden rounded-[24px] bg-[#141414] shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
              <img
                src="/man3.webp"
                alt="Edarah Security Guard - Black Uniform"
                className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Ambient dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10" />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-30"
                style={{ backgroundColor: BRAND }}
              />

              <CornerBrackets />

              {/* Top Accent Pill */}
              <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-md border border-white/15 text-white sm:top-6 sm:left-6">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold">جاهزية ميدانية</span>
              </div>

              {/* Bottom Details */}
              <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-2.5 border border-white/10">
                  <span>الزي الميداني المعتمد</span>
                </div>
                <h4 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {t("image_title")}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
                  {t("image_desc")}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ===================== BOTTOM KPI STATS ROW ===================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        >
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-[20px] border border-black/[0.05] bg-white p-4.5 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-[#5E1E2B]/20 hover:shadow-[0_12px_30px_rgba(94,30,43,0.06)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: BRAND }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className="block text-2xl font-black tracking-tight sm:text-3xl"
                      style={{ color: BRAND }}
                    >
                      {kpi.value}
                    </span>
                  </div>
                </div>

                <div className="mt-3 border-t border-black/[0.04] pt-2.5">
                  <span className="block text-xs font-bold text-[#1c1c1c] sm:text-sm">
                    {kpi.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-black/45 sm:text-xs">
                    {kpi.sublabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
