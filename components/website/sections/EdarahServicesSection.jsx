"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const servicesData = [
  {
    id: "001",
    title: "الحراسات الأمنية",
    description:
      "تأمين المنشآت بحراسات ثابتة أو دوريات متحركة، حسب طبيعة كل موقع.",
    tags: ["حراسات ثابتة", "دوريات متحركة", "تأمين منشآت"],
    image: "/security-team.webp",
  },
  {
    id: "002",
    title: "المراقبة الإلكترونية",
    description: "كاميرات مراقبة مرتبطة بغرفة تحكم مركزية لرصد وتوثيق مستمر.",
    tags: ["كاميرات مراقبة", "غرف تحكم مركزية", "رصد مستمر"],
    image: "/security-team.webp",
  },
  {
    id: "003",
    title: "تأمين الفعاليات والمناسبات",
    description:
      "تغطية أمنية متكاملة للفعاليات، تشمل إدارة الدخول وضبط الحشود.",
    tags: ["تغطية أمنية", "إدارة الدخول", "ضبط الحشود"],
    image: "/security-team.webp",
  },
  {
    id: "004",
    title: "الحماية الشخصية (VIP)",
    description:
      "فرق حماية مؤهلة لمرافقة وتأمين كبار الشخصيات وفق بروتوكولات أمنية دقيقة.",
    tags: ["مرافقة وتأمين", "كبار الشخصيات", "بروتوكولات أمنية"],
    image: "/security-team.webp",
  },
  {
    id: "005",
    title: "إدارة المخاطر والتقييم الأمني",
    description: "تقييم المخاطر الأمنية للمنشآت وتقديم خطط وقائية مبنية عليها.",
    tags: ["تقييم المخاطر", "خطط وقائية", "استشارات أمنية"],
    image: "/security-team.webp",
  },
];

export default function EdarahServicesSection() {
  const [activeService, setActiveService] = useState(servicesData[0]);

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#080808] text-white"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#7A1B1E]/10 blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        {/* ================= HEADER ================= */}
        <div className="mb-20 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#7A1B1E]" />

              <span className="text-xs font-medium tracking-[0.2em] text-zinc-500">
                EDARAH / SERVICES
              </span>
            </div>

            <h2 className="text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl lg:text-8xl">
              الخدمات
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-zinc-500 lg:text-right">
            حلول أمنية متكاملة مصممة لحماية منشآتك وأصولك وأفرادك، وفق منهجية
            دقيقة تتناسب مع طبيعة كل موقع.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ================= SERVICE LIST ================= */}
          <div className="order-1 lg:order-3 lg:col-span-4">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-zinc-600">
                Our Expertise
              </span>

              <span className="text-xs text-zinc-700">
                {servicesData.length.toString().padStart(2, "0")} Services
              </span>
            </div>

            <div className="space-y-1">
              {servicesData.map((service) => {
                const isActive = activeService.id === service.id;

                return (
                  <motion.button
                    key={service.id}
                    onClick={() => setActiveService(service)}
                    whileHover={{ x: -4 }}
                    className="group relative flex w-full items-center gap-5 border-b border-white/[0.07] py-5 text-right"
                  >
                    {/* Active indicator */}
                    <motion.div
                      initial={false}
                      animate={{
                        scaleY: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      className="absolute right-0 top-0 h-full w-[2px] origin-center bg-[#7A1B1E]"
                    />

                    {/* Number */}
                    <span
                      className={`w-10 shrink-0 font-mono text-xs transition-colors ${
                        isActive ? "text-[#A62A2F]" : "text-zinc-700"
                      }`}
                    >
                      {service.id}
                    </span>

                    {/* Title */}
                    <span
                      className={`flex-1 text-lg font-medium transition-all duration-300 md:text-xl ${
                        isActive
                          ? "translate-x-0 text-white"
                          : "text-zinc-500 group-hover:text-zinc-200"
                      }`}
                    >
                      {service.title}
                    </span>

                    {/* Arrow */}
                    <motion.span
                      animate={{
                        x: isActive ? -4 : 0,
                        opacity: isActive ? 1 : 0.25,
                      }}
                      className="text-[#A62A2F]"
                    >
                      ←
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ================= IMAGE ================= */}
          <div className="order-2 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-zinc-900 md:aspect-[5/4] lg:aspect-[4/5]"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                {/* Top label */}
                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A62A2F]" />

                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                    Security Solution
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 right-0 w-full p-7 md:p-9">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs text-[#A62A2F]">
                      / {activeService.id}
                    </span>

                    <span className="h-px w-8 bg-white/20" />
                  </div>

                  <h3 className="max-w-lg text-3xl font-semibold leading-tight md:text-4xl">
                    {activeService.title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="order-3 flex flex-col justify-end lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {/* Number */}
                <div className="mb-8 text-7xl font-semibold tracking-[-0.08em] text-white/[0.04] md:text-8xl">
                  {activeService.id}
                </div>

                {/* Description */}
                <p className="border-r border-[#7A1B1E] pr-5 text-base leading-8 text-zinc-400">
                  {activeService.description}
                </p>

                {/* Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {activeService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs text-zinc-500 transition-colors hover:border-[#7A1B1E]/50 hover:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="group mt-10 inline-flex items-center gap-4 text-sm font-medium text-white">
                  <span className="relative">
                    اكتشف الخدمة
                    <span className="absolute -bottom-1 right-0 h-px w-full origin-right scale-x-0 bg-[#A62A2F] transition-transform duration-300 group-hover:scale-x-100" />
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[#7A1B1E] group-hover:bg-[#7A1B1E]">
                    ←
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= BOTTOM META ================= */}
        <div className="mt-20 flex items-center justify-between border-t border-white/[0.06] pt-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">
            EDARAH SECURITY SERVICES
          </span>

          <span className="font-mono text-[10px] text-zinc-700">
            24 / 7 / 365
          </span>
        </div>
      </div>
    </section>
  );
}
