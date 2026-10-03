"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  Phone,
  Route,
  Search,
  Send,
  Shirt,
  ShieldCheck,
  Upload,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// BRAND (same tokens as the rest of the site)
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";
const MAX_CV_MB = 5;
const CV_TYPES = [".pdf", ".doc", ".docx"];

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
const CITIES = [
  "riyadh",
  "jeddah",
  "makkah",
  "madinah",
  "taif",
  "dammam",
  "khobar",
  "dhahran",
  "jubail",
  "qassim",
  "tabuk",
  "abha",
  "khamis_mushait",
  "jazan",
  "najran",
  "hail",
  "yanbu",
  "other",
] as const;

const POSITIONS = [
  "guard",
  "supervisor",
  "control",
  "events",
  "admin",
  "other",
] as const;

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

const fieldClass =
  "w-full rounded-lg border border-[#5E1E2B]/15 bg-[#F4F4F3] px-3.5 py-2.5 text-sm text-[#141414] placeholder:text-[#363036]/40 transition focus:border-[#5E1E2B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5E1E2B]/20";

interface SearchableSelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  required?: boolean;
}

function SearchableSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder = "Search...",
  noResultsText = "No results found",
  required = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open]);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        tabIndex={-1}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0 w-full opacity-0"
      />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex w-full items-center justify-between rounded-lg border bg-[#F4F4F3] px-3.5 py-2.5 text-sm transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5E1E2B]/20 ${
          open
            ? "border-[#5E1E2B] bg-white ring-2 ring-[#5E1E2B]/20"
            : "border-[#5E1E2B]/15 hover:border-[#5E1E2B]/40"
        } ${selectedOption ? "text-[#141414] font-medium" : "text-[#363036]/50"}`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#363036]/60 transition-transform duration-200 ${
            open ? "rotate-180 text-[#5E1E2B]" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute start-0 top-full z-50 mt-1.5 w-full rounded-xl border border-[#5E1E2B]/15 bg-white p-2 shadow-[0_12px_32px_rgba(72,22,32,0.15)] ring-1 ring-black/5"
          >
            <div className="relative mb-1.5 flex items-center">
              <Search
                className="pointer-events-none absolute start-3 h-4 w-4 text-[#363036]/50"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-lg border border-[#5E1E2B]/15 bg-[#FBFBFA] py-2 ps-9 pe-8 text-xs text-[#141414] placeholder:text-[#363036]/40 transition focus:border-[#5E1E2B] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5E1E2B]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute end-2 flex h-5 w-5 items-center justify-center rounded text-[#363036]/50 hover:bg-[#5E1E2B]/10 hover:text-[#5E1E2B]"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>

            <ul
              role="listbox"
              className="max-h-52 overflow-y-auto overscroll-contain py-1 text-sm scrollbar-thin"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-4 text-center text-xs text-[#363036]/60">
                  {noResultsText}
                </li>
              ) : (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-xs transition sm:text-sm ${
                        isSelected
                          ? "bg-[#5E1E2B]/10 font-semibold text-[#5E1E2B]"
                          : "text-[#141414] hover:bg-[#F3E6E8]/60 hover:text-[#481620]"
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <Check
                          className="h-4 w-4 shrink-0 text-[#5E1E2B]"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Status = "idle" | "sending" | "success" | "error";

// ============================================================
// PAGE
// ============================================================

export default function CareerPage() {
  const t = useTranslations("Career");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [status, setStatus] = useState<Status>("idle");
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    position: "",
    about: "",
    company: "", // honeypot
  });

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCvError("");
    if (!file) return setCv(null);
    const okType = CV_TYPES.some((x) => file.name.toLowerCase().endsWith(x));
    if (!okType) {
      setCv(null);
      setCvError(t("form.cv_type_error"));
      e.target.value = "";
      return;
    }
    if (file.size > MAX_CV_MB * 1024 * 1024) {
      setCv(null);
      setCvError(t("form.cv_size_error", { mb: MAX_CV_MB }));
      e.target.value = "";
      return;
    }
    setCv(file);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      body.append("locale", locale);
      if (cv) body.append("cv", cv);
      const res = await fetch("/api/career", { method: "POST", body });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        city: "",
        position: "",
        about: "",
        company: "",
      });
      setCv(null);
      if (fileRef.current) fileRef.current.value = "";
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
          2. WHY WORK WITH US
      ===================================================== */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <SectionDivider label={t("why.badge")} />
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight">
              {t("why.title")}
            </h2>
            <p className="max-w-xl text-lg leading-8 text-[#363036]/80 sm:text-xl sm:leading-9">
              {t("why.description")}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {BENEFITS.map(({ id, icon: Icon }) => (
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
                <h3 className="mt-5 text-base font-bold text-[#141414]">
                  {t(`why.${id}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#363036]/80 sm:text-base sm:leading-7">
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
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight">
              {t("process.title")}
            </h2>
            <p className="max-w-xl text-lg leading-8 text-[#363036]/80 sm:text-xl sm:leading-9">
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
                <h3 className="mt-5 text-base font-bold text-[#141414]">
                  {t(`process.${s}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#363036]/80 sm:text-base sm:leading-7">
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
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
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
                <h3 className="mt-4 text-base font-bold text-[#141414]">
                  {t(`roles.${id}.title`)}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-[#363036]/80 sm:text-sm">
                  {t(`roles.${id}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-[#363036]/75 sm:text-base">
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
          className="mx-auto grid max-w-[1280px] gap-10 rounded-3xl p-5 text-white shadow-[0_20px_50px_rgba(72,22,32,0.25)] sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12 lg:p-10"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          }}
        >
          {/* info */}
          <div className="flex flex-col">
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-white">
              {t("form.title")}
            </h2>
            <p className="mt-3 max-w-md text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">
              {t("form.intro")}
            </p>

            <p className="mt-6 text-base font-bold text-white">
              {t("form.include_title")}
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {(["i1", "i2", "i3"] as const).map((k) => (
                <li
                  key={k}
                  className="flex items-start gap-3 text-sm font-medium text-white/90 sm:text-base"
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
                className="inline-flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white sm:text-base"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span dir="ltr">info@edarah-ss.com</span>
              </a>
              <a
                href="tel:0127325555"
                className="inline-flex items-center gap-3 text-sm font-medium text-white/90 hover:text-white sm:text-base"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <span dir="ltr">0127325555</span>
              </a>
            </div>
          </div>

          {/* form */}
          <div className="rounded-2xl bg-white p-5 text-[#141414] sm:p-6">
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
                        placeholder="name@email.com"
                        className={`${fieldClass} text-start`}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1.5 block text-xs font-medium"
                      >
                        {t("form.city")} *
                      </label>
                      <SearchableSelect
                        id="city"
                        name="city"
                        required
                        value={form.city}
                        onChange={(val) =>
                          setForm((f) => ({ ...f, city: val }))
                        }
                        options={CITIES.map((c) => ({
                          value: c,
                          label: t(`form.cities.${c}`),
                        }))}
                        placeholder={t("form.city_ph")}
                        searchPlaceholder={t("form.search_ph")}
                        noResultsText={t("form.no_results")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="position"
                        className="mb-1.5 block text-xs font-medium"
                      >
                        {t("form.position")} *
                      </label>
                      <select
                        id="position"
                        name="position"
                        required
                        value={form.position}
                        onChange={onChange}
                        className={fieldClass}
                      >
                        <option value="" disabled>
                          {t("form.position_ph")}
                        </option>
                        {POSITIONS.map((p) => (
                          <option key={p} value={p}>
                            {t(`form.positions.${p}`)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="about"
                      className="mb-1.5 block text-xs font-medium"
                    >
                      {t("form.about")}
                    </label>
                    <textarea
                      id="about"
                      name="about"
                      rows={4}
                      maxLength={1000}
                      value={form.about}
                      onChange={onChange}
                      placeholder={t("form.about_ph")}
                      className={`${fieldClass} resize-y`}
                    />
                  </div>

                  {/* CV upload */}
                  <div>
                    <span className="mb-1.5 block text-xs font-medium">
                      {t("form.cv")}
                    </span>
                    <label
                      htmlFor="cv"
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#5E1E2B]/30 bg-[#FBFBFA] px-4 py-3.5 transition hover:border-[#5E1E2B]/60 hover:bg-[#F3E6E8]/40"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3E6E8] text-[#5E1E2B]">
                        {cv ? (
                          <FileText className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Upload className="h-4 w-4" aria-hidden="true" />
                        )}
                      </span>
                      <span className="min-w-0 text-sm">
                        <span className="block truncate font-medium text-[#141414]">
                          {cv ? cv.name : t("form.cv_choose")}
                        </span>
                        <span className="block text-xs text-[#363036]/60">
                          {t("form.cv_hint", { mb: MAX_CV_MB })}
                        </span>
                      </span>
                    </label>
                    <input
                      ref={fileRef}
                      id="cv"
                      name="cv_file"
                      type="file"
                      accept={CV_TYPES.join(",")}
                      onChange={onFile}
                      className="sr-only"
                    />
                    {cvError && (
                      <p role="alert" className="mt-1.5 text-xs text-red-700">
                        {cvError}
                      </p>
                    )}
                  </div>

                  {/* honeypot */}
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
        </div>
      </section>
    </main>
  );
}
