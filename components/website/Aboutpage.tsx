"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Download,
  Handshake,
  Lightbulb,
  Scale,
  ShieldCheck,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// BRAND (same tokens as Hero / ProposalDownload / ServicesPage)
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";
const COMPANY_PROFILE_PDF = "/الملف التعريفي انصات.pdf";

// ============================================================
// DATA  (photos go in /public/about/)
// ============================================================

const TRUST: { id: string; image: string; icon: LucideIcon }[] = [
  { id: "t1", image: "/about/trust-1.jpg", icon: Building2 },
  { id: "t2", image: "/about/trust-2.jpg", icon: UserCheck },
  { id: "t3", image: "/about/trust-3.jpg", icon: Lightbulb },
];

const VALUES: { id: string; icon: LucideIcon }[] = [
  { id: "integrity", icon: ShieldCheck },
  { id: "discipline", icon: Scale },
  { id: "professionalism", icon: Award },
  { id: "response", icon: Zap },
  { id: "partnership", icon: Handshake },
];

const CLIENTS = ["c1", "c2", "c3", "c4", "c5", "c6"] as const;

// ============================================================
// MOTION
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

// ============================================================
// PAGE
// ============================================================

export default function AboutPage() {
  const t = useTranslations("About");
  const isRtl = useLocale() === "ar";
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full bg-[#FBFBFA] text-[#141414]"
    >
      {/* =====================================================
          1. STANDARD BANNER (text + image)
      ===================================================== */}
      <section className="px-4 pt-24 sm:px-6 md:pt-28 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="relative mx-auto grid max-w-[1280px] gap-8 overflow-hidden rounded-2xl p-6 text-white shadow-[0_20px_50px_rgba(72,22,32,0.25)] sm:p-10 md:grid-cols-2 md:items-center md:gap-12"
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
          <div className="relative flex flex-col items-start gap-5">
            <Pill dark>{t("hero.eyebrow")}</Pill>
            <h1 className="text-[clamp(2rem,4.6vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
              {t("hero.title")}
            </h1>
            <p className="text-sm leading-7 text-white/75 md:text-base md:leading-8">
              {t("hero.p1")}
            </p>
            <p className="text-sm leading-7 text-white/75 md:text-base md:leading-8">
              {t("hero.p2")}
            </p>
            <div className="mt-1 flex flex-wrap gap-3">
              {(["chip1", "chip2", "chip3"] as const).map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/90 backdrop-blur-md"
                >
                  {t(`hero.${c}`)}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/15">
            <Image
              src="/about/standard.jpg"
              alt={t("hero.image_alt")}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/50 to-transparent" />
            <span className="absolute bottom-4 start-4 rounded-md bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#481620]">
              {t("hero.since")}
            </span>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          2. WHY CLIENTS TRUST US (3 image cards)
      ===================================================== */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-3xl border border-[#5E1E2B]/10 bg-white p-5 shadow-[0_16px_40px_rgba(72,22,32,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-[#5E1E2B]/10 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium text-[#5E1E2B]">
                {t("trust.eyebrow")}
              </p>
              <h2 className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-tight">
                {t("trust.title")}
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#363036]/70">
              {t("trust.description")}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {TRUST.map(({ id, image, icon: Icon }) => (
              <motion.article
                key={id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="overflow-hidden rounded-xl border border-[#5E1E2B]/10 bg-[#FBFBFA]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image}
                    alt={t(`trust.${id}.title`)}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    className="absolute bottom-3 start-3 flex h-9 w-9 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: BRAND }}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold leading-snug">
                    {t(`trust.${id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#363036]/75">
                    {t(`trust.${id}.desc`)}
                  </p>
                  <div className="my-4 h-px w-8 bg-[#5E1E2B]" />
                  <ul className="flex flex-col gap-2.5">
                    {(["b1", "b2", "b3"] as const).map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-3 text-sm text-[#363036]"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#5E1E2B]"
                          aria-hidden="true"
                        />
                        {t(`trust.${id}.${b}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. ABOUT: VISION & MISSION
      ===================================================== */}
      <section className="px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-3xl border border-[#5E1E2B]/10 bg-white shadow-[0_16px_40px_rgba(72,22,32,0.08)]">
          <div className="border-b border-[#5E1E2B]/10 p-6 sm:p-10">
            <div className="flex items-center gap-3 text-xs font-medium text-[#5E1E2B]">
              <span className="h-px w-6 bg-[#5E1E2B]" />
              {t("about.eyebrow")}
            </div>
            <h2 className="mt-3 max-w-3xl text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-tight">
              {t("about.title")}
            </h2>
          </div>

          <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[minmax(0,320px)_1fr]">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e5e5e5]">
                <Image
                  src="/about/team.jpg"
                  alt={t("about.caption")}
                  fill
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-3 text-xs text-[#363036]/70">
                <span className="h-px w-6 bg-[#5E1E2B]" />
                {t("about.caption")}
              </figcaption>
            </figure>

            <div className="flex flex-col gap-6">
              <p className="max-w-2xl text-sm leading-7 text-[#363036]/80 md:text-base md:leading-8">
                {t("about.description")}
              </p>
              <div className="flex items-start gap-3 rounded-lg border border-[#5E1E2B]/10 bg-[#FBFBFA] p-4">
                <Building2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#5E1E2B]"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-[#363036]/80">
                  {t("about.group")}
                </p>
              </div>
              <div className="grid border-t border-[#5E1E2B]/10 md:grid-cols-2">
                {(["vision", "mission"] as const).map((k, i) => (
                  <div
                    key={k}
                    className={`py-5 md:py-6 ${
                      i === 0
                        ? "md:pe-6"
                        : "border-t border-[#5E1E2B]/10 md:border-s md:border-t-0 md:ps-6"
                    }`}
                  >
                    <p className="text-[11px] font-semibold text-[#5E1E2B]">
                      {t(`about.${k}_label`)}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#363036]/80">
                      {t(`about.${k}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. CORE VALUES
      ===================================================== */}
      <section className="px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-[1280px] rounded-3xl bg-[#F3E6E8]/60 p-6 sm:p-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
            <Pill>{t("values.badge")}</Pill>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold">
              {t("values.title")}
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map(({ id, icon: Icon }) => (
              <motion.div
                key={id}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="rounded-xl border border-[#5E1E2B]/10 bg-white p-5 shadow-[0_8px_24px_rgba(72,22,32,0.06)]"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md"
                  style={{ backgroundColor: BRAND }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">
                  {t(`values.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#363036]/75">
                  {t(`values.${id}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          5. CLIENTS WE PROTECT
      ===================================================== */}
      <section className="bg-[#eeeeee] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <Pill>{t("clients.badge")}</Pill>
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-tight">
              {t("clients.title")}
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[#363036]/75 md:text-base">
              {t("clients.description")}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENTS.map((c) => (
              <motion.div
                key={c}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(72,22,32,0.06)]"
              >
                <p className="text-[11px] font-semibold text-[#5E1E2B]">
                  {t(`clients.${c}.sector`)}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {t(`clients.${c}.name`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#363036]/75">
                  {t(`clients.${c}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          6. CTA
      ===================================================== */}
      <section id="contact" className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 rounded-2xl px-6 py-14 text-center text-white sm:px-10"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          }}
        >
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
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-md transition hover:bg-white/20"
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
