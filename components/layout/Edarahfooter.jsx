"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpLeft } from "lucide-react";

// lucide-react no longer ships brand icons, so these are small inline SVGs
function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const quickLinks = [
  { label: "الرئيسية", href: "#" },
  { label: "من نحن", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "قطاعات نخدمها", href: "#sectors" },
  { label: "تواصل معنا", href: "#contact" },
];

const serviceLinks = [
  { label: "الحراسات الأمنية", href: "#" },
  { label: "المراقبة الإلكترونية", href: "#" },
  { label: "تأمين الفعاليات والمناسبات", href: "#" },
  { label: "الحماية الشخصية", href: "#" },
  { label: "إدارة المخاطر والتقييم الأمني", href: "#" },
];

const socials = [
  { icon: XIcon, href: "#", label: "X" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EdarahFooter() {
  return (
    <footer
      dir="rtl"
      className="relative w-full overflow-hidden bg-[#0a0a0c] text-[#f2ede6]"
    >
      {/* texture + glow, consistent with the rest of the site */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.012)_0px,rgba(255,255,255,0.012)_1px,transparent_1px,transparent_3px)] mix-blend-overlay" />
      <div className="pointer-events-none absolute -left-[10%] top-[-20%] h-[60%] w-[50%] bg-[radial-gradient(circle_at_30%_30%,#7a1b1e_0%,transparent_65%)] opacity-10 blur-[70px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-8 ">
        {/* ===================== LINK GRID ===================== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] md:py-16"
        >
          {/* brand */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Edarah"
                className="
                  w-20
                  md:w-20
                  lg:w-28
                  object-contain
                  brightness-0
                  invert
                "
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                }}
              />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#9a9399]">
              شركة متخصصة في تقديم الخدمات الأمنية المتكاملة للقطاعين العام
              والخاص، تتبع مجموعة العبيكان القابضة، منذ 2007.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a262b] bg-[#141216] text-[#9a9399] transition-colors hover:border-[#7a1b1e] hover:text-[#d4443c]"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* quick links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 text-right"
          >
            <span className=" text-[15px] text-[#9a9399]">روابط سريعة</span>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#d9d3cb] transition-colors hover:text-[#d4443c]"
                  >
                    <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#d4443c] opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* services */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 text-right"
          >
            <span className=" text-[15px] text-[#9a9399]">الخدمات</span>
            <ul className="flex flex-col gap-3.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#d9d3cb] transition-colors hover:text-[#d4443c]"
                  >
                    <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#d4443c] opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* contact */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 text-right"
          >
            <span className=" text-[15px] text-[#9a9399]">تواصل</span>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:0127325555"
                  className="group flex items-center gap-3 text-sm text-[#d9d3cb] transition-colors hover:text-[#d4443c]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2a262b] bg-[#141216] text-[#d4443c] transition-colors group-hover:border-[#7a1b1e]">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  0127325555
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@edarah-ss.com"
                  className="group flex items-center gap-3 text-sm text-[#d9d3cb] transition-colors hover:text-[#d4443c]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2a262b] bg-[#141216] text-[#d4443c] transition-colors group-hover:border-[#7a1b1e]">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  info@edarah-ss.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#d9d3cb]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2a262b] bg-[#141216] text-[#d4443c]">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                الطائف، المملكة العربية السعودية
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ===================== BOTTOM BAR ===================== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col-reverse items-center justify-between gap-4 border-t border-[#2a262b] py-8 text-center md:flex-row md:text-right"
        >
          <span className="text-xs text-[#6b6670]">
            © {new Date().getFullYear()} شركة إدارة للخدمات الأمنية. جميع الحقوق
            محفوظة.
          </span>
          <span className="text-xs text-[#6b6670]">
            إحدى شركات مجموعة العبيكان القابضة
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
