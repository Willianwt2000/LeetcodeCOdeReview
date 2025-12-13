import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { canonical } from "@/lib/seo";
import { ENV } from "@/lib/env";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";

const Legal = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{t('legal.metaTitle')}</title>
        <meta name="description" content={t('legal.metaDescription')} />
        <link rel="canonical" href={canonical("/legal")} />
      </Helmet>

      <SiteHeader />

      <section className="container py-14 space-y-8">
        <h1 className="text-3xl font-bold">{t('legal.pageTitle')}</h1>

        <article className="prose prose-neutral max-w-none">
          <h2 id="privacy">{t('legal.privacy.title')}</h2>
          <p>{t('legal.privacy.intro')}</p>
          
          <h3>{t('legal.privacy.collectTitle')}</h3>
          <ul>
            <li>{t('legal.privacy.collect1')}</li>
            <li>{t('legal.privacy.collect2')}</li>
            <li>{t('legal.privacy.collect3')}</li>
          </ul>
          
          <h3>{t('legal.privacy.useTitle')}</h3>
          <ul>
            <li>{t('legal.privacy.use1')}</li>
            <li>{t('legal.privacy.use2')}</li>
            <li>{t('legal.privacy.use3')}</li>
            <li>{t('legal.privacy.use4')}</li>
          </ul>
          
          <h3>{t('legal.privacy.sharingTitle')}</h3>
          <p>{t('legal.privacy.sharingDesc')}</p>
          
          <h3>{t('legal.privacy.choicesTitle')}</h3>
          <p>{t('legal.privacy.choicesDesc')}</p>
          
          <h3>{t('legal.privacy.securityTitle')}</h3>
          <p>{t('legal.privacy.securityDesc')}</p>
          
          <h3>{t('legal.privacy.childrenTitle')}</h3>
          <p>{t('legal.privacy.childrenDesc')}</p>
          
          <h3>{t('legal.privacy.changesTitle')}</h3>
          <p>{t('legal.privacy.changesDesc')}</p>

          <h2 id="terms">{t('legal.terms.title')}</h2>
          <p>{t('legal.terms.intro')}</p>
          
          <h3>{t('legal.terms.servicesTitle')}</h3>
          <p>{t('legal.terms.servicesDesc')}</p>
          
          <h3>{t('legal.terms.guaranteeTitle')}</h3>
          <p>{t('legal.terms.guaranteeDesc')}</p>
          
          <h3>{t('legal.terms.userTitle')}</h3>
          <p>{t('legal.terms.userDesc')}</p>
          
          <h3>{t('legal.terms.liabilityTitle')}</h3>
          <p>{t('legal.terms.liabilityDesc')}</p>
          
          <h3>{t('legal.terms.governingTitle')}</h3>
          <p>{t('legal.terms.governingDesc')}</p>

          <h2 id="disclaimer">{t('legal.disclaimer.title')}</h2>
          <p>{t('legal.disclaimer.intro')}</p>

          <p className="mb-4">
            <strong>{t('legal.disclaimer.businessNature')}</strong> {t('legal.disclaimer.businessNatureDesc')}
          </p>

          <h3 id="privacy" className="text-xl font-semibold mb-4 scroll-mt-16">
            {t('legal.disclaimer.consumerRights')}
          </h3>
          <p className="mb-4">
            <strong>{t('legal.disclaimer.yourRights')}</strong> {t('legal.disclaimer.yourRightsDesc')}
          </p>
          <p className="mb-4">
            <strong>{t('legal.disclaimer.doNotSell')}</strong> {t('legal.disclaimer.doNotSellDesc')}{" "}
            <a href="mailto:sales@wispfi.com" className="text-primary underline">
              sales@wispfi.com
            </a>{" "}
            {t('legal.disclaimer.orCall')}{" "}
            <a href="tel:+18188580184" className="text-primary underline">
              818-858-0184
            </a>
            .
          </p>

          <h3 className="text-xl font-semibold mb-4">{t('legal.disclaimer.cookiesTitle')}</h3>
          <p className="mb-4">{t('legal.disclaimer.cookiesDesc')}</p>

          <h3 className="text-xl font-semibold mb-4">{t('legal.disclaimer.dataRetentionTitle')}</h3>
          <p className="mb-4">{t('legal.disclaimer.dataRetentionDesc')}</p>

          <h3 className="text-xl font-semibold mb-4">{t('legal.disclaimer.marketingTitle')}</h3>
          <p className="mb-4">{t('legal.disclaimer.marketingDesc')}</p>

          <h3 id="faq" className="text-xl font-semibold mb-4 scroll-mt-16">
            {t('legal.faq.title')}
          </h3>
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-semibold">{t('legal.faq.q1')}</h4>
              <p>{t('legal.faq.a1')}</p>
            </div>
            <div>
              <h4 className="font-semibold">{t('legal.faq.q2')}</h4>
              <p>{t('legal.faq.a2')}</p>
            </div>
            <div>
              <h4 className="font-semibold">{t('legal.faq.q3')}</h4>
              <p>{t('legal.faq.a3')}</p>
            </div>
          </div>

          <p>
            <strong>{t('legal.contact')}</strong> 📞 <a href="tel:+18188580184">818-858-0184</a> | 📧{" "}
            <a href="mailto:sales@wispfi.com">sales@wispfi.com</a> | 📍 1317 EDGEWATER DR, #4212, ORLANDO, FL, 32804
          </p>
          <p>
            <em>{t('legal.lastUpdated')}</em> {ENV.LEGAL_LAST_UPDATED}
          </p>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Legal;
