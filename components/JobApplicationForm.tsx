"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Plus,
  Send,
  Trash2,
  Upload,
} from "lucide-react";

// ============================================================
// BRAND
// ============================================================

const BRAND = "#5E1E2B";
const BRAND_DARK = "#481620";

const MAX_MB = 5;
const MAX_FILES = 5;
const FILE_EXT = [".pdf", ".jpg", ".jpeg", ".png"];

// ============================================================
// FORM SCHEMA  (edit here to add / remove / reorder fields)
// Labels:   Apply.fields.<id>.label
// Options:  Apply.options.<id>.<option>
// Steps:    Apply.steps.<stepId>      Groups: Apply.groups.<group>
// ============================================================

type Values = Record<string, string | string[]>;

type Base = {
  id: string;
  required?: boolean;
  group?: string;
  showIf?: (v: Values) => boolean;
};

type Field = Base &
  (
    | {
        type: "text" | "tel" | "email" | "date" | "number";
        ltr?: boolean;
        min?: number;
        max?: number;
      }
    | { type: "select" | "multi"; options: string[] }
    | { type: "yesno" | "textarea" | "list" }
    | { type: "file"; multiple?: boolean }
  );

const isYes = (id: string) => (v: Values) => v[id] === "yes";

const STEPS: { id: string; fields: Field[] }[] = [
  {
    id: "personal",
    fields: [
      { id: "fullName", type: "text", required: true },
      { id: "birthDate", type: "date", required: true },
      { id: "nationality", type: "text", required: true },
      {
        id: "gender",
        type: "select",
        options: ["male", "female"],
        required: true,
      },
      {
        id: "marital",
        type: "select",
        options: ["single", "married"],
        required: true,
      },
      { id: "phone", type: "tel", ltr: true, required: true },
      { id: "email", type: "email", ltr: true },
      { id: "city", type: "text", required: true },
    ],
  },
  {
    id: "education",
    fields: [
      {
        id: "education",
        type: "select",
        options: [
          "primary",
          "intermediate",
          "secondary",
          "diploma",
          "bachelor",
          "postgrad",
        ],
        required: true,
      },
      { id: "major", type: "text" },
      { id: "height", type: "number", min: 100, max: 250, required: true },
      { id: "weight", type: "number", min: 30, max: 250, required: true },
    ],
  },
  {
    id: "legal",
    fields: [
      { id: "nationalId", type: "text", ltr: true, required: true },
      { id: "iban", type: "text", ltr: true },
      { id: "idCopy", type: "file", required: true },
    ],
  },
  {
    id: "requirements",
    fields: [
      {
        id: "position",
        type: "select",
        options: ["guard", "supervisor", "control", "events", "admin", "other"],
        required: true,
      },
      {
        id: "shift",
        type: "select",
        options: ["morning", "evening", "midnight"],
        required: true,
      },
      { id: "preferredCity", type: "text" },
    ],
  },
  {
    id: "experience",
    fields: [
      {
        id: "years",
        type: "select",
        options: ["none", "lt1", "1to3", "3to5", "gt5"],
        required: true,
      },
      {
        id: "companies",
        type: "list",
        showIf: (v) => !!v.years && v.years !== "none",
      },
    ],
  },
  {
    id: "courses",
    fields: [
      { id: "hasCourses", type: "yesno", required: true },
      {
        id: "coursesText",
        type: "textarea",
        required: true,
        showIf: isYes("hasCourses"),
      },
      {
        id: "coursesFiles",
        type: "file",
        multiple: true,
        showIf: isYes("hasCourses"),
      },
    ],
  },
  {
    id: "extra",
    fields: [
      { id: "sensitiveSites", type: "yesno", required: true, group: "sites" },
      {
        id: "sensitiveSiteType",
        type: "text",
        required: true,
        group: "sites",
        showIf: isYes("sensitiveSites"),
      },
      {
        id: "siteTypes",
        type: "multi",
        group: "siteTypes",
        options: [
          "hospitals",
          "malls",
          "factories",
          "residential",
          "government",
          "construction",
        ],
      },
      { id: "cctv", type: "yesno", required: true, group: "skills" },
      { id: "reports", type: "yesno", required: true, group: "skills" },
      { id: "access", type: "yesno", required: true, group: "skills" },
      { id: "firstAid", type: "yesno", required: true, group: "skills" },
      { id: "standing", type: "yesno", required: true, group: "ability" },
      { id: "healthIssue", type: "yesno", required: true, group: "ability" },
    ],
  },
  { id: "attachments", fields: [{ id: "cv", type: "file" }] },
  {
    id: "readiness",
    fields: [
      {
        id: "readiness",
        type: "select",
        options: ["now", "week", "two_weeks", "month"],
        required: true,
      },
    ],
  },
];

