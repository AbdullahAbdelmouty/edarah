"use client";

import { CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const BRAND = "#5E1E2B";

export default function PeopleQualitySection() {
  const t = useTranslations("PeopleQuality");
  const locale = useLocale();
  const features = [t("feature_1"), t("feature_2"), t("feature_3")];

  return (
    <section
      id="about"
      className="w-full bg-[#FBFBFA] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20"
      >
        <div className="max-w-[600px]">
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
                <CheckCircle2
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                  style={{ color: BRAND }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-[#e8e4e4] sm:min-h-[340px] lg:min-h-[400px]">
          <img
            src="/man3.webp"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover object-top blur-xl opacity-40"
            loading="lazy"
          />
          <img
            src="/man3.webp"
            alt={t("image_alt")}
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
