"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Store,
  Factory,
  Home,
  Landmark,
  PartyPopper,
  HardHat,
  ArrowUpLeft,
} from "lucide-react";

const sectors = [
  {
    id: "health",
    title: "القطاع الصحي",
    description:
      "تأمين المستشفيات والمنشآت الطبية بمراعاة دقيقة لحساسيتها، وضبط الدخول وحماية أقسام الطوارئ على مدار الساعة.",
    icon: Building2,
  },
  {
    id: "commercial",
    title: "القطاع التجاري",
    description:
      "تأمين المجمعات التجارية والمكاتب والمتاجر، بما يوازن بين الحماية الصارمة وانسيابية حركة الزوار والعملاء.",
    icon: Store,
  },
  {
    id: "industrial",
    title: "القطاع الصناعي",
    description:
      "حماية المصانع والمستودعات ومواقع التشغيل، مع التركيز على ضبط الدخول والخروج، وتأمين الأصول والمعدات الحيوية.",
    icon: Factory,
  },
  {
    id: "residential",
    title: "القطاع السكني",
    description:
      "تأمين المجمعات والأبراج السكنية، بما يحقق راحة البال والأمان التام للسكان، دون التأثير على خصوصيتهم اليومية.",
    icon: Home,
  },
  {
    id: "government",
    title: "القطاع الحكومي",
    description:
      "تقديم خدمات أمنية متقدمة للجهات والمنشآت الحكومية، وفق أعلى معايير الالتزام والحوكمة المؤسسية الصارمة.",
    icon: Landmark,
  },
  {
    id: "events",
    title: "الفعاليات والمناسبات",
    description:
      "تغطية أمنية مرنة للمعارض والمؤتمرات والفعاليات الكبرى، بكوادر مؤهلة لإدارة الحشود والتدخل والتعامل السريع.",
    icon: PartyPopper,
  },
  {
    id: "construction",
    title: "قطاع الإنشاءات والمشاريع",
    description:
      "تأمين مواقع الإنشاء والمشاريع تحت التنفيذ، بضبط الدخول والخروج، وحماية المعدات والمواد من السرقة أو التلف، ومتابعة الالتزام باشتراطات السلامة.",
    icon: HardHat,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function EdarahSectorsSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#f5f5f3] px-5 py-20 sm:px-8 md:px-10 md:py-28 lg:px-12"
      dir="ltr"
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* ================= MAIN LAYOUT ================= */}

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 xl:grid-cols-[1fr_440px] xl:gap-20">
          {/* ================================================= */}
          {/* LEFT — CARDS */}
          {/* ================================================= */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="order-2 lg:order-1"
            dir="rtl"
          >
            {/* ================= FIRST ROW — 4 CARDS ================= */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {sectors.slice(0, 4).map((sector, index) => {
                const Icon = sector.icon;

                return (
                  <motion.article
                    key={sector.id}
                    variants={itemVariants}
                    className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[20px] border border-black/[0.045] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#5E1E2B]/20 hover:shadow-[0_18px_40px_rgba(94,30,43,0.08)]"
                  >
                    {/* top */}

                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5E1E2B]/[0.07] text-[#5E1E2B] transition-all duration-500 group-hover:bg-[#5E1E2B] group-hover:text-white">
                        <Icon strokeWidth={1.7} className="h-[18px] w-[18px]" />
                      </span>
                    </div>

                    {/* content */}

                    <div className="mt-8">
                      <h3 className="mb-2 text-[16px] font-extrabold leading-snug text-[#1c1c1c]">
                        {sector.title}
                      </h3>

                      <p className="text-[11px] leading-[1.85] text-black/50">
                        {sector.description}
                      </p>
                    </div>

                    {/* hover accent */}

                    <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#5E1E2B] transition-all duration-500 group-hover:w-full" />

                    <span className="absolute bottom-4 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#5E1E2B]/0 text-[#5E1E2B] opacity-0 transition-all duration-500 group-hover:bg-[#5E1E2B]/10 group-hover:opacity-100">
                      <ArrowUpLeft className="h-3.5 w-3.5" />
                    </span>
                  </motion.article>
                );
              })}
            </div>

            {/* ================= SECOND ROW — 3 CARDS ================= */}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sectors.slice(4).map((sector, index) => {
                const Icon = sector.icon;

                return (
                  <motion.article
                    key={sector.id}
                    variants={itemVariants}
                    className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[20px] border border-black/[0.045] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#5E1E2B]/20 hover:shadow-[0_18px_40px_rgba(94,30,43,0.08)]"
                  >
                    {/* top */}

                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5E1E2B]/[0.07] text-[#5E1E2B] transition-all duration-500 group-hover:bg-[#5E1E2B] group-hover:text-white">
                        <Icon strokeWidth={1.7} className="h-[18px] w-[18px]" />
                      </span>
                    </div>

                    {/* content */}

                    <div className="mt-8">
                      <h3 className="mb-2 text-[16px] font-extrabold leading-snug text-[#1c1c1c]">
                        {sector.title}
                      </h3>

                      <p className="text-[11px] leading-[1.85] text-black/50">
                        {sector.description}
                      </p>
                    </div>

                    {/* hover accent */}

                    <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-[#5E1E2B] transition-all duration-500 group-hover:w-full" />

                    <span className="absolute bottom-4 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#5E1E2B]/0 text-[#5E1E2B] opacity-0 transition-all duration-500 group-hover:bg-[#5E1E2B]/10 group-hover:opacity-100">
                      <ArrowUpLeft className="h-3.5 w-3.5" />
                    </span>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          {/* ================================================= */}
          {/* RIGHT — TITLE */}
          {/* ================================================= */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="order-1 lg:order-2 lg:sticky lg:top-28"
            dir="rtl"
          >
            {/* eyebrow */}

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#5E1E2B]" />

              <span className="text-[11px] font-semibold text-[#5E1E2B]">
                مجالات التغطية الأمنية
              </span>
            </div>

            {/* TITLE */}

            <h2 className="text-[clamp(3.5rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.06em] text-[#171717]">
              قطاعات
              <br />
              <span className="text-[#5E1E2B]">نخدمها</span>
            </h2>

            {/* LINE */}

            <div className="my-7 h-px w-full bg-black/[0.08]" />

            {/* SUBTITLE */}

            <p className="max-w-[390px] text-sm leading-8 text-black/50 md:text-base">
              فرق وحلول أمنية مصممة خصيصاً لطبيعة كل قطاع، من المنشآت الصحية
              الحساسة إلى مواقع الإنشاء المفتوحة.
            </p>

            {/* BOTTOM INFO */}

            <div className="mt-10 flex items-center gap-3">
              <div className="flex">
                {[Building2, Store, Factory].map((Icon, index) => (
                  <span
                    key={index}
                    className="-mr-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f5f5f3] bg-white text-[#5E1E2B]"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                ))}
              </div>

              <span className="mr-3 text-xs text-black/35">
                حلول متخصصة لأكثر من قطاع
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
