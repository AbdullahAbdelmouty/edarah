"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, ShieldCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import CornerBrackets from "@/components/decor/Cornerbrackets";

const BRAND = "#5E1E2B";

const clients = [
  {
    id: "01",
    name: "Hamat",
    logo: "/clients/hamat.png",
    category: "المراكز التجارية",
    description:
      "إحدى الشركات الرائدة في تطوير وتشغيل المراكز التجارية بالمملكة، ويُعد مركز ذا بارك في الطائف أحد مراكزها التابعة. ندير المنظومة الأمنية الشاملة للمركز، وتشمل الحراسات الميدانية، والمراقبة الإلكترونية، وإدارة الدوريات، إضافة إلى التنسيق الأمني خلال الفعاليات الموسمية التي يستضيفها.",
    services: [
      "الحراسات الميدانية",
      "المراقبة الإلكترونية",
      "إدارة الدوريات",
      "التنسيق الأمني",
    ],
  },

  {
    id: "02",
    name: "BinDawood",
    logo: "/clients/bin-dawood.png",
    category: "قطاع التجزئة",
    description:
      "يمتلك سلسلة سوبر ماركت وهايبر ماركت، ويُعد من أبرز الأسماء في قطاع التجزئة في السوق السعودي. ندير لعميلنا المنظومة الأمنية، وتشمل الحراسات الميدانية، وضبط الدخول والخروج، ومراقبة الحركة، بما يضمن بيئة تسوق آمنة للمتسوقين على مدار ساعات العمل.",
    services: ["الحراسات الميدانية", "ضبط الدخول والخروج", "مراقبة الحركة"],
  },

  {
    id: "03",
    name: "شعور",
    logo: "/clients/shoour.png",
    category: "الوجهات الترفيهية",
    description:
      "شركة سعودية متخصصة في تطوير وتشغيل الوجهات والتجارب الترفيهية المتكاملة، من التصميم إلى الإشراف على التشغيل باحتراف. تقدم شركة إدارة للخدمات الأمنية الغطاء الأمني لمشاريعها التشغيلية، بما يتناسب مع طبيعة الوجهات عالية الحركة وكثافة الزوار.",
    services: ["التغطية الأمنية", "تأمين الزوار", "التشغيل الميداني"],
  },

  {
    id: "04",
    name: "Danube",
    logo: "/clients/danube.png",
    category: "قطاع التجزئة",
    description:
      "سلسلة أسواق مركزية سعودية، تشتهر بتجربة تسوق راقية ومنتجات مستوردة مختارة. نتولى الإدارة الأمنية، وتشمل الحراسات الميدانية بكادر أمني مؤهل وضبط الدخول والخروج.",
    services: ["الحراسات الميدانية", "ضبط الدخول والخروج"],
  },

  {
    id: "05",
    name: "مدينة الورود",
    logo: "/clients/al-wurood.png",
    category: "التطوير العمراني",
    description:
      "أحد أضخم المشاريع التطويرية العمرانية في محافظة الطائف، ويضم آلاف الوحدات السكنية إضافة إلى مراكز تجارية وترفيهية ومنتزهات ومرافق خدمية متكاملة تخدم السكان والزوار على حد سواء. نتولى المنظومة الأمنية الشاملة للمدينة، وتشمل استقبال ومراقبة الطوارئ والمرافق العامة، والتنسيق الأمني مع إدارة المدينة خلال الفعاليات والحجوزات الكبرى.",
    services: [
      "المنظومة الأمنية الشاملة",
      "مراقبة الطوارئ",
      "تأمين المرافق العامة",
      "التنسيق الأمني",
    ],
  },

  {
    id: "06",
    name: "ألبان الطائف",
    logo: "/clients/taif-dairy.png",
    category: "المنشآت الصناعية",
    description:
      "من أقدم مصانع الألبان في السعودية، بدأ إنتاجه عام 1404هـ، ويضم خطوط إنتاج وتوزيع تعمل باستمرار لتلبية الطلب المتزايد. نتولى تأمين المنشأة الصناعية، وتشمل ضبط الدخول والخروج لخطوط الإنتاج والمستودعات، وتطبيق بروتوكولات السلامة الأمنية الخاصة بالمنشآت الغذائية.",
    services: [
      "تأمين المنشأة الصناعية",
      "خطوط الإنتاج",
      "المستودعات",
      "بروتوكولات السلامة",
    ],
  },

  {
    id: "07",
    name: "أسمنت أم القرى",
    logo: "/clients/umm-al-qura-cement.png",
    category: "القطاع الصناعي",
    description:
      "شركة مساهمة متخصصة في إنتاج الأسمنت بأنواعه، وإدارة وتشغيل مصانع الأسمنت، ولها مصنع بالقرب من الطائف. نتولى تأمين المنشأة الصناعية، وتشمل ضبط الدخول والخروج، وحماية خطوط الإنتاج والمعدات، ومراقبة حركة الشاحنات والتوزيع.",
    services: [
      "تأمين المنشأة الصناعية",
      "حماية خطوط الإنتاج",
      "حماية المعدات",
      "مراقبة الشاحنات",
    ],
  },

  {
    id: "08",
    name: "مجمع قلب الطائف",
    logo: "/clients/qalb-taif.png",
    category: "المجمعات التجارية والترفيهية",
    description:
      "من أكبر المجمعات التجارية والترفيهية في مدينة الطائف، بطاقة استيعابية تصل إلى 450 محل تجاري، إضافة إلى منطقة ألعاب وملاهٍ ومصليات. ندير المنظومة الأمنية الشاملة للمجمع، بتغطية تمتد لكافة نقاط الدخول والممرات التجارية والمناطق الترفيهية.",
    services: [
      "نقاط الدخول",
      "الممرات التجارية",
      "المناطق الترفيهية",
      "التغطية الأمنية الشاملة",
    ],
  },

  {
    id: "09",
    name: "وزارة الصحة",
    logo: "/clients/ministry-health.png",
    category: "القطاع الحكومي / الصحي",
    description:
      "مستشفى الأطفال، منشأة صحية حكومية متخصصة في رعاية الأطفال، تخضع لإشراف وزارة الصحة. نتولى التغطية الأمنية على مدار الساعة مع مراعاة حساسية المنشآت الصحية، وتشمل ضبط الدخول والخروج وتأمين أقسام الطوارئ، وفق معايير الالتزام والحوكمة التي يتطلبها القطاع الحكومي.",
    services: [
      "تغطية أمنية 24/7",
      "ضبط الدخول والخروج",
      "تأمين الطوارئ",
      "الحوكمة والالتزام",
    ],
  },
];

