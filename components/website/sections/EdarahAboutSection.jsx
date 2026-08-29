"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Award,
  Zap,
  Handshake,
  ArrowUpLeft,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import CornerBrackets from "@/components/decor/Cornerbrackets";

const BRAND = "#5E1E2B";

const values = [
  {
    id: "01",
    title: "الأمانة",
    desc: "نتعامل مع أمن منشآت عملائنا وممتلكاتهم بمسؤولية تامة، وكأنها ممتلكاتنا الخاصة.",
    icon: ShieldCheck,
  },
  {
    id: "02",
    title: "الانضباط",
    desc: "نلتزم بأعلى معايير التشغيل والحوكمة في كل موقع نديره.",
    icon: Target,
  },
  {
    id: "03",
    title: "الاحترافية",
    desc: "نستثمر في تأهيل كوادرنا الأمنية باستمرار لضمان جاهزية ميدانية عالية.",
    icon: Award,
  },
  {
    id: "04",
    title: "الاستجابة السريعة",
    desc: "ندرك أن الأمن الحقيقي يُقاس بسرعة التعامل مع الطوارئ، لا فقط بالوجود الروتيني.",
    icon: Zap,
  },
  {
    id: "05",
    title: "الشراكة",
    desc: "نبني علاقات طويلة الأمد مع عملائنا مبنية على الثقة المتبادلة والفهم العميق لاحتياجاتهم.",
    icon: Handshake,
  },
];

