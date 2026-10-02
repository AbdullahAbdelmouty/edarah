"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import ExperienceCard from "../ExperienceCard";
import PhotoGallery from "../Photogallery";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Download,
  Factory,
  GraduationCap,
  HardHat,
  Home,
  Landmark,
  MessageCircle,
  PartyPopper,
  ShieldCheck,
  ShieldAlert,
  Shirt,
  Stethoscope,
  Store,
  UserCheck,
  Users,
  ClipboardCheck,
  Eye,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// BRAND (same tokens as Hero / ProposalDownload)
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";
const COMPANY_PROFILE_PDF = "/الملف التعريفي انصات.pdf";

// ============================================================
// DATA
// ============================================================

// Put the matching photos in /public/services/ (extract them from the PDF
// or use your own). Names below are what the component expects.
const PROGRAMS = [
  { id: "guarding", image: "/services/guarding.jpg" },
  { id: "surveillance", image: "/services/surveillance.jpg" },
  { id: "events", image: "/services/events.jpg" },
  { id: "personal", image: "/services/personal-protection.jpg" },
  { id: "risk", image: "/services/risk-assessment.jpg" },
  { id: "training", image: "/services/training.jpg" },
] as const;

const HERO_PHOTOS = [
  "/services/hero-1.jpg",
  "/services/hero-2.jpg",
  "/services/hero-3.jpg",
] as const;

const QUALITY: { id: string; icon: LucideIcon }[] = [
  { id: "screening", icon: UserCheck },
  { id: "training", icon: GraduationCap },
  { id: "supervision", icon: Eye },
  { id: "discipline", icon: Shirt },
];

const SECTORS: { id: string; icon: LucideIcon }[] = [
  { id: "healthcare", icon: Stethoscope },
  { id: "commercial", icon: Store },
  { id: "industrial", icon: Factory },
  { id: "residential", icon: Home },
  { id: "government", icon: Landmark },
  { id: "events", icon: PartyPopper },
  { id: "construction", icon: HardHat },
];

const PROGRAM_ICONS: Record<string, LucideIcon> = {
  guarding: ShieldCheck,
  surveillance: Camera,
  events: Users,
  personal: UserCheck,
  risk: ShieldAlert,
  training: GraduationCap,
};

const STEPS = ["s1", "s2", "s3", "s4", "s5"] as const;

// ============================================================
// MOTION
// ============================================================

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const viewport = { once: true, amount: 0.25 } as const;

// ============================================================
// SMALL PIECES
// ============================================================

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

// Section divider: hairline - Pill - hairline (works in LTR and RTL)
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

