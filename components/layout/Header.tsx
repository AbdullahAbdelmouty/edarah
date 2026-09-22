"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const t = useTranslations("Header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "ar" ? "en" : "ar";

  const switchLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { title: t("nav_home"), href: "#home" },
    { title: t("nav_services"), href: "#services" },
    { title: t("nav_about"), href: "#about" },
    { title: t("nav_carrer"), href: "#carrer" },
  ];

  const selectLink = (href: string) => {
    setActiveHref(href);
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        dir={locale === "ar" ? "rtl" : "ltr"}
        animate={
          isScrolled
            ? {
                top: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
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
        className={`fixed z-50 border-b border-zinc-200/80 px-3 py-2 font-sans text-[#5E1E2B] sm:px-4 lg:px-8 ${
          "bg-[#f5f5f3]/85 backdrop-blur-md"
        }`}
      >
        <div className="relative mx-auto flex h-14 max-w-[1440px] items-center justify-between">
          <a
            href="#home"
            onClick={() => selectLink("#home")}
            className="flex shrink-0 items-center"
            aria-label={t("nav_home")}
          >
            <img
              src="/logo.png"
              alt="Edarah Logo"
              className="h-12 w-auto object-contain sm:h-14"
              onError={(event) => {
                event.currentTarget.src = "/logo2.png";
              }}
            />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 text-sm font-semibold text-[#1c1c1c] lg:flex xl:gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => selectLink(link.href)}
                aria-current={activeHref === link.href ? "page" : undefined}
                className={`border-b-2 py-2 transition-colors hover:text-[#5E1E2B] ${
                  activeHref === link.href
                    ? "border-[#5E1E2B] text-[#5E1E2B]"
                    : "border-transparent"
                }`}
              >
                {link.title}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <a
              href="#home"
              onClick={() => selectLink("#home")}
              className="text-[11px] font-semibold text-[#5E1E2B] lg:hidden"
            >
              {t("nav_home")}
            </a>

            <a
              href="#contact"
              onClick={() => selectLink("#contact")}
              className="hidden rounded-lg bg-[#5E1E2B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#481620] lg:inline-flex"
            >
              {t("contact_us")}
            </a>

            <button
              type="button"
              onClick={switchLanguage}
              className="hidden cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-xs font-semibold text-[#5E1E2B] transition-colors hover:bg-white lg:flex"
              aria-label={t("switch_lang")}
            >
              <Globe className="h-4 w-4" />
              <span>{t("switch_lang")}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="p-1.5 text-[#5E1E2B] focus:outline-none lg:hidden"
              aria-label={isOpen ? t("close_menu") : t("open_menu")}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden border-t border-zinc-200/80 bg-[#f5f5f3] lg:hidden"
              aria-label={t("mobile_navigation")}
            >
              <div className="mx-auto flex w-full max-w-[1440px] flex-col px-3 pb-3 pt-2 sm:px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => selectLink(link.href)}
                    aria-current={activeHref === link.href ? "page" : undefined}
                    className={`border-s-2 px-3 py-3 text-xs font-medium text-[#5E1E2B] transition-colors ${
                      activeHref === link.href
                        ? "border-[#5E1E2B]"
                        : "border-transparent"
                    }`}
                  >
                    {link.title}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => selectLink("#contact")}
                  className="border-s-2 border-transparent px-3 py-3 text-xs font-medium text-[#5E1E2B]"
                >
                  {t("contact_us")}
                </a>
                <button
                  type="button"
                  onClick={switchLanguage}
                  className="mt-2 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2.5 text-start text-xs font-medium text-[#5E1E2B]"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{t("switch_lang")}</span>
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
}
