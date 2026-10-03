import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CareerPage from "@/components/website/Careerpage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Career" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default function Page() {
  return <CareerPage />;
}
