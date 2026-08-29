"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Award,
  Zap,
  Handshake,
  ArrowUpLeft,
  Check,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function EdarahAboutSection() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#08090a] py-24 text-white sm:py-32"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Red glow */}
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#8f2026]/10 blur-[150px]" />

        <div className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-[#8f2026]/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-12 bg-[#98252b]" />

            <span className="font-mono text-[10px] font-medium tracking-[0.25em] text-white/30">
              EDARAH / ABOUT
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <h2 className="text-5xl font-black leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                من نحن
              </h2>

              <div className="mt-7 h-[3px] w-16 bg-[#98252b]" />
            </div>

            <p className="max-w-md text-sm leading-8 text-white/40 lg:text-base">
              شركة متخصصة في تقديم الخدمات الأمنية المتكاملة، نعمل على بناء
              بيئات أكثر أمانًا من خلال منظومة تجمع بين الكفاءة التشغيلية،
              الكوادر المؤهلة، والتقنيات الحديثة.
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            ABOUT / IMAGE
        ====================================================== */}

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Image */}

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative min-h-[520px] overflow-hidden sm:min-h-[620px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1582136009418-4202353a479a?auto=format&fit=crop&w=1400&q=85"
              alt="إدارة للخدمات الأمنية"
              fill
              unoptimized
              className="
                object-cover
                grayscale
                contrast-[1.1]
                transition-transform
                duration-[1.4s]
                group-hover:scale-105
              "
            />

            {/* Dark overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

            {/* Red tint */}

            <div className="absolute inset-0 bg-[#63151a]/10 mix-blend-multiply" />

            {/* Border */}

            <div className="absolute inset-5 border border-white/10" />

            {/* Top label */}

            <div className="absolute right-8 top-8 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a52a30] shadow-[0_0_16px_rgba(165,42,48,0.8)]" />

              <span className="font-mono text-[10px] tracking-[0.2em] text-white/60">
                SECURITY / 24
              </span>
            </div>

            {/* Bottom information */}

            <div className="absolute bottom-8 right-8 left-8">
              <div className="mb-5 h-px w-16 bg-[#a52a30]" />

              <p className="max-w-sm text-sm leading-8 text-white/60">
                حماية متكاملة تساعد عملاءنا على التركيز على أعمالهم بثقة
                واستقرار.
              </p>
            </div>
          </motion.div>

          {/* Text */}

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-between border border-white/[0.07] bg-white/[0.02] p-7 sm:p-10 lg:p-12"
          >
            <div>
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-xs text-white/25">01 / 02</span>

                <ShieldCheck className="h-6 w-6 text-[#98252b]" />
              </div>

              <h3 className="text-2xl font-extrabold leading-relaxed sm:text-3xl">
                شريكك في
                <br />
                <span className="text-white/35">الأمن والاستقرار.</span>
              </h3>

              <div className="my-8 h-px bg-white/[0.08]" />

              <div className="space-y-6 text-sm leading-8 text-white/40">
                <p>
                  شركة متخصصة في تقديم الخدمات الأمنية المتكاملة للقطاعين العام
                  والخاص، تخدم عملاء متنوعين في القطاعات التجارية والصناعية
                  والسكنية والحكومية.
                </p>

                <p>
                  وتتبع الشركة إلى مجموعة العبيكان القابضة، إحدى أبرز المجموعات
                  الاقتصادية السعودية ذات الحضور الممتد في التطوير العقاري
                  والمقاولات والتشغيل والاستثمار وإدارة الأملاك.
                </p>

                <p>
                  نقدم مجموعة متكاملة من الخدمات التي تشمل الحراسات الأمنية،
                  والمراقبة الإلكترونية، وإدارة المخاطر، إلى جانب برامج تدريب
                  متخصصة لتأهيل كوادرنا الأمنية وفق أعلى المعايير المهنية.
                </p>
              </div>
            </div>

            {/* Bottom */}

            <div className="mt-12 flex items-center justify-between border-t border-white/[0.08] pt-6">
              <span className="text-xs text-white/25">
                جزء من مجموعة العبيكان القابضة
              </span>

              <ArrowUpLeft className="h-5 w-5 text-white/20" />
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            VISION / MISSION
        ====================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-5 overflow-hidden border border-white/[0.08]"
        >
          <Image
            src="https://images.unsplash.com/photo-1590424681669-e09210eb70d1?auto=format&fit=crop&w=1800&q=85"
            alt=""
            fill
            unoptimized
            className="object-cover grayscale opacity-20"
          />

          <div className="absolute inset-0 bg-[#08090a]/90" />

          <div className="relative grid lg:grid-cols-2">
            {/* Vision */}

            <div className="border-b border-white/[0.08] p-8 sm:p-12 lg:border-b-0 lg:border-l">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#98252b]">
                  01 / VISION
                </span>

                <Target className="h-5 w-5 text-white/20" />
              </div>

              <h3 className="mb-5 text-2xl font-black">الرؤية</h3>

              <p className="max-w-xl text-sm leading-8 text-white/40">
                أن نكون الخيار الأمني الأول للمنشآت والمؤسسات في المملكة، من
                خلال منظومة حماية تجمع بين الانضباط المؤسسي والكفاءة التشغيلية
                العالية.
              </p>
            </div>

            {/* Mission */}

            <div className="p-8 sm:p-12">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#98252b]">
                  02 / MISSION
                </span>

                <Award className="h-5 w-5 text-white/20" />
              </div>

              <h3 className="mb-5 text-2xl font-black">الرسالة</h3>

              <p className="max-w-xl text-sm leading-8 text-white/40">
                نقدم حلول أمنية متكاملة ومصممة لاحتياجات كل عميل، معتمدين على
                كوادر مؤهلة، ومنهجيات تشغيل واضحة، وأنظمة مراقبة وتقنية حديثة،
                بما يضمن بيئة آمنة ومستقرة تمكن عملاءنا من التركيز على أعمالهم
                دون قلق.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            VALUES
        ====================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-32"
        >
          {/* Header */}

          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#98252b]" />

                <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
                  EDARAH / VALUES
                </span>
              </div>

              <h3 className="text-4xl font-black sm:text-5xl">
                القيم التي
                <span className="text-white/30"> تقودنا.</span>
              </h3>
            </div>

            <p className="max-w-xs text-sm leading-7 text-white/30">
              مبادئ أساسية تشكل طريقة عملنا وعلاقتنا بعملائنا وفرقنا.
            </p>
          </div>

          {/* Values grid */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div key={value.id} variants={reveal}>
                  <Card
                    className={cn(
                      `
                      group relative h-full overflow-hidden
                      rounded-none
                      border-white/[0.08]
                      bg-white/[0.02]
                      shadow-none
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:border-[#98252b]/40
                      hover:bg-white/[0.045]
                      `,
                      index === 0 && "lg:col-span-1",
                    )}
                  >
                    <CardContent className="relative flex h-full min-h-[300px] flex-col p-7">
                      {/* Number */}

                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] text-white/20">
                          {value.id}
                        </span>

                        <div
                          className="
                            flex h-10 w-10 items-center justify-center
                            border border-white/[0.08]
                            text-white/30
                            transition-all duration-500
                            group-hover:border-[#98252b]
                            group-hover:bg-[#98252b]
                            group-hover:text-white
                          "
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Content */}

                      <div className="mt-auto">
                        <h4 className="mb-4 text-lg font-extrabold">
                          {value.title}
                        </h4>

                        <p className="text-xs leading-7 text-white/35">
                          {value.desc}
                        </p>
                      </div>

                      {/* Bottom accent */}

                      <div
                        className="
                          absolute bottom-0 right-0
                          h-[2px] w-0
                          bg-[#98252b]
                          transition-all duration-500
                          group-hover:w-full
                        "
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* =====================================================
            FINAL STATEMENT
        ====================================================== */}

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 flex flex-col gap-6 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Check className="h-4 w-4 text-[#98252b]" />

            <span className="text-xs text-white/30">
              حماية تُدار باحترافية.
            </span>
          </div>

          <span className="font-mono text-[10px] tracking-[0.2em] text-white/15">
            EDARAH SECURITY SERVICES
          </span>
        </motion.div>
      </div>
    </section>
  );
}
