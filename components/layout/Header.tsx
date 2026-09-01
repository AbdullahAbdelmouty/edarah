"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "ar" ? "en" : "ar";

  const switchLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  // toggles a slightly stronger shadow/blur once the page has scrolled,
  // so the floating header reads as "lifted" over content
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { title: t("nav_home"), href: "#home" },
    { title: t("nav_about"), href: "#about" },
    { title: t("nav_services"), href: "#services" },
    { title: t("nav_sectors"), href: "#sectors" },
    { title: t("nav_clients"), href: "#clients" },
  ];

  return (
    <>
      {/* ============================================================
          HEADER
          Sits flush, full-width, and square at the very top of the
          page. Once the user scrolls, it animates into the floating
          pill style — inset margins, rounded corners, blur, lifted
          shadow — then animates back flush if they scroll to the top
          again. Framer Motion tweens the position/radius/shadow so
          the transition itself feels smooth rather than snapping.
      ============================================================= */}
      <motion.header
        dir="rtl"
        animate={
          isScrolled
            ? {
                top: 12,
                left: 12,
                right: 12,
                borderRadius: 20,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              }
            : {
                top: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                boxShadow: "0 0px 0px rgba(0,0,0,0)",
              }
        }
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed z-50 
          px-4 py-2 font-sans text-[#5E1E2B]
          md:px-8
          border-b border-zinc-200/80
          ${isScrolled ? "bg-[#f4f4f5]/90 backdrop-blur-md" : "bg-[#f5f5f3]"}
        `}
      >
        <div className="mx-auto flex h-14 items-center justify-between">
          {/* RIGHT SIDE: LOGO & DESKTOP NAV LINKS */}
          <div className="flex items-center gap-8 md:gap-12">
            <a href="#" className="flex items-center">
              <img
                src="/logo.png"
                alt="Edarah Logo"
                className="h-15 md:h-15 w-auto object-contain"
                onError={(e) => (e.currentTarget.src = "/logo2.png")}
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-8 text-sm font-semibold text-[#1c1c1c] lg:flex">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="transition-opacity hover:opacity-75"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* LEFT SIDE: CTA, LANGUAGE PILL & MOBILE MENU BUTTON */}
          <div className="flex items-center gap-4">
            {/* Desktop "تواصل معنا" link */}
            <a
              href="#contact"
              className="hidden text-sm font-bold text-[#5E1E2B] underline decoration-2 underline-offset-8 transition-opacity hover:opacity-80 md:inline-block"
            >
              {t("contact_us")}
            </a>

            {/* Language Switcher Button (Pill style like nob.sa) */}
            <button
              onClick={switchLanguage}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-zinc-100 bg-white px-4 py-1.5 text-xs font-bold text-[#5E1E2B] shadow-sm transition-shadow hover:shadow md:text-sm"
            >
              <Globe className="h-4 w-4 text-[#5E1E2B]" />
              <span className="text-zinc-300">|</span>
              <span>{t("switch_lang")}</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 p-2 text-[#5E1E2B] focus:outline-none lg:hidden"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer so the fixed header never overlaps page content.
          Sized to the header's own height (56px) plus its vertical
          padding (2 * 8px) — stays constant since only position/
          radius/shadow animate, not the header's own height. */}
      <div className="h-[72px]" aria-hidden />

      {/* FULL-SCREEN MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-between overflow-y-auto bg-[#f8f8f9] px-6 py-12 text-[#5E1E2B]"
            dir="rtl"
          >
            {/* Stacked Large Centered Menu Links */}
            <div className="my-auto flex flex-col items-center gap-6 text-center text-2xl font-extrabold md:text-3xl">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="transition-opacity hover:opacity-75"
                >
                  {link.title}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="pt-2 underline decoration-2 underline-offset-8"
              >
                {t("contact_us")}
              </a>

              <button
                onClick={() => {
                  switchLanguage();
                  setIsOpen(false);
                }}
                className="mt-4 flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2 text-sm font-bold text-[#5E1E2B] shadow-sm"
              >
                <Globe className="h-4 w-4" />
                <span className="text-zinc-300">|</span>
                <span>{t("switch_lang")}</span>
              </button>
            </div>

            {/* Bottom Contact Details & Footer Links */}
            <div className="flex w-full max-w-xs flex-col items-center gap-3 border-t border-zinc-200 pt-6 text-center text-sm">
              <a href="tel:0127325555" className="dir-ltr font-bold">
                +966 12 732 5555
              </a>
              <a
                href="mailto:info@edarah-ss.com"
                className="font-bold underline underline-offset-4"
              >
                info@edarah-ss.com
              </a>

              <div className="flex gap-4 pt-3 text-xs text-zinc-500">
                <a href="#">{t("privacy_policy")}</a>
                <span>•</span>
                <a href="#">{t("terms_of_service")}</a>
              </div>

              <span className="pt-1 text-xs text-zinc-400">
                {t("copyright", { year: new Date().getFullYear() })}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