const FULL_WIDTH = new Set(["yesno", "textarea", "list", "multi", "file"]);

const initialValues = (): Values => {
  const v: Values = { company: "" }; // "company" = honeypot
  STEPS.forEach((s) =>
    s.fields.forEach((f) => {
      v[f.id] = f.type === "multi" ? [] : f.type === "list" ? [""] : "";
    }),
  );
  return v;
};

const fieldClass =
  "w-full rounded-lg border bg-[#F4F4F3] px-3.5 py-3 text-base text-[#141414] placeholder:text-[#363036]/40 transition focus:border-[#5E1E2B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5E1E2B]/20";

type Status = "idle" | "sending" | "success" | "error";

// ============================================================
// COMPONENT
// ============================================================

export default function JobApplicationForm() {
  const t = useTranslations("Apply");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;
  const PrevIcon = isRtl ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(initialValues);
  const [files, setFiles] = useState<Record<string, File[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const topRef = useRef<HTMLDivElement | null>(null);

  const total = STEPS.length;
  const last = step === total - 1;
  const percent = status === "success" ? 100 : Math.round((step / total) * 100);

  const visible = (f: Field) => !f.showIf || f.showIf(values);

  const clearError = (id: string) =>
    setErrors((p) => {
      if (!(id in p)) return p;
      const { [id]: _removed, ...rest } = p;
      return rest;
    });

  const set = (id: string, v: string | string[]) => {
    setValues((p) => ({ ...p, [id]: v }));
    clearError(id);
  };

  // ---------------- validation ----------------
  const validate = (idx: number) => {
    const e: Record<string, string> = {};
    for (const f of STEPS[idx].fields) {
      if (!visible(f)) continue;
      if (f.type === "file") {
        if (f.required && !files[f.id]?.length) e[f.id] = t("errors.required");
        continue;
      }
      if (f.type === "multi" || f.type === "list") continue;

      const raw = values[f.id];
      const s = typeof raw === "string" ? raw.trim() : "";
      if (f.required && !s) {
        e[f.id] = t("errors.required");
        continue;
      }
      if (s && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) {
        e[f.id] = t("errors.email");
      }
      if (s && f.type === "number") {
        const n = Number(s);
        if (
          Number.isNaN(n) ||
          (f.min !== undefined && n < f.min) ||
          (f.max !== undefined && n > f.max)
        ) {
          e[f.id] = t("errors.range", { min: f.min ?? 0, max: f.max ?? 0 });
        }
      }
    }
    if (idx === total - 1 && !agree) e.agree = t("errors.agree");
    return e;
  };

  const focusFirst = (e: Record<string, string>) => {
    const first = Object.keys(e)[0];
    if (first) {
      document
        .getElementById(`w-${first}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const goNext = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);
    setStep((s) => s + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ---------------- files ----------------
  const onFiles = (
    f: Extract<Field, { type: "file" }>,
    ev: ChangeEvent<HTMLInputElement>,
  ) => {
    const picked = Array.from(ev.target.files ?? []);
    ev.target.value = "";
    if (!picked.length) return;

    let err = "";
    const ok: File[] = [];
    for (const file of picked) {
      if (!FILE_EXT.some((x) => file.name.toLowerCase().endsWith(x))) {
        err = t("files.type_error");
      } else if (file.size > MAX_MB * 1024 * 1024) {
        err = t("files.size_error", { mb: MAX_MB });
      } else {
        ok.push(file);
      }
    }

    if (ok.length) {
      const current = f.multiple ? (files[f.id] ?? []) : [];
      let merged = f.multiple ? [...current, ...ok] : [ok[ok.length - 1]];
      if (merged.length > MAX_FILES) {
        err = t("files.count_error", { n: MAX_FILES });
        merged = merged.slice(0, MAX_FILES);
      }
      setFiles((p) => ({ ...p, [f.id]: merged }));
    }
    setErrors((p) => {
      const { [f.id]: _r, ...rest } = p;
      return err ? { ...rest, [f.id]: err } : rest;
    });
  };

  const removeFile = (id: string, index: number) =>
    setFiles((p) => ({
      ...p,
      [id]: (p[id] ?? []).filter((_, i) => i !== index),
    }));

  // ---------------- submit ----------------
  const submit = async () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length) return focusFirst(e);

    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify({ ...values, agree, locale }));
      Object.entries(files).forEach(([key, list]) =>
        list.forEach((file) => fd.append(`file:${key}`, file)),
      );
      const res = await fetch("/api/career", { method: "POST", body: fd });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (status === "sending") return;
    if (last) submit();
    else goNext();
  };

  const reset = () => {
    setValues(initialValues());
    setFiles({});
    setErrors({});
    setAgree(false);
    setStep(0);
    setStatus("idle");
  };

  // ---------------- field renderer ----------------
  const renderField = (f: Field) => {
    const err = errors[f.id];
    const label = t(`fields.${f.id}.label`);
    const star = f.required ? " *" : "";
    const border = err ? "border-red-400" : "border-[#5E1E2B]/15";
    const wide = FULL_WIDTH.has(f.type) ? "sm:col-span-2" : "";

    let control: React.ReactNode = null;
    let labelNode: React.ReactNode = (
      <label
        htmlFor={`f-${f.id}`}
        className="mb-1.5 block text-sm font-semibold"
      >
        {label}
        {star}
      </label>
    );

    switch (f.type) {
      case "text":
      case "tel":
      case "email":
      case "date":
      case "number":
        control = (
          <input
            id={`f-${f.id}`}
            type={f.type}
            dir={f.ltr ? "ltr" : undefined}
            inputMode={f.type === "number" ? "numeric" : undefined}
            min={f.type === "number" ? f.min : undefined}
            max={f.type === "number" ? f.max : undefined}
            value={(values[f.id] as string) ?? ""}
            onChange={(e) => set(f.id, e.target.value)}
            aria-invalid={!!err}
            className={`${fieldClass} ${border} ${f.ltr ? "text-start" : ""}`}
          />
        );
        break;

      case "select":
        control = (
          <select
            id={`f-${f.id}`}
            value={(values[f.id] as string) ?? ""}
            onChange={(e) => set(f.id, e.target.value)}
            aria-invalid={!!err}
            className={`${fieldClass} ${border}`}
          >
            <option value="" disabled>
              {t("select")}
            </option>
            {f.options.map((o) => (
              <option key={o} value={o}>
                {t(`options.${f.id}.${o}`)}
              </option>
            ))}
          </select>
        );
        break;

      case "textarea":
        control = (
          <textarea
            id={`f-${f.id}`}
            rows={4}
            maxLength={1000}
            value={(values[f.id] as string) ?? ""}
            onChange={(e) => set(f.id, e.target.value)}
            aria-invalid={!!err}
            className={`${fieldClass} ${border} resize-y`}
          />
        );
        break;

      case "yesno":
        labelNode = (
          <span id={`l-${f.id}`} className="mb-2 block text-sm font-semibold">
            {label}
            {star}
          </span>
        );
        control = (
          <div
            role="radiogroup"
            aria-labelledby={`l-${f.id}`}
            className="flex gap-3"
          >
            {(["yes", "no"] as const).map((o) => {
              const on = values[f.id] === o;
              return (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => set(f.id, o)}
                  className={`min-w-24 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
                    on
                      ? "border-[#5E1E2B] bg-[#5E1E2B] text-white"
                      : `${border} bg-[#F4F4F3] text-[#363036] hover:border-[#5E1E2B]/50`
                  }`}
                >
                  {t(o)}
                </button>
              );
            })}
          </div>
        );
        break;

      case "multi": {
        const selected = (values[f.id] as string[]) ?? [];
        labelNode = (
          <span className="mb-2 block text-sm font-medium text-[#363036]/70">
            {t(`fields.${f.id}.label`)}
          </span>
        );
        control = (
          <div className="flex flex-wrap gap-2.5">
            {f.options.map((o) => {
              const on = selected.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    set(
                      f.id,
                      on ? selected.filter((x) => x !== o) : [...selected, o],
                    )
                  }
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    on
                      ? "border-[#5E1E2B] bg-[#5E1E2B] text-white"
                      : "border-[#5E1E2B]/20 bg-[#F4F4F3] text-[#363036] hover:border-[#5E1E2B]/50"
                  }`}
                >
                  {on && (
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  )}
                  {t(`options.${f.id}.${o}`)}
                </button>
              );
            })}
          </div>
        );
        break;
      }

      case "list": {
        const list = (values[f.id] as string[]) ?? [""];
        labelNode = (
          <span className="mb-1.5 block text-sm font-semibold">
            {label}
            {star}
          </span>
        );
        control = (
          <div className="flex flex-col gap-2.5">
            {list.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) =>
                    set(
                      f.id,
                      list.map((x, j) => (j === i ? e.target.value : x)),
                    )
                  }
                  placeholder={t("list.placeholder")}
                  aria-label={`${label} ${i + 1}`}
                  className={`${fieldClass} ${border}`}
                />
                {list.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      set(
                        f.id,
                        list.filter((_, j) => j !== i),
                      )
                    }
                    aria-label={t("files.remove")}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#5E1E2B]/15 text-[#5E1E2B] transition hover:bg-[#5E1E2B]/5"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            ))}
            {list.length < 6 && (
              <button
                type="button"
                onClick={() => set(f.id, [...list, ""])}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-[#5E1E2B]/30 px-4 py-2 text-sm font-medium text-[#481620] transition hover:bg-[#F3E6E8]/50"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                {t("list.add")}
              </button>
            )}
          </div>
        );
        break;
      }

      case "file": {
        const list = files[f.id] ?? [];
        labelNode = (
          <span className="mb-1.5 block text-sm font-semibold">
            {label}
            {star}
          </span>
        );
        control = (
          <div>
            <label
              htmlFor={`f-${f.id}`}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed bg-[#FBFBFA] px-4 py-3.5 transition hover:border-[#5E1E2B]/60 hover:bg-[#F3E6E8]/40 ${
                err ? "border-red-400" : "border-[#5E1E2B]/30"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3E6E8] text-[#5E1E2B]">
                <Upload className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 text-sm">
                <span className="block font-medium text-[#141414]">
                  {list.length && f.multiple
                    ? t("files.add_more")
                    : t("files.choose")}
                </span>
                <span className="block text-xs text-[#363036]/60">
                  {t("files.hint", { mb: MAX_MB })}
                </span>
              </span>
            </label>
            <input
              id={`f-${f.id}`}
              type="file"
              multiple={f.multiple}
              accept={FILE_EXT.join(",")}
              onChange={(e) => onFiles(f, e)}
              className="sr-only"
            />
            {list.length > 0 && (
              <ul className="mt-2.5 flex flex-col gap-2">
                {list.map((file, i) => (
                  <li
                    key={`${file.name}-${i}`}
                    className="flex items-center gap-3 rounded-lg border border-[#5E1E2B]/10 bg-white px-3 py-2 text-sm"
                  >
                    <FileText
                      className="h-4 w-4 shrink-0 text-[#5E1E2B]"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(f.id, i)}
                      aria-label={t("files.remove")}
                      className="text-[#5E1E2B] hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
        break;
      }
    }

    return (
      <div key={f.id} id={`w-${f.id}`} className={`scroll-mt-28 ${wide}`}>
        {labelNode}
        {control}
        {err && (
          <p role="alert" className="mt-1.5 text-sm text-red-700">
            {err}
          </p>
        )}
      </div>
    );
  };

  // ---------------- render ----------------
  const current = STEPS[step];

  return (
    <div
      ref={topRef}
      className="scroll-mt-24 rounded-2xl bg-white p-5 text-[#141414] sm:p-7"
    >
      {/* progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-[#481620]">
            {status === "success"
              ? t("progress.done")
              : t("progress.step", { current: step + 1, total })}
          </span>
          <span dir="ltr" className="tabular-nums text-[#363036]/70">
            {percent}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="h-2 overflow-hidden rounded-full bg-[#F3E6E8]"
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #7A2A3B 0%, ${BRAND_DARK} 100%)`,
            }}
            initial={false}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="status"
            className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-center"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: BRAND }}
            >
              <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
            </span>
            <h3 className="text-2xl font-bold leading-tight">
              {t("success_title")}
            </h3>
            <p className="max-w-md text-base leading-8 text-[#363036]/80">
              {t("success_desc")}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-lg border border-[#5E1E2B]/20 px-5 py-2.5 text-sm font-medium text-[#481620] transition hover:bg-[#5E1E2B]/5"
            >
              {t("send_another")}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key={step}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <h3 className="text-xl font-bold text-[#141414] sm:text-2xl">
              <bdi dir="ltr" className="me-2 text-[#5E1E2B]/50">
                0{step + 1}
              </bdi>
              {t(`steps.${current.id}`)}
            </h3>
            <p className="mt-1 text-sm text-[#363036]/60">
              {t("required_note")}
            </p>

            <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
              {/* honeypot */}
              {step === 0 && (
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={(values.company as string) ?? ""}
                    onChange={(e) => set("company", e.target.value)}
                  />
                </div>
              )}

              {current.fields.filter(visible).map((f, i, arr) => {
                const showGroup = f.group && f.group !== arr[i - 1]?.group;
                return (
                  <div key={f.id} className="contents">
                    {showGroup && (
                      <h4 className="mt-2 border-b border-[#5E1E2B]/10 pb-2 text-base font-bold text-[#481620] sm:col-span-2">
                        {t(`groups.${f.group}`)}
                      </h4>
                    )}
                    {renderField(f)}
                  </div>
                );
              })}

              {/* declaration (last step) */}
              {last && (
                <div id="w-agree" className="scroll-mt-28 sm:col-span-2">
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 text-sm leading-7 ${
                      errors.agree ? "border-red-400" : "border-[#5E1E2B]/15"
                    } bg-[#FBFBFA]`}
                  >
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => {
                        setAgree(e.target.checked);
                        clearError("agree");
                      }}
                      className="mt-1.5 h-4 w-4 shrink-0 accent-[#5E1E2B]"
                    />
                    <span>{t("agree")}</span>
                  </label>
                  {errors.agree && (
                    <p role="alert" className="mt-1.5 text-sm text-red-700">
                      {errors.agree}
                    </p>
                  )}
                </div>
              )}
            </div>

            {status === "error" && (
              <p
                role="alert"
                className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                {t("error")}
              </p>
            )}

            {/* navigation */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0 || status === "sending"}
                className="inline-flex items-center gap-2 rounded-lg border border-[#5E1E2B]/20 px-5 py-3 text-sm font-semibold text-[#481620] transition hover:bg-[#5E1E2B]/5 disabled:invisible"
              >
                <PrevIcon className="h-4 w-4" aria-hidden="true" />
                {t("back")}
              </button>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2.5 rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:brightness-90 disabled:opacity-60"
                style={{ backgroundColor: BRAND }}
              >
                {last ? (
                  <>
                    <Send
                      className={`h-4 w-4 ${isRtl ? "-scale-x-100" : ""}`}
                      aria-hidden="true"
                    />
                    {status === "sending" ? t("sending") : t("submit")}
                  </>
                ) : (
                  <>
                    {t("next")}
                    <NextIcon className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
