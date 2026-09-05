"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

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
      "https://images.unsplash.com/photo-1741034793661-3bd2a33d5b1b?auto=format&fit=crop&w=1400&q=85",
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
      "https://images.unsplash.com/photo-1753153481105-7a979eabe5a9?auto=format&fit=crop&w=1400&q=85",
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
      "https://images.unsplash.com/photo-1736108920938-d52d001a6004?auto=format&fit=crop&w=1400&q=85",
    risk: false,
  },
  {
    id: "004",
    title: "الحماية الشخصية",
    badge: "VIP",
    stat: "1:1",
    statLabel: "مرافقة مخصصة لكل شخصية محمية",
    description:
      "فرق حماية مؤهلة لمرافقة وتأمين كبار الشخصيات وفق بروتوكولات أمنية دقيقة ومدروسة.",
    tags: ["مرافقة وتأمين", "كبار الشخصيات", "بروتوكولات أمنية"],
    image:
      "https://images.unsplash.com/photo-1622482607282-fffed5a93942?auto=format&fit=crop&w=1400&q=85",
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
      "https://images.unsplash.com/photo-1736108920938-d52d001a6004?auto=format&fit=crop&w=1400&q=85",
    risk: true,
  },
];

const tagContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const tagVariants = {
  hidden: {
    opacity: 0,
    x: 12,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function LiveClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => {
      setTime(formatter.format(new Date()));
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-white/75 sm:text-[11px]"
      aria-label={`الوقت الحالي ${time}`}
    >
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#d4443c] shadow-[0_0_8px_rgba(212,68,60,0.9)]"
        aria-hidden="true"
      />
      <span dir="ltr">{time}</span>
      <span className="hidden text-white/35 sm:inline">LIVE</span>
    </div>
  );
}

function HudCorner({ position }) {
  const positions = {
    topRight: "right-4 top-4 border-r border-t",
    topLeft: "left-4 top-4 border-l border-t",
    bottomRight: "bottom-4 right-4 border-b border-r",
    bottomLeft: "bottom-4 left-4 border-b border-l",
  };

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 h-6 w-6 border-[#d4443c]/80 ${positions[position]}`}
    />
  );
}

export default function EdarahServicesSection() {
  const [activeId, setActiveId] = useState(services[0].id);

  const reduceMotion = useReducedMotion();

  const activeService =
    services.find((service) => service.id === activeId) ?? services[0];

  return (
    <section
      dir="rtl"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-[#09090b] text-[#f2ede6]"
    >
      {/* ================= BACKGROUND ================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[#09090b]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] -top-[20%] -z-10 h-[700px] w-[700px] rounded-full bg-[#7a1b1e]/15 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[20%] -right-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-[#5a1115]/10 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:80px_80px]"
      />

      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-10 lg:py-32">
        {/* ================= HEADER ================= */}

        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2
                id="services-heading"
                className="text-[clamp(2rem,6vw,4rem)] font-black leading-[0.85] tracking-[-0.045em]"
              >
                الخدمات
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-8 text-white/45 md:text-base">
              حلول أمنية متكاملة مصممة لحماية المنشآت والأفراد والفعاليات،
              باستخدام فرق متخصصة وتقنيات مراقبة وتقييم متقدمة.
            </p>
          </div>
        </motion.header>

        {/* ================= MAIN ================= */}

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(260px,.9fr)_minmax(380px,1.35fr)_minmax(240px,.8fr)] lg:gap-8 xl:gap-12">
          {/* ================= SERVICES ================= */}

          <nav
            aria-label="الخدمات الأمنية"
            className="order-1 lg:sticky lg:top-24"
          >
            <div
              role="tablist"
              aria-orientation="vertical"
              className="border-t border-white/10"
            >
              {services.map((service, index) => {
                const isActive = service.id === activeId;

                return (
                  <motion.button
                    key={service.id}
                    id={`service-tab-${service.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`service-panel-${service.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(service.id)}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            x: -4,
                          }
                    }
                    className="group relative block w-full overflow-hidden border-b border-white/10 py-5 text-right outline-none sm:py-6"
                  >
                    {/* active background */}
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                      }}
                      className="absolute inset-0 bg-gradient-to-l from-[#d4443c]/[0.07] to-transparent"
                    />

                    {/* active line */}
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        scaleY: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 top-0 h-full w-[2px] origin-center bg-[#d4443c]"
                    />

                    <div className="relative flex items-start gap-4 px-3 sm:px-4">
                      <span
                        dir="ltr"
                        className={`mt-1 font-mono text-[10px] transition-colors ${
                          isActive ? "text-[#d4443c]" : "text-white/25"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-lg font-bold leading-tight transition-colors duration-300 sm:text-xl xl:text-[22px] ${
                              isActive
                                ? "text-[#f5f0e9]"
                                : "text-white/45 group-hover:text-white/75"
                            }`}
                          >
                            {service.title}
                          </span>

                          {service.badge && (
                            <span className="rounded-sm border border-[#d4443c]/40 bg-[#d4443c]/10 px-1.5 py-0.5 font-mono text-[9px] text-[#e8645c]">
                              {service.badge}
                            </span>
                          )}
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={
                                reduceMotion
                                  ? false
                                  : {
                                      height: 0,
                                      opacity: 0,
                                    }
                              }
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <p className="max-w-sm pt-4 text-sm leading-7 text-white/40">
                                {service.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* ================= IMAGE / VIEWFINDER ================= */}

          <div
            id={`service-panel-${activeService.id}`}
            role="tabpanel"
            aria-labelledby={`service-tab-${activeService.id}`}
            className="order-2"
          >
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/[0.08] bg-[#111113] shadow-[0_35px_100px_-30px_rgba(0,0,0,.9)] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/11]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            scale: 1.06,
                          }
                    }
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={
                      reduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            scale: 1.025,
                          }
                    }
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeService.image}
                      alt={`${activeService.title} - إدارة للخدمات الأمنية`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className={`object-cover ${
                        activeService.risk
                          ? "brightness-[.55] contrast-[1.12] saturate-[.55] sepia-[.15]"
                          : "brightness-[.62] contrast-[1.08] saturate-[.75]"
                      }`}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* cinematic overlays */}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(3,3,4,.92)_0%,rgba(3,3,4,.15)_48%,rgba(3,3,4,.25)_100%)]"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,.7)_120%)]"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(0deg,white_0px,white_1px,transparent_1px,transparent_4px)]"
                />

                <HudCorner position="topRight" />
                <HudCorner position="topLeft" />
                <HudCorner position="bottomRight" />
                <HudCorner position="bottomLeft" />

                {/* top HUD */}

                <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between">
                  <LiveClock />

                  <span className="font-mono text-[9px] tracking-[0.18em] text-white/35 sm:text-[10px]">
                    CAM / {activeService.id}
                  </span>
                </div>

                {/* bottom image info */}

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.id}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 15,
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1,
                      }}
                    >
                      <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-[#e05850]">
                        ACTIVE SERVICE
                      </span>

                      <h3 className="max-w-lg text-2xl font-black leading-tight text-white sm:text-3xl">
                        {activeService.title}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* decorative index */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 left-4 hidden font-mono text-[80px] font-black leading-none text-white/[0.025] xl:block"
              >
                {activeService.id}
              </div>
            </div>
          </div>

          {/* ================= DETAILS ================= */}

          <aside className="order-3">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-bold text-white/80">
                نطاق التغطية
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`tags-${activeService.id}`}
                variants={tagContainerVariants}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                className="space-y-2"
              >
                {activeService.tags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    variants={tagVariants}
                    className="group flex items-center justify-between border border-white/[0.08] bg-white/[0.025] px-4 py-3.5 transition-colors hover:border-[#d4443c]/35 hover:bg-[#d4443c]/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#d4443c] shadow-[0_0_6px_rgba(212,68,60,.6)]"
                      />

                      <span className="text-sm text-white/65 transition-colors group-hover:text-white/90">
                        {tag}
                      </span>
                    </div>

                    <span
                      dir="ltr"
                      className="font-mono text-[9px] text-white/20"
                    >
                      0{index + 1}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ================= STAT ================= */}

            <div className="mt-8 border-t border-white/10 pt-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`stat-${activeService.id}`}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                >
                  <div className="mb-3 flex items-end justify-between gap-4">
                    <span
                      dir="ltr"
                      className="font-mono text-[clamp(2.6rem,5vw,4.25rem)] font-black leading-none tracking-[-0.06em] text-[#f2ede6]"
                    >
                      {activeService.stat}
                    </span>

                    <span className="mb-1 h-px flex-1 bg-gradient-to-l from-white/15 to-transparent" />
                  </div>

                  <p className="max-w-[260px] text-xs leading-6 text-white/40 sm:text-sm">
                    {activeService.statLabel}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ================= STATUS ================= */}

            <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-4 font-mono text-[9px] tracking-[0.12em] text-white/20">
              <span>EDARAH SECURITY</span>

              <span className="flex items-center gap-2">
                OPERATIONAL
                <span className="h-1 w-1 rounded-full bg-emerald-400/80" />
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
