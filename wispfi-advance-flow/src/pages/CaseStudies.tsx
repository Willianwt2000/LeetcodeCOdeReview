import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { CaseStudies as CaseStudiesGrid } from "@/components/wispfi/CaseStudies";

const CaseStudiesPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>WispFi Case Studies | Real Small Business Results</title>
        <meta name="description" content="Read real small business case studies: revenue growth, faster inventory turns, bigger jobs won. See how WispFi funding fuels results." />
        <link rel="canonical" href="/case-studies" />
      </Helmet>
      <SiteHeader />
      <main>
        <section className="container py-12">
          <h1 className="text-3xl font-bold mb-2">{t('caseStudies.pageTitle')}</h1>
          <p className="text-muted-foreground mb-6">{t('caseStudies.pageSubtitle')}</p>
          <CaseStudiesGrid />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default CaseStudiesPage;