"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

// ⚠️ Replace with your own Formspree endpoint (formspree.io/f/xxxxxxxx)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const sectors = [
  "القطاع التجاري",
  "القطاع الصناعي",
  "القطاع السكني",
  "القطاع الحكومي",
  "القطاع الصحي",
  "الإنشاءات والمشاريع",
  "الفعاليات والمناسبات",
  "أخرى",
];

const contactItems = [
  {
    icon: Phone,
    label: "اتصل بنا",
    value: "0127325555",
    href: "tel:0127325555",
  },
  {
    icon: Mail,
    label: "راسلنا",
    value: "info@edarah-ss.com",
    href: "mailto:info@edarah-ss.com",
  },
  { icon: MapPin, label: "الموقع", value: "الطائف، المملكة العربية السعودية" },
  { icon: Clock, label: "التوفر", value: "خدمة عملاء على مدار الساعة" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EdarahContactSection() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [focusedField, setFocusedField] = useState(null);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    sector: "",
    message: "",
  });

  const handleChange = (field) => (e) =>
    setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          الاسم: values.name,
          الجوال: values.phone,
          البريد_الإلكتروني: values.email,
          القطاع: values.sector,
          الرسالة: values.message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setValues({ name: "", phone: "", email: "", sector: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#f5f5f3] px-4 py-16 md:px-8 md:py-24"
    >
      {/* soft ambient shape, quietly animated */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-[12%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#5E1E2B]/[0.05] blur-[90px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        {/* =========================== HEADER =========================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start md:mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5E1E2B] text-white shadow-[0_4px_20px_rgba(94,30,43,0.25)]">
              <Mail className="h-5 w-5" />
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight text-[#1c1c1c]">
              تواصل معنا
            </h2>
          </div>
        </motion.div>

        {/* =========================== BENTO GRID =========================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6"
        >
          {/* ---------- FORM CARD ---------- */}
          <motion.div
            variants={itemVariants}
            className="rounded-[28px] border border-black/[0.04] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] lg:col-span-7 md:p-10"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5E1E2B]/10 text-[#5E1E2B]"
                  >
                    <CheckCircle2 className="h-7 w-7" />
                  </motion.span>
                  <h3 className="text-xl font-bold text-[#1c1c1c]">
                    تم استلام طلبكم
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-black/50">
                    سيتواصل معكم فريق إدارة للخدمات الأمنية في أقرب وقت ممكن.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm font-bold text-[#5E1E2B] hover:opacity-70"
                  >
                    إرسال طلب آخر
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  variants={containerVariants}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="الاسم الكامل"
                      required
                      focused={focusedField === "name"}
                    >
                      <input
                        type="text"
                        required
                        value={values.name}
                        onChange={handleChange("name")}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="مثال: عبدالله الحربي"
                        className={inputClasses}
                      />
                    </Field>

                    <Field
                      label="رقم الجوال"
                      required
                      focused={focusedField === "phone"}
                    >
                      <input
                        type="tel"
                        required
                        value={values.phone}
                        onChange={handleChange("phone")}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="05XXXXXXXX"
                        className={inputClasses}
                      />
                    </Field>
                  </div>

                  <Field
                    label="البريد الإلكتروني"
                    required
                    focused={focusedField === "email"}
                  >
                    <input
                      type="email"
                      required
                      value={values.email}
                      onChange={handleChange("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="name@company.com"
                      className={inputClasses}
                    />
                  </Field>

                  <Field
                    label="القطاع / نوع المنشأة"
                    focused={focusedField === "sector"}
                  >
                    <select
                      value={values.sector}
                      onChange={handleChange("sector")}
                      onFocus={() => setFocusedField("sector")}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClasses} appearance-none`}
                    >
                      <option value="">اختر القطاع</option>
                      {sectors.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="تفاصيل الطلب"
                    required
                    focused={focusedField === "message"}
                  >
                    <textarea
                      required
                      rows={4}
                      value={values.message}
                      onChange={handleChange("message")}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="أخبرونا عن موقعكم واحتياجاتكم الأمنية"
                      className={`${inputClasses} resize-none`}
                    />
                  </Field>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-sm text-[#b3261e]"
                      >
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>تعذّر إرسال الطلب، يرجى المحاولة مرة أخرى.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: status === "submitting" ? 1 : 1.015 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                    className="group mt-2 flex items-center justify-center gap-2 rounded-full bg-[#5E1E2B] py-4 text-sm font-bold text-white transition-colors hover:bg-[#4a1721] disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        إرسال الطلب
                        <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ---------- CONTACT INFO CARD (dark, mirrors hero image card) ---------- */}
          <motion.div
            variants={itemVariants}
            className="relative flex min-h-[320px] flex-col overflow-hidden rounded-[28px] bg-[#1c1c1c] p-8 text-white lg:col-span-5 lg:min-h-full md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#5E1E2B]/40 blur-[70px]"
            />

            <div className="relative z-10">
              <div className="mb-3 flex items-center  gap-2.5">
                <span className="text-[12.5px] text-white/50">
                  إدارة للخدمات الأمنية
                </span>
                <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-[#d4443c]" />
              </div>
              <h3 className="text-right text-2xl font-bold leading-snug md:text-3xl">
                منظومتك الأمنية
                <br />
                تبدأ من هنا
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              className="relative z-10 mt-8 flex flex-col gap-0"
            >
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ x: -4 }}
                    className="flex items-center gap-4 border-t border-white/10 py-4 text-right last:border-b"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#e2857e]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs text-white/45">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-white md:text-base">
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                );
                return item.href ? (
                  <a
                    key={i}
                    href={item.href}
                    className="transition-opacity hover:opacity-80"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const inputClasses =
  "w-full rounded-2xl border border-black/10 bg-[#f5f5f3] px-4 py-3.5 text-sm text-[#1c1c1c] placeholder:text-black/30 outline-none transition-colors focus:border-[#5E1E2B]/40 focus:bg-white text-right";

function Field({ label, required, focused, children }) {
  return (
    <motion.label
      variants={itemVariants}
      className="flex flex-col gap-2 text-right"
    >
      <motion.span
        animate={{ color: focused ? "#5E1E2B" : "rgba(0,0,0,0.5)" }}
        transition={{ duration: 0.2 }}
        className="text-xs font-medium"
      >
        {label} {required && <span className="text-[#5E1E2B]">*</span>}
      </motion.span>
      {children}
    </motion.label>
  );
}
