"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Users,
  MapPin,
  Clock,
  Briefcase,
  ArrowUpLeft,
} from "lucide-react";

export default function WhyUsStatsSection() {
  const t = useTranslations("WhyUs");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      className="
        relative
        w-full
        bg-[#f5f5f3]
        py-16
        md:py-24
        px-4
        md:px-8
        overflow-hidden
      "
    >
      <div className="max-w-[1400px] mx-auto">
        {/* =========================================================
            HEADER STATEMENT
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16 flex flex-col items-start"
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="
                flex
                items-center
                justify-center
                w-8
                h-8
                rounded-full
                bg-[#5E1E2B]
                text-white
              "
            >
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span
              className="
                text-[#5E1E2B]
                text-sm
                md:text-base
                font-bold
                tracking-wide
              "
            >
              {t("badge")}
            </span>
          </div>

          <h2
            className="
              text-3xl
              md:text-5xl
              lg:text-[3.5rem]
              font-extrabold
              text-[#1c1c1c]
              leading-[1.3]
              max-w-4xl
              tracking-tight
            "
          >
            {t("title")}
          </h2>
          <p
            className="
              mt-6
              text-base
              md:text-xl
              text-black/60
              max-w-3xl
              leading-relaxed
            "
          >
            {t("description")}
          </p>
        </motion.div>

        {/* =========================================================
            BENTO GRID: CARDS & IMAGE
        ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-4
            md:gap-6
            mb-12
            md:mb-16
          "
        >
          {/* 
            LEFT COLUMN: 
            2 White Data Cards 
          */}
          <div
            className="
              lg:col-span-7
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
              md:gap-6
            "
          >
            {/* Card 01 */}
            <motion.div
              variants={itemVariants}
              className="
                bg-white
                rounded-[28px]
                p-8
                md:p-10
                flex
                flex-col
                justify-between
                min-h-[280px]
                border
                border-black/[0.04]
                shadow-[0_8px_30px_rgba(0,0,0,0.02)]
              "
            >
              <div className="flex items-start justify-between">
                <span
                  className="
                    text-5xl
                    md:text-6xl
                    font-black
                    text-[#1c1c1c]
                    tracking-tighter
                  "
                >
                  5362+
                </span>
                <span
                  className="
                    text-xs
                    font-bold
                    text-black/30
                    tracking-widest
                  "
                >
                  01
                </span>
              </div>
              <div className="mt-8">
                <h3
                  className="
                    text-xl
                    md:text-2xl
                    font-bold
                    text-[#1c1c1c]
                    mb-3
                  "
                >
                  {t("card1_title")}
                </h3>
                <p className="text-black/50 text-sm md:text-base leading-relaxed">
                  {t("card1_desc")}
                </p>
              </div>
            </motion.div>

            {/* Card 02 */}
            <motion.div
              variants={itemVariants}
              className="
                bg-white
                rounded-[28px]
                p-8
                md:p-10
                flex
                flex-col
                justify-between
                min-h-[280px]
                border
                border-black/[0.04]
                shadow-[0_8px_30px_rgba(0,0,0,0.02)]
              "
            >
              <div className="flex items-start justify-between">
                <div className="flex items-baseline gap-1">
                  <span
                    className="
                      text-5xl
                      md:text-6xl
                      font-black
                      text-[#1c1c1c]
                      tracking-tighter
                    "
                  >
                    2500+
                  </span>
                </div>
                <span
                  className="
                    text-xs
                    font-bold
                    text-black/30
                    tracking-widest
                  "
                >
                  02
                </span>
              </div>
              <div className="mt-8">
                <h3
                  className="
                    text-xl
                    md:text-2xl
                    font-bold
                    text-[#1c1c1c]
                    mb-3
                  "
                >
                  {t("card2_title")}
                </h3>
                <p className="text-black/50 text-sm md:text-base leading-relaxed">
                  {t("card2_desc")}
                </p>
              </div>
            </motion.div>
          </div>

          {/* 
            RIGHT COLUMN: 
            Hero Image Card 
          */}
          <motion.div
            variants={itemVariants}
            className="
              lg:col-span-5
              relative
              rounded-[28px]
              overflow-hidden
              min-h-[320px]
              lg:min-h-full
              bg-black
              group
            "
          >
            <img
              src="/security-team.webp"
              alt="Edarah Security Team"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
                opacity-90
              "
            />
            {/* Cinematic Gradient */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/80
                via-black/20
                to-transparent
              "
            />

            {/* Circular Arrow Badge */}
            <div
              className="
                absolute
                top-6
                left-6
                rtl:left-auto
                rtl:right-6
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-full
                bg-[#5E1E2B]
                text-white
                shadow-lg
              "
            >
              <ArrowUpLeft className="w-5 h-5 rtl:rotate-90" />
            </div>

            {/* Bottom Content inside Image */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h4 className="text-xl md:text-2xl font-bold mb-2">
                {t("image_title")}
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("image_desc")}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* =========================================================
            BOTTOM STATS ROW
        ========================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-8
            md:gap-6
            border-t
            border-black/10
            pt-10
            md:pt-12
          "
        >
          {/* Stat 1 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span
              className="
                text-[#5E1E2B]
                text-4xl
                md:text-5xl
                font-black
                tracking-tight
              "
            >
              19+
            </span>
            <div
              className="
                flex
                items-center
                gap-2
                text-black/70
                text-sm
                md:text-base
                font-medium
              "
            >
              <Briefcase className="w-5 h-5 text-[#5E1E2B] shrink-0" />
              <span>{t("stat1_text")}</span>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span
              className="
                text-[#5E1E2B]
                text-4xl
                md:text-5xl
                font-black
                tracking-tight
              "
            >
              400+
            </span>
            <div
              className="
                flex
                items-center
                gap-2
                text-black/70
                text-sm
                md:text-base
                font-medium
              "
            >
              <Users className="w-5 h-5 text-[#5E1E2B] shrink-0" />
              <span>{t("stat2_text")}</span>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span
              className="
                text-[#5E1E2B]
                text-4xl
                md:text-5xl
                font-black
                tracking-tight
              "
            >
              5+
            </span>
            <div
              className="
                flex
                items-center
                gap-2
                text-black/70
                text-sm
                md:text-base
                font-medium
              "
            >
              <MapPin className="w-5 h-5 text-[#5E1E2B] shrink-0" />
              <span>{t("stat3_text")}</span>
            </div>
          </motion.div>

          {/* Stat 4 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <span
              className="
                text-[#5E1E2B]
                text-4xl
                md:text-5xl
                font-black
                tracking-tight
                uppercase
              "
            >
              24/7
            </span>
            <div
              className="
                flex
                items-center
                gap-2
                text-black/70
                text-sm
                md:text-base
                font-medium
              "
            >
              <Clock className="w-5 h-5 text-[#5E1E2B] shrink-0" />
              <span>{t("stat4_text")}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
