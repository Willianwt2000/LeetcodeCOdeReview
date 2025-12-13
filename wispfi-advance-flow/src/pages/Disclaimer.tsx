import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";

const Disclaimer = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{t('disclaimer.pageTitle')} | WispFi</title>
        <meta name="description" content={t('disclaimer.metaDescription')} />
        <link rel="canonical" href="/legal" />
      </Helmet>

      <SiteHeader />

      <section className="container py-14 space-y-4">
        <h1 className="text-3xl font-bold">{t('disclaimer.pageTitle')}</h1>
        <p className="text-muted-foreground max-w-3xl">
          {t('disclaimer.movedMessage')} <a href="/legal">{t('disclaimer.legalPage')}</a> {t('disclaimer.forLatest')}
        </p>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Disclaimer;
