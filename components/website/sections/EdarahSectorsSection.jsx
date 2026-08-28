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
  LayoutGrid,
} from "lucide-react";

const sectors = [
  {
    id: "health",
    title: "القطاع الصحي",
    description:
      "تأمين المستشفيات والمنشآت الطبية بما يراعي حساسية طبيعتها، ويشمل ضبط الدخول وتأمين أقسام الطوارئ على مدار الساعة.",
    icon: Building2,
  },
  {
    id: "commercial",
    title: "القطاع التجاري",
    description:
      "تأمين المجمعات التجارية والمكاتب والمتاجر، بما يوازن بين الحماية الفعّالة وتجربة زوار سلسة لا تشعرهم بالتقييد.",
    icon: Store,
  },
  {
    id: "industrial",
    title: "القطاع الصناعي",
    description:
      "حماية المصانع والمستودعات ومواقع التشغيل، مع تركيز خاص على ضبط الدخول والخروج وتأمين الأصول والمعدات عالية القيمة.",
    icon: Factory,
  },
  {
    id: "residential",
    title: "القطاع السكني",
    description:
      "تأمين المجمعات والأبراج السكنية بما يحقق راحة بال للسكان دون التأثير على خصوصيتهم اليومية.",
    icon: Home,
  },
  {
    id: "government",
    title: "القطاع الحكومي",
    description:
      "تقديم خدمات أمنية للجهات والمنشآت الحكومية، وفق أعلى معايير الالتزام والحوكمة التي تتطلبها طبيعة هذا القطاع.",
    icon: Landmark,
  },
  {
    id: "events",
    title: "الفعاليات والمناسبات",
    description:
      "تغطية أمنية مؤقتة ومرنة للمعارض والمؤتمرات والفعاليات الكبرى، بفرق قادرة على التحرك السريع وإدارة الحشود.",
    icon: PartyPopper,
  },
  {
    id: "construction",
    title: "قطاع الإنشاءات والمشاريع",
    description:
      "تأمين مواقع الإنشاء والمشاريع تحت التنفيذ، ويشمل ضبط الدخول والخروج، وحماية المعدات والمواد من السرقة أو التلف، ومتابعة الالتزام باشتراطات السلامة داخل الموقع.",
    icon: HardHat,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EdarahSectorsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f5f3] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1400px]" dir="rtl">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start md:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5E1E2B] text-white">
              <LayoutGrid className="h-4 w-4" />
            </span>
            <span className="text-sm font-bold tracking-wide text-[#5E1E2B] md:text-base">
              القطاعات
            </span>
          </div>

          <h2 className="max-w-4xl text-3xl font-extrabold leading-[1.3] tracking-tight text-[#1c1c1c] md:text-5xl lg:text-[3.5rem]">
            قطاعات نخدمها
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-black/60 md:text-xl">
            فرق وحلول أمنية مصممة خصيصاً لطبيعة كل قطاع، من المنشآت الصحية
            الحساسة إلى مواقع الإنشاء المفتوحة.
          </p>
        </motion.div>

        {/* ================= SECTORS GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.id}
                variants={itemVariants}
                className="group flex min-h-[260px] flex-col justify-between rounded-[28px] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
              >
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5E1E2B]/10 text-[#5E1E2B] transition-colors duration-300 group-hover:bg-[#5E1E2B] group-hover:text-white">
                  <Icon strokeWidth={1.5} className="h-7 w-7" />
                </span>

                <div>
                  <h3 className="mb-2 text-lg font-extrabold text-[#1c1c1c] md:text-xl">
                    {sector.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/50">
                    {sector.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