export default function ServicesPage() {
  const t = useTranslations("Services");
  const isRtl = useLocale() === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

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
            <h1 className="text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/75 md:text-base md:leading-8">
              {t("hero.description")}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              {(["chip1", "chip2", "chip3"] as const).map((c) => (
                <span
                  key={c}
                  className="rounded-lg border border-white/20 bg-white/10 px-5 py-2 text-xs font-medium text-white/90 backdrop-blur-md md:text-sm"
                >
                  {t(`hero.${c}`)}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          2. PHOTO TRIO
      ===================================================== */}
      <PhotoGallery
        photos={HERO_PHOTOS.map((src, i) => ({
          src,
          alt: t(`hero.photo${i + 1}_alt`),
        }))}
      />

      {/* =====================================================
          3. SERVICE PROGRAMS
      ===================================================== */}
      <section id="programs" className="px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <SectionDivider label={t("programs.badge")} />
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          >
            <p className="mt-2 text-xs font-medium text-[#5E1E2B]">
              {t("programs.eyebrow")}
            </p>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-tight text-[#141414]">
              {t("programs.title")}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#363036]/75 md:text-base">
              {t("programs.description")}
            </p>
          </motion.div>

          <div className="mt-12 flex flex-col gap-6">
            {PROGRAMS.map((p, index) => {
              const Icon = PROGRAM_ICONS[p.id];
              const reversed = index % 2 === 1;
              return (
                <motion.article
                  key={p.id}
                  id={p.id}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className={`flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-[#5E1E2B]/10 bg-white shadow-[0_16px_40px_rgba(72,22,32,0.08)] md:min-h-[360px] md:flex-row ${
                    reversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* IMAGE */}
                  <div className="relative min-h-[260px] w-full md:w-1/2">
                    <Image
                      src={p.image}
                      alt={t(`programs.${p.id}.title`)}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/70 via-transparent to-transparent" />
                    <span className="absolute start-4 top-4 rounded-md bg-[#141414]/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      {t(`programs.${p.id}.tag`)}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/20 bg-black/35 p-3 text-white backdrop-blur-md">
                      <p className="text-[11px] font-semibold text-white/80">
                        {t("programs.recommended")}
                      </p>
                      <p className="mt-1 text-xs leading-5 sm:text-sm">
                        {t(`programs.${p.id}.rec`)}
                      </p>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex w-full flex-col justify-center gap-4 p-6 sm:p-8 md:w-1/2">
                    <div className="flex items-center gap-2.5 text-xs font-medium text-[#5E1E2B]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5E1E2B]/10">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {t(`programs.${p.id}.tag`)}
                    </div>
                    <h3 className="text-2xl font-semibold leading-tight text-[#141414] sm:text-3xl">
                      {t(`programs.${p.id}.title`)}
                    </h3>
                    <p className="text-sm leading-7 text-[#363036]/75 sm:text-base">
                      {t(`programs.${p.id}.desc`)}
                    </p>

                    <ul className="flex flex-col gap-2">
                      {(["b1", "b2", "b3"] as const).map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-3 rounded-lg border border-[#5E1E2B]/10 bg-[#FBFBFA] px-3.5 py-2.5 text-sm text-[#363036]"
                        >
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 text-[#5E1E2B]"
                            aria-hidden="true"
                          />
                          {t(`programs.${p.id}.${b}`)}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:brightness-90"
                        style={{ backgroundColor: BRAND }}
                      >
                        {t("programs.cta")}
                        <Arrow className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <span className="text-xs text-[#363036]/60">
                        {t("programs.note")}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          4. PEOPLE & QUALITY (replaces "Green Cleaning")
      ===================================================== */}
      <section
        className="mt-10 px-4 py-16 sm:px-6 md:py-24 lg:px-8"
        style={{
          background: "linear-gradient(180deg, #F3E6E8 0%, #FBFBFA 100%)",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex flex-col items-start gap-5"
            >
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.1] text-[#141414]">
                {t("quality.title")}
              </h2>
              <p className="text-lg font-medium text-[#5E1E2B]">
                {t("quality.subtitle")}
              </p>
              <p className="max-w-xl text-sm leading-7 text-[#363036]/75 md:text-base md:leading-8">
                {t("quality.description")}
              </p>
              <a
                href={COMPANY_PROFILE_PDF}
                download="Edarah-Company-Profile.pdf"
                className="inline-flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:brightness-90"
                style={{ backgroundColor: BRAND }}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("quality.cta")}
              </a>
            </motion.div>

            {/* EXPERIENCE CARD */}
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="flex justify-center"
            >
              <ExperienceCard
                value={19}
                label={t("quality.medal_label")}
                sub={t("quality.medal_sub")}
                badge={t("quality.ribbon")}
              />
            </motion.div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY.map(({ id, icon: Icon }) => (
              <motion.div
                key={id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="rounded-xl border border-[#5E1E2B]/10 bg-white p-5 shadow-[0_8px_24px_rgba(72,22,32,0.06)]"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-[#141414]">
                  {t(`quality.${id}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-[#363036]/70">
                  {t(`quality.${id}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          5. SECTORS
      ===================================================== */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <SectionDivider label={t("sectors.badge")} />
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          >
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-tight">
              {t("sectors.title")}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#363036]/75 md:text-base">
              {t("sectors.description")}
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map(({ id, icon: Icon }) => (
              <motion.div
                key={id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="flex items-start gap-4 rounded-xl border border-[#5E1E2B]/10 bg-white p-5 shadow-[0_8px_24px_rgba(72,22,32,0.05)] transition hover:border-[#5E1E2B]/30"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#141414]">
                    {t(`sectors.${id}.title`)}
                  </h3>
                  <p className="mt-1.5 text-xs leading-6 text-[#363036]/70">
                    {t(`sectors.${id}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ASK US BANNER */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative mt-12 overflow-hidden rounded-2xl p-6 text-white shadow-[0_20px_50px_-15px_rgba(72,22,32,0.5)] ring-1 ring-white/10 sm:p-8"
            style={{
              background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -end-16 h-56 w-56 rounded-full bg-white/15 blur-3xl"
            />

            <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-lg font-semibold leading-snug sm:text-xl">
                  {t("sectors.ask_text")}
                </p>
              </div>

              <a
                href="#contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#481620] shadow-lg transition hover:bg-white/90 sm:w-auto"
              >
                {t("sectors.ask_button")}
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                  style={{ backgroundColor: BRAND }}
                >
                  <Arrow className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          6. PROCESS
      ===================================================== */}
      <section className="bg-[#eeeeee] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          >
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-tight">
              {t("process.title")}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#363036]/75 md:text-base">
              {t("process.description")}
            </p>
          </motion.div>

          <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.li
                key={s}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(72,22,32,0.06)]"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold text-white"
                  style={{ backgroundColor: BRAND_DARK }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-[#141414]">
                  {t(`process.${s}.title`)}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#363036]/70">
                  {t(`process.${s}.desc`)}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* =====================================================
          7. CTA
      ===================================================== */}
      <section id="contact" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mx-auto flex max-w-[1280px] flex-col items-center gap-5 overflow-hidden rounded-2xl px-6 py-14 text-center text-white sm:px-10"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          }}
        >
          <ClipboardCheck
            className="h-8 w-8 text-white/80"
            aria-hidden="true"
          />
          <h2 className="max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight">
            {t("cta.title")}
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/75 md:text-base">
            {t("cta.description")}
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0127325555"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#481620] transition hover:bg-white/90"
            >
              {t("cta.button")}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={COMPANY_PROFILE_PDF}
              download="Edarah-Company-Profile.pdf"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("cta.profile")}
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