export default function EdarahAboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 22,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <section
      dir="rtl"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f5f5f3]
        px-4
        py-14
        sm:px-6
        sm:py-16
        md:px-8
        md:py-20
        lg:py-24
      "
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Brand glow */}
        <div
          className="
            absolute
            -right-24
            top-0
            h-64
            w-64
            rounded-full
            blur-[80px]
            sm:-right-40
            sm:h-[500px]
            sm:w-[500px]
            sm:blur-[100px]
          "
          style={{
            backgroundColor: `${BRAND}09`,
          }}
        />

        <div
          className="
            absolute
            -bottom-32
            -left-32
            h-72
            w-72
            rounded-full
            blur-[100px]
          "
          style={{
            backgroundColor: `${BRAND}06`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* =========================================================
            HEADER
        ========================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          {/* Eyebrow */}

          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                text-white
                sm:h-8
                sm:w-8
              "
              style={{
                backgroundColor: BRAND,
              }}
            >
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>

            <span
              className="
                text-[11px]
                font-bold
                tracking-[0.15em]
                sm:text-xs
                md:text-sm
              "
              style={{
                color: BRAND,
              }}
            >
              EDARAH / ABOUT
            </span>
          </div>

          {/* Heading + intro */}

          <div
            className="
              grid
              gap-5
              sm:gap-8
              lg:grid-cols-[1fr_420px]
              lg:items-end
            "
          >
            <div>
              <h2
                className="
                  text-[clamp(2rem,6vw,4rem)]
                  font-black
                  leading-[1.12]
                  tracking-tight
                  text-[#1c1c1c]
                "
              >
                من نحن
              </h2>

              <div
                className="mt-4 h-[3px] w-12 sm:mt-6 sm:w-14"
                style={{
                  backgroundColor: BRAND,
                }}
              />
            </div>

            <p
              className="
                max-w-lg
                text-sm
                leading-6
                text-black/55
                sm:text-[15px]
                sm:leading-8
                md:text-base
              "
            >
              شركة متخصصة في تقديم الخدمات الأمنية المتكاملة للقطاعين العام
              والخاص، من خلال منظومة تجمع بين الكفاءة التشغيلية، الكوادر
              المؤهلة، والتقنيات الحديثة.
            </p>
          </div>
        </motion.div>

        {/* =========================================================
            MAIN BENTO
        ========================================================== */}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          className="
            grid
            grid-cols-1
            gap-4
            sm:gap-5
            md:gap-6
            lg:grid-cols-12
          "
        >
          {/* =====================================================
              ABOUT TEXT
          ====================================================== */}

          <motion.div variants={reveal} className="lg:col-span-7">
            <Card
              className="
                h-full
                rounded-[22px]
                border-black/[0.04]
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.025)]
                sm:rounded-[28px]
              "
            >
              <CardContent
                className="
                  flex
                  h-full
                  flex-col
                  justify-between
                  gap-5
                  p-5
                  sm:gap-5
                  sm:p-5
                  md:gap-6
                  md:p-7
                  lg:p-11
                "
              >
                {/* Top */}

                <div className="flex items-start justify-between">
                  <span
                    className="
                      text-xs
                      font-bold
                      tracking-widest
                      text-black/25
                    "
                  >
                    01
                  </span>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      sm:h-11
                      sm:w-11
                    "
                    style={{
                      backgroundColor: `${BRAND}12`,
                      color: BRAND,
                    }}
                  >
                    <ShieldCheck className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                </div>

                {/* Content */}

                <div>
                  <h3
                    className="
                      max-w-xl
                      text-2xl
                      font-extrabold
                      leading-[1.4]
                      text-[#1c1c1c]
                      sm:text-3xl
                      md:text-4xl
                    "
                  >
                    شريكك في
                    <br />
                    <span className="text-black/30">الأمن والاستقرار.</span>
                  </h3>

                  <div className="my-5 h-px w-full bg-black/[0.07] sm:my-6" />

                  <div
                    className="
                      space-y-3
                      text-sm
                      leading-6
                      text-black/55
                      sm:space-y-4
                      sm:text-[15px]
                      sm:leading-7
                      md:text-base
                    "
                  >
                    <p>
                      شركة متخصصة في تقديم الخدمات الأمنية المتكاملة للقطاعين
                      العام والخاص، تخدم عملاء متنوعين في القطاعات التجارية
                      والصناعية والسكنية والحكومية.
                    </p>

                    <p>
                      وتتبع الشركة إلى مجموعة العبيكان القابضة، إحدى أبرز
                      المجموعات الاقتصادية السعودية ذات الحضور الممتد في التطوير
                      العقاري والمقاولات والتشغيل والاستثمار وإدارة الأملاك.
                    </p>

                    <p>
                      نقدم مجموعة متكاملة من الخدمات التي تشمل الحراسات الأمنية،
                      والمراقبة الإلكترونية، وإدارة المخاطر، إلى جانب برامج
                      تدريب متخصصة لتأهيل كوادرنا الأمنية وفق أعلى المعايير
                      المهنية.
                    </p>
                  </div>
                </div>

                {/* Bottom */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-3
                    border-t
                    border-black/[0.07]
                    pt-5
                  "
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0"
                      style={{
                        color: BRAND,
                      }}
                    />

                    <span className="text-xs font-medium text-black/40">
                      منظومة أمنية متكاملة
                    </span>
                  </div>

                  <span className="text-xs font-bold text-black/20">
                    EDARAH
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* =====================================================
              IMAGE
          ====================================================== */}

          <motion.div variants={reveal} className="h-full lg:col-span-5">
            <Card
              className="
                group
                relative
                h-full
                overflow-hidden
                rounded-[22px]
                border-0
                bg-black
                p-0
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                sm:rounded-[28px]
              "
            >
              <div
                className="
                  relative
                  h-[300px]
                  w-full
                  overflow-hidden
                  sm:h-[380px]
                  lg:h-full
                  lg:min-h-[500px]
                "
              >
                {/* Image */}

                <Image
                  src="/man3.webp"
                  alt="إدارة للخدمات الأمنية"
                  fill
                  priority
                  unoptimized
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 100vw,
                    40vw
                  "
                  className="
                    object-cover
                    object-[50%_30%]
                    grayscale-[10%]
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.04]
                  "
                />

                {/* Cinematic gradient */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/90
                    via-black/30
                    to-black/5
                  "
                />

                {/* Brand tint */}

                <div
                  className="
                    absolute
                    inset-0
                    mix-blend-multiply
                  "
                  style={{
                    backgroundColor: `${BRAND}14`,
                  }}
                />

                {/* Vignette */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]
                  "
                />

                {/* Corner brackets */}

                <CornerBrackets />

                {/* Arrow */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    z-20
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-white
                    shadow-lg
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    sm:left-6
                    sm:top-6
                    sm:h-11
                    sm:w-11
                  "
                  style={{
                    backgroundColor: BRAND,
                  }}
                >
                  <ArrowUpLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>

                {/* Small label */}

                <div
                  className="
                    absolute
                    right-4
                    top-5
                    z-20
                    font-mono
                    text-[8px]
                    tracking-[0.15em]
                    text-white/45
                    sm:right-6
                    sm:top-7
                    sm:text-[9px]
                  "
                >
                  EDARAH / 01
                </div>

                {/* Bottom content */}

                <div
                  className="
                    absolute
                    inset-x-5
                    bottom-5
                    z-20
                    text-white
                    sm:inset-x-7
                    sm:bottom-7
                  "
                >
                  <span
                    className="
                      mb-2
                      block
                      text-[9px]
                      font-bold
                      tracking-[0.2em]
                      text-white/50
                      sm:mb-3
                      sm:text-[10px]
                    "
                  >
                    SECURITY SERVICES
                  </span>

                  <h3
                    className="
                      text-xl
                      font-extrabold
                      leading-[1.25]
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    حماية تبدأ من
                    <br />
                    التفاصيل.
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-sm
                      text-xs
                      leading-6
                      text-white/70
                      sm:mt-4
                      sm:text-sm
                      sm:leading-7
                    "
                  >
                    نعمل وفق منهجيات تشغيل واضحة تضمن بيئة آمنة ومستقرة
                    لعملائنا.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* =========================================================
            VISION / MISSION
        ========================================================== */}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            sm:mt-5
            sm:gap-5
            md:mt-6
            md:gap-6
            lg:grid-cols-2
          "
        >
          {/* Vision */}

          <motion.div variants={reveal}>
            <Card
              className="
                h-full
                rounded-[22px]
                border-black/[0.04]
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.02)]
                transition-all
                duration-300
                hover:-translate-y-1
                motion-reduce:hover:translate-y-0
                sm:rounded-[28px]
              "
            >
              <CardContent className="p-5 sm:p-7 md:p-9">
                <div className="mb-5 flex items-center justify-between sm:mb-7">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      sm:h-11
                      sm:w-11
                    "
                    style={{
                      backgroundColor: `${BRAND}12`,
                      color: BRAND,
                    }}
                  >
                    <Target className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-black/20">
                    02
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-extrabold text-[#1c1c1c] sm:mb-4 sm:text-2xl">
                  الرؤية
                </h3>

                <p className="max-w-xl text-sm leading-6 text-black/50 sm:text-[15px] sm:leading-7 md:text-base">
                  أن نكون الخيار الأمني الأول للمنشآت والمؤسسات في المملكة، من
                  خلال منظومة حماية تجمع بين الانضباط المؤسسي والكفاءة التشغيلية
                  العالية.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mission */}

          <motion.div variants={reveal}>
            <Card
              className="
                h-full
                rounded-[22px]
                border-black/[0.04]
                bg-[#1c1c1c]
                text-white
                shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                transition-all
                duration-300
                hover:-translate-y-1
                motion-reduce:hover:translate-y-0
                sm:rounded-[28px]
              "
            >
              <CardContent className="p-5 sm:p-7 md:p-9">
                <div className="mb-5 flex items-center justify-between sm:mb-7">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-white
                      sm:h-11
                      sm:w-11
                    "
                    style={{
                      backgroundColor: BRAND,
                    }}
                  >
                    <Award className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-white/20">
                    03
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-extrabold sm:mb-4 sm:text-2xl">
                  الرسالة
                </h3>

                <p className="max-w-xl text-sm leading-6 text-white/55 sm:text-[15px] sm:leading-7 md:text-base">
                  نقدم حلول أمنية متكاملة ومصممة لاحتياجات كل عميل، معتمدين على
                  كوادر مؤهلة، ومنهجيات تشغيل واضحة، وأنظمة مراقبة وتقنية حديثة،
                  بما يضمن بيئة آمنة ومستقرة تمكن عملاءنا من التركيز على أعمالهم
                  دون قلق.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* =========================================================
            VALUES
        ========================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="mt-12 sm:mt-16 md:mt-20"
        >
          {/* Values header */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-3
              sm:mb-8
              sm:gap-4
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div>
              <div className="mb-3 flex items-center gap-3 sm:mb-4">
                <span
                  className="h-1 w-8 rounded-full"
                  style={{
                    backgroundColor: BRAND,
                  }}
                />

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
                  EDARAH / VALUES
                </span>
              </div>

              <h3
                className="
                  text-[clamp(1.75rem,4.5vw,3rem)]
                  font-black
                  tracking-tight
                  text-[#1c1c1c]
                "
              >
                القيم التي تقودنا.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-black/45 sm:leading-7">
              مبادئ راسخة تشكل طريقة عملنا، وتحدد مستوى الخدمة التي نقدمها
              لعملائنا.
            </p>
          </div>

          {/* Values grid */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: "-40px",
            }}
            className="
              grid
              grid-cols-2
              gap-3
              sm:gap-4
              md:grid-cols-3
              xl:grid-cols-5
            "
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.id}
                  variants={reveal}
                  className="
                    col-span-2
                    sm:col-span-1
                    first:col-span-2
                    sm:first:col-span-1
                  "
                >
                  <Card
                    className="
                      group
                      relative
                      h-full
                      min-h-[190px]
                      overflow-hidden
                      rounded-[18px]
                      border-black/[0.04]
                      bg-white
                      shadow-[0_8px_30px_rgba(0,0,0,0.02)]
                      transition-all
                      duration-500
                      hover:-translate-y-1.5
                      hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)]
                      motion-reduce:hover:translate-y-0
                      sm:min-h-[250px]
                      sm:rounded-[26px]
                    "
                  >
                    <CornerBrackets
                      color={BRAND}
                      className="
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    <CardContent className="flex h-full flex-col p-4 sm:p-6">
                      {/* Top */}

                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold tracking-widest text-black/20">
                          {value.id}
                        </span>

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-[#f5f5f3]
                            transition-all
                            duration-300
                            group-hover:bg-[#5E1E2B]
                            group-hover:text-white
                            sm:h-11
                            sm:w-11
                          "
                          style={{
                            color: BRAND,
                          }}
                        >
                          <Icon
                            className="h-4.5 w-4.5 sm:h-5 sm:w-5"
                            strokeWidth={1.6}
                          />
                        </div>
                      </div>

                      {/* Content */}

                      <div className="mt-auto pt-5 sm:pt-6">
                        <h4
                          className="
                            mb-1.5
                            text-base
                            font-extrabold
                            text-[#1c1c1c]
                            sm:mb-2
                            sm:text-xl
                          "
                        >
                          {value.title}
                        </h4>

                        <p
                          className="
                            text-[12.5px]
                            leading-5
                            text-black/45
                            sm:text-sm
                            sm:leading-6
                          "
                        >
                          {value.desc}
                        </p>
                      </div>

                      {/* Bottom hover line */}

                      <div
                        className="
                          absolute
                          bottom-0
                          right-0
                          h-1
                          w-0
                          transition-all
                          duration-500
                          group-hover:w-full
                        "
                        style={{
                          backgroundColor: BRAND,
                        }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* =========================================================
            FOOTER STATEMENT
        ========================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-black/10
            pt-5
            sm:mt-12
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:pt-6
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: BRAND,
              }}
            />

            <span className="text-xs font-medium text-black/40">
              حماية تُدار باحترافية.
            </span>
          </div>

          <span className="text-[10px] font-bold tracking-[0.2em] text-black/20">
            EDARAH SECURITY SERVICES
          </span>
        </motion.div>
      </div>
    </section>
  );
}
