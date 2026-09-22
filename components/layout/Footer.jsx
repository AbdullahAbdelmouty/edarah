"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const BRAND_DARK = "#351018";
const FOOTER_DEEP = "#140b0e";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const quickLinks = [
    { label: t("home"), href: "#home" },
    { label: t("about"), href: "#about" },
    { label: t("services"), href: "#services" },
    { label: t("sectors"), href: "#sectors" },
    { label: t("contact"), href: "#contact" },
  ];

  const serviceLinks = [
    { label: t("guarding"), href: "#services" },
    { label: t("surveillance"), href: "#services" },
    { label: t("events"), href: "#services" },
    { label: t("personal_protection"), href: "#services" },
    { label: t("risk_management"), href: "#services" },
    { label: t("training"), href: "#services" },
  ];
  const companyInfo = [t("privacy"), t("terms")];

  return (
    <footer
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden px-6 pt-14 pb-7 text-[#f2ede6] sm:pt-16"
      style={{
        background: `linear-gradient(180deg, ${BRAND_DARK} 0%, ${FOOTER_DEEP} 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-2 text-center">
          <a href="#home" aria-label={t("home")}>
            <img
              src="/logo.png"
              alt="Edarah Security Services"
              className="h-16 w-auto object-contain brightness-0 invert"
            />
          </a>
          <p className="text-xs font-medium tracking-wide text-white/65 sm:text-sm">
            {t("brand_line")}
          </p>
        </div>

        <div className="my-8 h-px w-full bg-white/10 sm:my-10" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
              {t("quick_title")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-[#d7a2ab]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
              {t("services_title")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((link, index) => (
                <li key={`${link.label}-${index}`}>
                  <a
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-[#d7a2ab]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
              {t("legal_title")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {companyInfo.map((item) => (
                <li key={item} className="text-sm text-white/75">
                  {item}
                </li>
              ))}
              <li>
                <a
                  href="/الملف التعريفي انصات.pdf"
                  download="Edarah-Company-Profile.pdf"
                  className="text-sm text-white/75 transition-colors hover:text-[#d7a2ab]"
                >
                  {t("profile")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
              {t("contact_title")}
            </h2>
            <ul className="mt-4 flex flex-col gap-4">
              <li>
                <a
                  href="tel:0127325555"
                  className="flex items-center gap-3 text-sm text-white/75 transition-colors hover:text-[#d7a2ab]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#d7a2ab]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {t("phone")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@edarah-ss.com"
                  className="flex items-center gap-3 text-sm text-white/75 transition-colors hover:text-[#d7a2ab]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#d7a2ab]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {t("email")}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/75">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#d7a2ab]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                {t("location")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-start">
          <p className="text-xs text-white/55">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-white/55">{t("group_note")}</p>
        </div>
      </div>
    </footer>
  );
}
