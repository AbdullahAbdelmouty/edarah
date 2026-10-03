import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TermsPage from "@/components/website/Termspage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return {
    title: t("title") + " | Edarah Security Services",
    description: t("s1_desc"),
  };
}

export default function Page() {
  return <TermsPage />;
}
