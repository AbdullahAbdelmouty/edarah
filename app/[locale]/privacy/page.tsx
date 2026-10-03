import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PrivacyPage from "@/components/website/Privacypage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("title") + " | Edarah Security Services",
    description: t("s1_desc"),
  };
}

export default function Page() {
  return <PrivacyPage />;
}
