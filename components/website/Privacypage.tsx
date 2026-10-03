"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";

const BRAND = "#5E1E2B";

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <main className="min-h-screen bg-[#f5f5f3] pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm sm:p-12 border border-zinc-200"
        >
          <div className="flex flex-col gap-3 pb-8 border-b border-zinc-200">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#141414]">
              {t("title")}
            </h1>
            <p className="text-[#363036]/70">
              {t("last_updated")}
            </p>
          </div>

          <div className="prose prose-zinc max-w-none prose-headings:text-[#141414] prose-headings:font-bold prose-p:text-[#363036]/80 prose-a:text-[#5E1E2B] prose-li:text-[#363036]/80">
            <h2 className="text-xl mt-6">{t("s1_title")}</h2>
            <p>{t("s1_desc")}</p>

            <h2 className="text-xl mt-6">{t("s2_title")}</h2>
            <p>{t("s2_desc")}</p>
            <ul className="list-disc pl-5 rtl:pr-5 rtl:pl-0 space-y-2 mt-2">
              <li>{t("s2_l1")}</li>
              <li>{t("s2_l2")}</li>
              <li>{t("s2_l3")}</li>
            </ul>

            <h2 className="text-xl mt-6">{t("s3_title")}</h2>
            <p>{t("s3_desc")}</p>

            <h2 className="text-xl mt-6">{t("s4_title")}</h2>
            <p>{t("s4_desc")}</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
