"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const services = [
  {
    id: "001",
    title: "الحراسات الأمنية",
    stat: "24/7",
    statLabel: "دوريات ثابتة ومتحركة على مدار الساعة",
    description:
      "تأمين المنشآت بحراسات ثابتة أو دوريات متحركة، حسب طبيعة كل موقع وتقييم مخاطره.",
    tags: ["حراسات ثابتة", "دوريات متحركة", "تأمين منشآت"],
    image:
      "https://images.unsplash.com/photo-1741034793661-3bd2a33d5b1b?auto=format&fit=crop&w=1400&q=80",
    hud: "GUARD-UNIT / PERIMETER",
    risk: false,
  },
  {
    id: "002",
    title: "المراقبة الإلكترونية",
    stat: "360°",
    statLabel: "تغطية كاميرات مربوطة بغرفة تحكم مركزية",
    description:
      "كاميرات مراقبة مرتبطة بغرفة تحكم مركزية لرصد وتوثيق مستمر لكل الحركة داخل الموقع.",
    tags: ["كاميرات مراقبة", "غرف تحكم مركزية", "رصد مستمر"],
    image:
      "https://images.unsplash.com/photo-1753153481105-7a979eabe5a9?auto=format&fit=crop&w=1400&q=80",
    hud: "CCTV-FEED / CONTROL RM",
    risk: false,
  },
  {
    id: "003",
    title: "تأمين الفعاليات والمناسبات",
    stat: "1:50",
    statLabel: "نسبة أفراد الأمن إلى عدد الحضور تقريباً",
    description:
      "تغطية أمنية متكاملة للفعاليات، تشمل إدارة نقاط الدخول وضبط الحشود من البداية للنهاية.",
    tags: ["تغطية أمنية", "إدارة الدخول", "ضبط الحشود"],
    image:
      "https://images.unsplash.com/photo-1736108920938-d52d001a6004?auto=format&fit=crop&w=1400&q=80",
    hud: "EVENT-OPS / ENTRY POINTS",
    risk: false,
  },
  {
    id: "004",
    title: "الحماية الشخصية (VIP)",
    stat: "1:1",
    statLabel: "مرافقة مخصصة لكل شخصية محمية",
    description:
      "فرق حماية مؤهلة لمرافقة وتأمين كبار الشخصيات وفق بروتوكولات أمنية دقيقة ومدروسة.",
    tags: ["مرافقة وتأمين", "كبار الشخصيات", "بروتوكولات أمنية"],
    image:
      "https://images.unsplash.com/photo-1622482607282-fffed5a93942?auto=format&fit=crop&w=1400&q=80",
    hud: "VIP-DETAIL / CLOSE ESCORT",
    risk: false,
  },
  {
    id: "005",
    title: "إدارة المخاطر والتقييم الأمني",
    stat: "01–10",
    statLabel: "مقياس تصنيف المخاطر لكل موقع",
    description:
      "تقييم المخاطر الأمنية للمنشآت وتقديم خطط وقائية عملية مبنية على بيانات الموقع الفعلية.",
    tags: ["تقييم المخاطر", "خطط وقائية", "استشارات أمنية"],
    image:
      "https://images.unsplash.com/photo-1736108920938-d52d001a6004?auto=format&fit=crop&w=1400&q=80",
    hud: "RISK-ASMT / SITE AUDIT",
    risk: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EdarahServicesSection() {
  const [activeId, setActiveId] = useState("001");
  const [currentTime, setCurrentTime] = useState("");

  const activeService =
    services.find((service) => service.id === activeId) || services[0];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const p = (n) => String(n).padStart(2, "0");
      setCurrentTime(
        `${p(now.getHours())}:${p(now.getMinutes())}:${p(now.getSeconds())}`,
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-[#0a0a0c] font-[Tajawal,sans-serif] text-[#f2ede6] antialiased"
    >
      {/* background texture + glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.012)_0px,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_3px)] mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[60%] w-[55%] bg-[radial-gradient(circle_at_30%_30%,#7a1b1e_0%,transparent_65%)] opacity-10 blur-[60px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-8 md:py-24">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-3.5 flex items-center justify-end gap-2.5">
            <span className="text-[12.5px] text-[#9a9399]">
              دليل التشغيل — إدارة لحلول الأمن
            </span>
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#d4443c] shadow-[0_0_0_3px_rgba(212,68,60,0.18)]" />
          </div>

          <h1 className="mb-1.5 text-right text-[clamp(48px,8vw,96px)] font-black leading-[0.95] tracking-[-0.01em] text-[#f2ede6]">
            الخدمات
          </h1>

          <div className="mb-14 flex items-center justify-end gap-3.5 md:mb-16">
            <span className="whitespace-nowrap font-mono text-xs text-[#9a9399]">
              05 / خدمات مصنّفة
            </span>
            <div className="h-px max-w-[340px] flex-1 bg-gradient-to-l from-[#2a262b] to-transparent" />
          </div>
        </motion.div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_1.4fr_1.5fr]">
          {/* ============ RIGHT: SERVICE LIST ============ */}
          <div className="order-1 flex flex-col">
            <div className="mb-[18px] flex justify-between px-0.5 font-mono text-[11.5px] text-[#9a9399]">
              <span>الفهرس</span>
              <span>الملفات</span>
            </div>

            <div>
              {services.map((service, i) => {
                const isActive = service.id === activeId;

                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveId(service.id)}
                    whileHover={{ x: -4 }}
                    className={`block w-full border-b border-[#2a262b] bg-transparent px-1 py-5 text-right transition-opacity duration-300 ${
                      i === 0 ? "border-t" : ""
                    } ${isActive ? "opacity-100" : "opacity-50 hover:opacity-85"}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span
                        className={`text-xl font-extrabold transition-colors duration-300 md:text-2xl ${
                          isActive ? "text-[#d4443c]" : "text-[#f2ede6]"
                        }`}
                      >
                        {service.title}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-[#d4443c] ltr:text-left">
                        FILE-{service.id}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 border-r-2 border-[#7a1b1e] pr-3.5 text-sm leading-[1.85] text-[#9a9399]">
                            {service.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ============ CENTER: VIEWFINDER ============ */}
          <div className="order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-[#141216] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 1.07 }}
                  animate={{ opacity: 1, scale: 1.03 }}
                  exit={{ opacity: 0, scale: 1.07 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    sizes="(max-width: 1050px) 100vw, 40vw"
                    unoptimized
                    className={`object-cover ${
                      activeService.risk
                        ? "saturate-[.6] contrast-[1.05] brightness-[.65] hue-rotate-[28deg] sepia-[.18]"
                        : "saturate-[.85] contrast-[1.05] brightness-[.72]"
                    }`}
                  />
                </motion.div>
              </AnimatePresence>

              {/* vignette + scanlines */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%),linear-gradient(to_top,rgba(0,0,0,0.75),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,transparent_1px,transparent_3px)] opacity-50" />

              {/* HUD corner brackets */}
              <div className="absolute right-3.5 top-3.5 z-10 h-[22px] w-[22px] border-r-2 border-t-2 border-[#d4443c] opacity-90" />
              <div className="absolute left-3.5 top-3.5 z-10 h-[22px] w-[22px] border-l-2 border-t-2 border-[#d4443c] opacity-90" />
              <div className="absolute bottom-3.5 right-3.5 z-10 h-[22px] w-[22px] border-b-2 border-r-2 border-[#d4443c] opacity-90" />
              <div className="absolute bottom-3.5 left-3.5 z-10 h-[22px] w-[22px] border-b-2 border-l-2 border-[#d4443c] opacity-90" />

              {/* HUD top */}
              <div className="absolute inset-x-11 top-4 z-20 flex items-center justify-between text-[11px] text-[#e8e2da]">
                <div className="flex items-center gap-1.5 font-mono ltr:direction-ltr">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4443c]" />
                  REC
                </div>
                <div className="font-mono">{currentTime}</div>
              </div>

              {/* HUD bottom */}
              <div className="absolute inset-x-11 bottom-4 z-20 flex items-end justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-sm border border-white/15 bg-black/50 px-3 py-1.5 text-xs text-[#f2ede6] backdrop-blur-sm"
                  >
                    {activeService.hud}
                  </motion.div>
                </AnimatePresence>
                <div className="font-mono text-[10.5px] text-[#c9c2b8] opacity-75">
                  30.0131°N 31.2089°E
                </div>
              </div>
            </div>

            {/* caption */}
            <div className="mt-4 flex items-center justify-between px-0.5">
              <span className="text-sm text-[#9a9399]">
                {activeService.title}
              </span>
              <span className="font-mono text-xs text-[#9a9399]">
                FILE-{activeService.id}
              </span>
            </div>
          </div>

          {/* ============ LEFT: TAGS + STAT ============ */}
          <div className="order-3 flex flex-col gap-5">
            <div className="mb-0 flex justify-between font-mono text-[11.5px] text-[#9a9399]">
              <span>الملف</span>
              <span>نطاق التغطية</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-2.5"
              >
                {activeService.tags.map((tag) => (
                  <motion.div
                    key={tag}
                    variants={itemVariants}
                    className="flex items-center gap-2.5 rounded-lg border border-[#2a262b] bg-[#141216] px-4 py-3.5 text-sm text-[#d9d3cb] transition-all duration-300 hover:-translate-x-1 hover:border-[#7a1b1e] hover:bg-[#1b181d]"
                  >
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#d4443c]" />
                    {tag}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mt-2 flex flex-col gap-1 border-t border-[#2a262b] pt-5"
              >
                <span className="font-mono text-[34px] font-extrabold text-[#f2ede6]">
                  {activeService.stat}
                </span>
                <span className="text-xs leading-relaxed text-[#9a9399]">
                  {activeService.statLabel}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
