"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === 'ar' ? 'en' : 'ar';

  const switchLanguage = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { title: t('nav_home'), href: "#home" },
    { title: t('nav_about'), href: "#about" },
    { title: t('nav_services'), href: "#services" },
    { title: t('nav_sectors'), href: "#sectors" },
    { title: t('nav_clients'), href: "#clients" },
  ];

  return (
    <header
      className="w-full bg-[#f4f4f5] text-[#2d124d] font-sans rounded-t-2xl pt-2 pb-2 px-4 md:px-8 border-b border-zinc-200/80"
      dir="rtl"
    >
      <div className=" mx-auto flex items-center justify-between h-14">
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
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#2d124d]">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:opacity-75 transition-opacity"
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
            className="hidden md:inline-block text-sm font-bold text-[#2d124d] underline underline-offset-8 decoration-2 hover:opacity-80 transition-opacity"
          >
            {t('contact_us')}
          </a>

          {/* Language Switcher Button (Pill style like nob.sa) */}
          <button onClick={switchLanguage} className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs md:text-sm font-bold text-[#2d124d] shadow-sm hover:shadow transition-shadow border border-zinc-100 cursor-pointer">
            <Globe className="w-4 h-4 text-[#2d124d]" />
            <span className="text-zinc-300">|</span>
            <span>{t('switch_lang')}</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#2d124d] focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* FULL-SCREEN MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#f8f8f9] z-40 flex flex-col justify-between items-center py-12 px-6 text-[#2d124d] overflow-y-auto"
            dir="rtl"
          >
            {/* Top Header inside Drawer */}
            <div className="w-full max-w-md flex items-center justify-between pt-2">
              <img
                src="/logo.png"
                alt="Edarah Logo"
                className="h-15 w-auto object-contain"
                onError={(e) => (e.currentTarget.src = "/logo2.png")}
              />
              <button onClick={() => setIsOpen(false)}>
                <X className="w-7 h-7 text-[#2d124d]" />
              </button>
            </div>

            {/* Stacked Large Centered Menu Links */}
            <div className="flex flex-col items-center gap-6 my-auto text-2xl md:text-3xl font-extrabold text-center">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-75 transition-opacity"
                >
                  {link.title}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="underline underline-offset-8 decoration-2 pt-2"
              >
                {t('contact_us')}
              </a>

              <button onClick={() => { switchLanguage(); setIsOpen(false); }} className="flex items-center gap-2 bg-white px-5 py-2 rounded-full text-sm font-bold text-[#2d124d] shadow-sm border border-zinc-200 mt-4 cursor-pointer">
                <Globe className="w-4 h-4" />
                <span className="text-zinc-300">|</span>
                <span>{t('switch_lang')}</span>
              </button>
            </div>

            {/* Bottom Contact Details & Footer Links */}
            <div className="flex flex-col items-center text-center gap-3 pt-6 border-t border-zinc-200 w-full max-w-xs text-sm">
              <a href="tel:0127325555" className="font-bold dir-ltr">
                +966 12 732 5555
              </a>
              <a
                href="mailto:info@edarah-ss.com"
                className="font-bold underline underline-offset-4"
              >
                info@edarah-ss.com
              </a>

              <div className="flex gap-4 text-xs text-zinc-500 pt-3">
                <a href="#">{t('privacy_policy')}</a>
                <span>•</span>
                <a href="#">{t('terms_of_service')}</a>
              </div>

              <span className="text-xs text-zinc-400 pt-1">
                {t('copyright', { year: new Date().getFullYear() })}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
