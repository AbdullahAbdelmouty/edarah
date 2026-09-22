"use client";

import { ShieldCheck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const BRAND = "#5E1E2B";

export default function SpecializedEnvironmentsSection() {
  const t = useTranslations("SpecializedEnvironments");
  const locale = useLocale();
  const features = [t("feature_1"), t("feature_2"), t("feature_3")];

  return (
    <section
      id="sectors"
      className="w-full bg-[#FBFBFA] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24"
    >
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20"
      >
        <div className="order-2 relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[360px] md:order-1 lg:min-h-[430px]">
          <img
            src="/security-team.webp"
            alt={t("image_alt")}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>

        <div className="order-1 max-w-[600px] md:order-2">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-[#141414]">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#353535]/75 sm:text-lg sm:leading-8">
            {t("description")}
          </p>

          <ul className="mt-6 space-y-3.5">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-base font-medium text-[#202020] sm:text-lg"
              >
                <ShieldCheck
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  style={{ color: BRAND }}
                  strokeWidth={1.8}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
