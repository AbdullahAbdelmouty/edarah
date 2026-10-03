"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Globe,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// BRAND (same tokens as the rest of the site)
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";
const COMPANY_PROFILE_PDF = "/الملف التعريفي انصات.pdf";
const MAX_MESSAGE = 1000;

// ============================================================
// DATA
// ============================================================

const SERVICE_OPTIONS = [
  "guarding",
  "surveillance",
  "events",
  "personal",
  "risk",
  "training",
  "other",
] as const;

const INFO_CARDS: {
  id: string;
  icon: LucideIcon;
  value: string;
  href?: string;
  ltr?: boolean;
}[] = [
  {
    id: "phone",
    icon: Phone,
    value: "0127325555",
    href: "tel:0127325555",
    ltr: true,
  },
  {
    id: "email",
    icon: Mail,
    value: "info@edarah-ss.com",
    href: "mailto:info@edarah-ss.com",
    ltr: true,
  },
  { id: "office", icon: MapPin, value: "" },
  { id: "hours", icon: Clock, value: "" },
];

// ============================================================
// MOTION
// ============================================================

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-[#5E1E2B]/15 bg-[#F4F4F3] px-3.5 py-2.5 text-sm text-[#141414] placeholder:text-[#363036]/40 transition focus:border-[#5E1E2B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5E1E2B]/20";

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

// ============================================================
// PAGE
// ============================================================

export default function ContactPage() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "", // honeypot: real users never see or fill this
  });

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        company: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="w-full bg-[#FBFBFA] text-[#141414]"
    >
      {/* =====================================================
          1. BANNER
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
            <div className="mt-2 flex flex-wrap justify-center gap-3">
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
          2. FORM + CONTACT INFO
      ===================================================== */}
      <section
        id="contact"
        className="scroll-mt-24 px-4 py-12 sm:px-6 md:py-16 lg:px-8"
      >
        <div
          className="mx-auto grid max-w-[1280px] gap-10 rounded-3xl p-5 text-white shadow-[0_20px_50px_rgba(72,22,32,0.25)] sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          }}
        >
          {/* ---------------- FORM ---------------- */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Pill dark>{t("form.badge")}</Pill>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-white">
              {t("form.title")}
            </h2>

            <div className="mt-6 rounded-2xl bg-white p-5 text-[#141414] sm:p-6">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center"
                  >
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: BRAND }}
                    >
                      <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="text-2xl font-bold leading-tight">
                      {t("form.success_title")}
                    </h3>
                    <p className="max-w-sm text-base leading-7 text-[#363036]/75">
                      {t("form.success_desc")}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-2 rounded-lg border border-[#5E1E2B]/20 px-5 py-2.5 text-sm font-medium text-[#481620] transition hover:bg-[#5E1E2B]/5"
                    >
                      {t("form.send_another")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-medium"
                      >
                        {t("form.name")} *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder={t("form.name_ph")}
                        className={fieldClass}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-xs font-medium"
                        >
                          {t("form.email")} *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          dir="ltr"
                          autoComplete="email"
                          value={form.email}
                          onChange={onChange}
                          placeholder="name@company.com"
                          className={`${fieldClass} text-start`}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-1.5 block text-xs font-medium"
                        >
                          {t("form.phone")} *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          dir="ltr"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={onChange}
                          placeholder="05X XXX XXXX"
                          className={`${fieldClass} text-start`}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="mb-1.5 block text-xs font-medium"
                      >
                        {t("form.service")} *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={form.service}
                        onChange={onChange}
                        className={fieldClass}
                      >
                        <option value="" disabled>
                          {t("form.service_ph")}
                        </option>
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {t(`form.services.${s}`)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-xs font-medium"
                      >
                        {t("form.message")} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        maxLength={MAX_MESSAGE}
                        value={form.message}
                        onChange={onChange}
                        placeholder={t("form.message_ph")}
                        className={`${fieldClass} resize-y`}
                      />
                      <p
                        className="mt-1 text-end text-[11px] text-[#363036]/50"
                        dir="ltr"
                      >
                        {form.message.length}/{MAX_MESSAGE}
                      </p>
                    </div>

                    {/* Honeypot */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                    >
                      <label htmlFor="company">Company</label>
                      <input
                        id="company"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={onChange}
                      />
                    </div>

                    {status === "error" && (
                      <p
                        role="alert"
                        className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
                      >
                        <AlertCircle
                          className="mt-0.5 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        {t("form.error")}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center justify-center gap-2.5 rounded-lg px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-90 disabled:opacity-60"
                      style={{ backgroundColor: BRAND }}
                    >
                      <Send
                        className={`h-4 w-4 ${isRtl ? "-scale-x-100" : ""}`}
                        aria-hidden="true"
                      />
                      {status === "sending"
                        ? t("form.sending")
                        : t("form.submit")}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ---------------- INFO ---------------- */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-white">
              {t("info.title")}
            </h2>
            <p className="mt-3 max-w-md text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
              {t("info.description")}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {INFO_CARDS.map(({ id, icon: Icon, value, href, ltr }) => (
                <div
                  key={id}
                  className="rounded-xl bg-white p-5 text-[#141414]"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${BRAND}14`, color: BRAND }}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-[#141414]">
                    {t(`info.${id}.label`)}
                  </h3>
                  {value &&
                    (href ? (
                      <a
                        href={href}
                        dir={ltr ? "ltr" : undefined}
                        className="mt-1 inline-block break-all text-sm font-medium text-[#363036] underline-offset-4 hover:underline sm:text-base"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-[#363036] sm:text-base">
                        {value}
                      </p>
                    ))}
                  {!value && (
                    <p className="mt-1 text-sm font-medium text-[#363036] sm:text-base">
                      {t(`info.${id}.value`)}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs leading-5 text-[#363036]/70 sm:text-sm">
                    {t(`info.${id}.note`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://edarah-ss.com"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-medium backdrop-blur-md transition hover:bg-white/20 sm:text-sm"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">edarah-ss.com</span>
              </a>
              <a
                href={COMPANY_PROFILE_PDF}
                download="Edarah-Company-Profile.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-medium backdrop-blur-md transition hover:bg-white/20 sm:text-sm"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("info.profile")}
              </a>
            </div>

            <p className="mt-auto pt-8 text-xs text-white/70 sm:text-sm">
              {t("info.group")}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
