"use client";

import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  Briefcase,
  Building2,
  Camera,
  CheckCircle2,
  Eye,
  GraduationCap,
  Layers,
  Mail,
  Phone,
  Route,
  Shirt,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import JobApplicationForm from "../JobApplicationForm";

// ============================================================
// BRAND (same tokens as the rest of the site)
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";

// ============================================================
// DATA
// ============================================================

const BENEFITS: { id: string; icon: LucideIcon }[] = [
  { id: "training", icon: GraduationCap },
  { id: "support", icon: Eye },
  { id: "backing", icon: Building2 },
  { id: "standards", icon: Shirt },
  { id: "variety", icon: Layers },
  { id: "method", icon: Route },
];

const ROLES: { id: string; icon: LucideIcon }[] = [
  { id: "guard", icon: ShieldCheck },
  { id: "supervisor", icon: Eye },
  { id: "control", icon: Camera },
  { id: "events", icon: Users },
  { id: "admin", icon: Briefcase },
];

const STEPS = ["s1", "s2", "s3", "s4"] as const;

// ============================================================
// MOTION + SMALL PIECES
// ============================================================

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const viewport = { once: true, amount: 0.25 } as const;

function Pill({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-medium md:text-xs ${
        dark
          ? "border-white/25 bg-white/10 text-white backdrop-blur-md"
          : "border-[#5E1E2B]/20 bg-white text-[#481620]"
      }`}
    >
      {children}
    </span>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div
      role="separator"
      aria-label={label}
      className="mb-10 flex items-center gap-4 md:mb-12"
    >
      <span aria-hidden="true" className="h-px flex-1 bg-[#5E1E2B]/15" />
      <Pill>{label}</Pill>
      <span aria-hidden="true" className="h-px flex-1 bg-[#5E1E2B]/15" />
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function CareerPage() {
  const t = useTranslations("Career");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full bg-[#FBFBFA] text-[#141414]"
    >
      {/* =====================================================
          1. HERO BANNER
      ===================================================== */}
      <section className="px-4 pt-10 sm:px-6 md:pt-12 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="relative mx-auto max-w-[1280px] overflow-hidden rounded-2xl px-6 py-14 text-center text-white shadow-[0_20px_50px_rgba(72,22,32,0.25)] sm:px-10 md:py-20"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
            <Pill dark>{t("hero.eyebrow")}</Pill>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
              {t("hero.description")}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#481620] transition hover:bg-white/90"
              >
                {t("hero.cta")}
              </a>
              {(["chip1", "chip2"] as const).map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-xs font-medium text-white/90 backdrop-blur-md md:text-sm"
                >
                  {t(`hero.${c}`)}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          2. WHY WORK WITH US
      ===================================================== */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <SectionDivider label={t("why.badge")} />
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight">
              {t("why.title")}
            </h2>
            <p className="text-lg leading-8 text-[#363036]/80 sm:text-xl sm:leading-9">
              {t("why.description")}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {BENEFITS.map(({ id, icon: Icon }, i) => (
              <motion.article
                key={id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="group rounded-2xl border border-[#5E1E2B]/10 bg-white p-6 shadow-[0_12px_30px_-18px_rgba(72,22,32,0.25)] transition duration-300 hover:-translate-y-1 hover:border-[#5E1E2B]/25"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_20px_-8px_rgba(72,22,32,0.6)] transition-transform duration-300 group-hover:-rotate-6"
                  style={{
                    background: `linear-gradient(135deg, #7A2A3B 0%, ${BRAND} 100%)`,
                  }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">
                  {t(`why.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#363036]/75">
                  {t(`why.${id}.desc`)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. HIRING PROCESS
      ===================================================== */}
      <section className="bg-[#eeeeee] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <SectionDivider label={t("process.badge")} />
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight">
              {t("process.title")}
            </h2>
            <p className="text-lg leading-8 text-[#363036]/80 sm:text-xl sm:leading-9">
              {t("process.description")}
            </p>
          </div>

          <ol className="relative mt-12 grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
            {/* connecting line (desktop) */}
            <div
              aria-hidden="true"
              className="absolute inset-x-[12.5%] top-[2.1rem] hidden h-px border-t border-dashed border-[#5E1E2B]/30 md:block"
            />
            {STEPS.map((s, i) => (
              <motion.li
                key={s}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="relative rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(72,22,32,0.06)]"
              >
                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold text-white"
                  style={{ backgroundColor: BRAND_DARK }}
                >
                  <bdi dir="ltr">0{i + 1}</bdi>
                </span>
                <h3 className="mt-5 text-base font-semibold">
                  {t(`process.${s}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#363036]/75">
                  {t(`process.${s}.desc`)}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* =====================================================
          4. TEAMS YOU COULD JOIN
      ===================================================== */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <SectionDivider label={t("roles.badge")} />
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight">
              {t("roles.title")}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ROLES.map(({ id, icon: Icon }) => (
              <motion.div
                key={id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="rounded-2xl border border-[#5E1E2B]/10 bg-white p-5 text-center shadow-[0_8px_24px_rgba(72,22,32,0.05)] transition hover:border-[#5E1E2B]/30"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E6E8] text-[#5E1E2B]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">
                  {t(`roles.${id}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-[#363036]/70">
                  {t(`roles.${id}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-[#363036]/60">
            {t("roles.note")}
          </p>
        </div>
      </section>

      {/* =====================================================
          5. APPLICATION FORM
      ===================================================== */}
      <section
        id="apply"
        className="scroll-mt-24 px-4 pb-16 sm:px-6 md:pb-24 lg:px-8"
      >
        <div
          className="mx-auto grid max-w-[1280px] gap-10 rounded-3xl p-5 text-white shadow-[0_20px_50px_rgba(72,22,32,0.25)] sm:p-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12 lg:p-10"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          }}
        >
          {/* info */}
          <div className="flex flex-col">
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight">
              {t("form.title")}
            </h2>
            <p className="mt-3 max-w-md text-lg leading-8 text-white/80">
              {t("form.intro")}
            </p>

            <p className="mt-6 text-sm font-semibold">
              {t("form.include_title")}
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {(["i1", "i2", "i3"] as const).map((k) => (
                <li
                  key={k}
                  className="flex items-start gap-3 text-sm text-white/85"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-white/70"
                    aria-hidden="true"
                  />
                  {t(`form.${k}`)}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 lg:mt-auto">
              <a
                href="mailto:info@edarah-ss.com"
                className="inline-flex items-center gap-3 text-sm text-white/85 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span dir="ltr">info@edarah-ss.com</span>
              </a>
              <a
                href="tel:0127325555"
                className="inline-flex items-center gap-3 text-sm text-white/85 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span dir="ltr">0127325555</span>
              </a>
            </div>
          </div>

          {/* multi-step application form */}
          <JobApplicationForm />
        </div>
      </section>
    </main>
  );
}
