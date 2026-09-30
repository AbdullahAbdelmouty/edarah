// app/[locale]/about/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPage from "@/components/website/Aboutpage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default function Page() {
  return <AboutPage />;
}
