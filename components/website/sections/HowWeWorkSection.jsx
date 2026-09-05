"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpLeft, Check, ShieldCheck } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "التقييم الأمني الأولي",
    desc: "زيارة ميدانية لتقييم الموقع، ودراسة نقاط الدخول والخروج، وتحديد المخاطر المحتملة الخاصة بطبيعة نشاط العميل.",
  },
  {
    id: "02",
    title: "تصميم الخطة الأمنية",
    desc: "إعداد خطة تشغيلية مخصصة تحدد عدد الكوادر المطلوبة، نقاط الانتشار، جداول الدوريات، وآليات التصعيد عند الطوارئ.",
  },
  {
    id: "03",
    title: "الاعتماد والتعاقد",
    desc: "مراجعة الخطة والعرض مع العميل، وتوقيع الاتفاقية بما يشمل مستويات الخدمة والمسؤوليات المتبادلة.",
  },
  {
    id: "04",
    title: "الانتشار الميداني",
    desc: "تجهيز ونشر الكوادر المؤهلة في الموقع، مع تفعيل أنظمة المراقبة والتقارير من اليوم الأول للتشغيل.",
  },
  {
    id: "05",
    title: "المتابعة والتقييم المستمر",
    desc: "مراجعات دورية لأداء الفريق الميداني ومدى فعالية الخطة الأمنية، مع تعديلها عند الحاجة بما يواكب أي تغير في طبيعة المخاطر أو نشاط الموقع.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function EdarahMechanismSection() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#08090a] py-24 text-white sm:py-32"
    >
      {/* =========================
          BACKGROUND
      ========================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Glow */}
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#8d2025]/10 blur-[140px]" />

        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#8d2025]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* =========================
            HEADER
        ========================== */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="max-w-3xl">
            {/* Eyebrow */}

            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-[#9b252b]" />

              <span className="text-[16px] font-bold tracking-[0.25em] text-white/40">
                آلية العمل
              </span>
            </div>

            {/* Title */}

            <h2 className="text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              الأمن يبدأ من
              <br />
              <span className="text-white/35">منهجية واضحة.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-white/45 sm:text-base">
              نعتمد منهجية تشغيلية واضحة الخطوات, لضمن انتقال سلس من التعاقد الى
              التنفيذ الميداني بلا فجوات.
            </p>
          </div>
        </motion.div>

        {/* =========================
            MAIN LAYOUT
        ========================== */}

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] xl:gap-16">
          {/* =========================
              TIMELINE
          ========================== */}

          <div className="relative">
            {/* Desktop connecting line */}

            <div className="pointer-events-none absolute right-[31px] top-[32px] hidden h-[calc(100%-64px)] w-px bg-gradient-to-b from-[#9b252b] via-white/10 to-transparent lg:block" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-4"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={cardVariants}
                  className="group relative"
                >
                  <div className="relative flex gap-5 lg:gap-8">
                    {/* Number */}

                    <div className="relative z-10 flex shrink-0">
                      <div
                        className="
                          flex h-16 w-16 items-center justify-center
                          border border-white/10
                          bg-[#0b0c0e]
                          font-mono text-sm font-bold
                          text-white/40
                          transition-all duration-500
                          group-hover:border-[#9b252b]
                          group-hover:bg-[#9b252b]
                          group-hover:text-white
                          sm:h-[72px] sm:w-[72px]
                        "
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Card */}

                    <div
                      className="
                        relative flex-1 overflow-hidden
                        border border-white/[0.07]
                        bg-white/[0.025]
                        p-6
                        transition-all duration-500
                        group-hover:-translate-y-1
                        group-hover:border-white/[0.14]
                        group-hover:bg-white/[0.045]
                        sm:p-8
                      "
                    >
                      {/* Hover accent */}

                      <div
                        className="
                          absolute right-0 top-0 h-full w-[2px]
                          origin-top scale-y-0
                          bg-[#9b252b]
                          transition-transform duration-500
                          group-hover:scale-y-100
                        "
                      />

                      <div className="flex items-start justify-between gap-6">
                        <h3 className="text-lg font-extrabold text-white sm:text-xl">
                          {step.title}
                        </h3>

                        {/* Arrow */}

                        <div
                          className="
                            hidden h-9 w-9 shrink-0 items-center justify-center
                            border border-white/10
                            text-white/30
                            transition-all duration-500
                            group-hover:border-[#9b252b]
                            group-hover:bg-[#9b252b]
                            group-hover:text-white
                            sm:flex
                          "
                        >
                          <ArrowUpLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>

                      <p className="mt-5 max-w-2xl text-[13px] leading-7 text-white/40 sm:text-sm sm:leading-8">
                        {step.desc}
                      </p>

                      {/* Bottom metadata */}

                      <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                        <Check className="h-3.5 w-3.5 text-[#9b252b]" />

                        <span className="text-[10px] font-medium text-white/25">
                          منهجية إدارة الأمنية
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* =========================
              IMAGE
          ========================== */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative lg:sticky lg:top-24 lg:h-[620px]"
          >
            <div className="group relative h-[420px] overflow-hidden sm:h-[520px] lg:h-full">
              {/* Image */}

              <Image
                src="/man3.webp"
                alt="حارس أمن إدارة"
                fill
                unoptimized
                className="
                  object-cover object-top
                  grayscale
                  contrast-[1.1]
                  transition-transform duration-[1.2s]
                  group-hover:scale-105
                "
              />

              {/* Dark overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/20 to-transparent" />

              <div className="absolute inset-0 bg-[#5c1116]/10 mix-blend-multiply" />

              {/* Image border */}

              <div className="absolute inset-4 border border-white/10" />

              {/* Top label */}

              <div className="absolute right-8 top-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#a52a30] shadow-[0_0_15px_rgba(165,42,48,0.8)]" />

                <span className="text-[10px] font-bold tracking-[0.2em] text-white/60">
                  SECURITY / 24
                </span>
              </div>

              {/* Bottom content */}

              <div className="absolute bottom-8 right-8 left-8">
                <div className="mb-5 h-px w-16 bg-[#a52a30]" />

                <p className="max-w-xs text-sm leading-7 text-white/60">
                  تشغيل أمني متكامل يبدأ بالتخطيط وينتهي بأداء مستمر قابل
                  للقياس.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================
            BOTTOM CTA
        ========================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="
            mt-20 flex flex-col gap-6
            border-t border-white/[0.08]
            pt-8
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/25">
              READY TO START
            </span>

            <p className="mt-2 text-sm text-white/50">
              دعنا نبدأ بتقييم احتياجات منشأتك الأمنية.
            </p>
          </div>

          <button
            className="
              group flex items-center justify-center gap-4
              border border-white/10
              px-6 py-4
              text-sm font-bold
              text-white
              transition-all duration-300
              hover:border-[#9b252b]
              hover:bg-[#9b252b]
            "
          >
            اطلب عرضًا أمنيًا
            <ArrowLeft
              className="
                h-4 w-4
                transition-transform duration-300
                group-hover:-translate-x-1
              "
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