export default function ClientsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const client = clients[activeIndex];

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % clients.length);
  };

  const goPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  return (
    <section
      dir="rtl"
      className="
        relative
        overflow-hidden
        bg-[#f5f5f3]
        px-4
        py-16
        sm:px-6
        md:px-8
        md:py-24
      "
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg,#000 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          className="
            absolute
            -right-40
            -top-40
            h-[500px]
            w-[500px]
            rounded-full
            blur-[120px]
          "
          style={{
            backgroundColor: `${BRAND}08`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-8
            flex
            flex-col
            gap-6
            md:mb-12
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  text-white
                "
                style={{
                  backgroundColor: BRAND,
                }}
              >
                <ShieldCheck className="h-4 w-4" />
              </span>

              <span
                className="
                  text-xs
                  font-bold
                  tracking-[0.15em]
                "
                style={{
                  color: BRAND,
                }}
              >
                EDARAH / CLIENTS
              </span>
            </div>

            <h2
              className="
                text-4xl
                font-black
                tracking-tight
                text-[#1c1c1c]
                sm:text-5xl
                lg:text-6xl
              "
            >
              نبذة عن عملائنا
            </h2>

            <div
              className="mt-5 h-[3px] w-14"
              style={{
                backgroundColor: BRAND,
              }}
            />
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-7 text-black/50 md:text-base">
              نفخر بثقة عملائنا في قطاعات متنوعة، ونقدم لكل موقع منظومة أمنية
              مصممة وفق طبيعته واحتياجاته التشغيلية.
            </p>
          </div>
        </motion.div>

        {/* ================= MAIN CLIENT ================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            lg:grid-cols-12
            lg:gap-6
          "
        >
          {/* ================= LOGO PANEL ================= */}

          <motion.div layout className="lg:col-span-4">
            <Card
              className="
                group
                relative
                h-full
                min-h-[300px]
                overflow-hidden
                rounded-[28px]
                border-black/[0.04]
                bg-[#1c1c1c]
                text-white
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              "
            >
              <CornerBrackets color={BRAND} className="opacity-70" />

              {/* top line */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[3px]
                "
                style={{
                  backgroundColor: BRAND,
                }}
              />

              <CardContent
                className="
                  relative
                  flex
                  h-full
                  min-h-[300px]
                  flex-col
                  p-6
                  sm:p-8
                "
              >
                {/* Number */}

                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-widest text-white/25">
                    CLIENT
                  </span>

                  <span className="font-mono text-sm text-white/30">
                    {client.id}
                  </span>
                </div>

                {/* Logo */}

                <div
                  className="
                    my-auto
                    flex
                    min-h-[150px]
                    items-center
                    justify-center
                    rounded-[22px]
                    bg-white
                    p-8
                  "
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={client.id}
                      initial={{
                        opacity: 0,
                        scale: reduceMotion ? 1 : 0.94,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: reduceMotion ? 1 : 1.04,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="
                        relative
                        h-[90px]
                        w-[190px]
                      "
                    >
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        sizes="190px"
                        className="
                          object-contain
                        "
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] tracking-[0.18em] text-white/30">
                      SECTOR
                    </span>

                    <span className="mt-1 block text-sm font-medium text-white/70">
                      {client.category}
                    </span>
                  </div>

                  <Building2 className="h-5 w-5 text-white/20" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ================= DESCRIPTION ================= */}

          <motion.div className="lg:col-span-8">
            <Card
              className="
                relative
                h-full
                min-h-[300px]
                overflow-hidden
                rounded-[28px]
                border-black/[0.04]
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.025)]
              "
            >
              <CardContent
                className="
                  flex
                  h-full
                  flex-col
                  justify-between
                  p-6
                  sm:p-8
                  md:p-10
                  lg:p-12
                "
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={client.id}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: reduceMotion ? 0 : -12,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="flex h-full flex-col"
                  >
                    {/* Label */}

                    <div className="flex items-center justify-between">
                      <span
                        className="
                          text-[10px]
                          font-bold
                          tracking-[0.2em]
                        "
                        style={{
                          color: BRAND,
                        }}
                      >
                        CLIENT PROFILE
                      </span>

                      <span className="font-mono text-[10px] text-black/20">
                        {client.id} / {String(clients.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}

                    <div className="mt-10">
                      <span className="text-xs font-medium text-black/35">
                        {client.category}
                      </span>

                      <h3
                        className="
                          mt-2
                          text-3xl
                          font-black
                          tracking-tight
                          text-[#1c1c1c]
                          sm:text-4xl
                          md:text-5xl
                        "
                      >
                        {client.name}
                      </h3>
                    </div>

                    {/* Divider */}

                    <div className="my-6 h-px bg-black/[0.07]" />

                    {/* Description */}

                    <p
                      className="
                        max-w-3xl
                        text-sm
                        leading-7
                        text-black/55
                        sm:text-[15px]
                        sm:leading-8
                        md:text-base
                      "
                    >
                      {client.description}
                    </p>

                    {/* Services */}

                    <div className="mt-8">
                      <span className="mb-3 block text-[10px] font-bold tracking-[0.18em] text-black/25">
                        SECURITY SCOPE
                      </span>

                      <div className="flex flex-wrap gap-2">
                        {client.services.map((service) => (
                          <span
                            key={service}
                            className="
                              rounded-full
                              border
                              border-black/[0.06]
                              bg-[#f5f5f3]
                              px-3.5
                              py-2
                              text-xs
                              font-medium
                              text-black/50
                            "
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Controls */}

                    <div
                      className="
                        mt-auto
                        flex
                        items-center
                        justify-between
                        border-t
                        border-black/[0.07]
                        pt-6
                      "
                    >
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={goPrevious}
                          aria-label="العميل السابق"
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/[0.08]
                            text-black/50
                            transition-all
                            hover:border-[#5E1E2B]
                            hover:bg-[#5E1E2B]
                            hover:text-white
                          "
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={goNext}
                          aria-label="العميل التالي"
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-black/[0.08]
                            text-black/50
                            transition-all
                            hover:border-[#5E1E2B]
                            hover:bg-[#5E1E2B]
                            hover:text-white
                          "
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Progress */}

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-black/25">
                          {client.id}
                        </span>

                        <div className="hidden h-[2px] w-24 bg-black/[0.07] sm:block">
                          <motion.div
                            className="h-full"
                            style={{
                              backgroundColor: BRAND,
                            }}
                            animate={{
                              width: `${((activeIndex + 1) / clients.length) * 100}%`,
                            }}
                            transition={{
                              duration: 0.35,
                            }}
                          />
                        </div>

                        <span className="font-mono text-xs text-black/20">
                          {String(clients.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ================= CLIENT NAVIGATION ================= */}

        <div
          className="
            mt-4
            grid
            grid-cols-3
            gap-2
            sm:grid-cols-5
            lg:grid-cols-9
            lg:gap-3
          "
        >
          {clients.map((item, index) => {
            const active = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[14px]
                  border
                  px-3
                  py-3
                  text-right
                  transition-all
                  duration-300
                  ${
                    active
                      ? "border-[#5E1E2B]/20 bg-[#5E1E2B] text-white"
                      : "border-black/[0.05] bg-white text-black/40 hover:border-[#5E1E2B]/20"
                  }
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`
                      font-mono
                      text-[9px]
                      ${active ? "text-white/40" : "text-black/20"}
                    `}
                  >
                    {item.id}
                  </span>

                  <span
                    className={`
                      truncate
                      text-[11px]
                      font-bold
                      ${active ? "text-white" : "text-black/45"}
                    `}
                  >
                    {item.name}
                  </span>
                </div>

                {active && (
                  <motion.div
                    layoutId="client-active"
                    className="absolute bottom-0 right-0 h-[2px] w-full bg-white/50"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ================= FOOTER ================= */}

        <div
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-black/10
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: BRAND,
              }}
            />

            <span className="text-xs text-black/40">
              شراكات مبنية على الثقة والخبرة التشغيلية.
            </span>
          </div>

          <span className="font-mono text-[9px] tracking-[0.2em] text-black/20">
            EDARAH SECURITY SERVICES
          </span>
        </div>
      </div>
    </section>
  );
}
