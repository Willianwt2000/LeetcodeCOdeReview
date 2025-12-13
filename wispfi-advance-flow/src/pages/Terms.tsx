import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { canonical } from '@/lib/seo';
import SiteHeader from '@/components/wispfi/SiteHeader';
import SiteFooter from '@/components/wispfi/SiteFooter';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{t('terms.pageTitle')} | WispFi</title>
        <meta name="description" content={t('terms.metaDescription')} />
        <link rel="canonical" href={canonical("/terms")} />
      </Helmet>

      <SiteHeader />

      <main className="container py-16">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1>{t('terms.pageTitle')}</h1>
          <p className="text-muted-foreground">{t('terms.lastUpdated')} {new Date().toLocaleDateString()}</p>

          <section>
            <h2>{t('terms.acceptance.title')}</h2>
            <p>{t('terms.acceptance.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.serviceDesc.title')}</h2>
            <p>{t('terms.serviceDesc.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.eligibility.title')}</h2>
            <p>{t('terms.eligibility.intro')}</p>
            <ul>
              <li>{t('terms.eligibility.item1')}</li>
              <li>{t('terms.eligibility.item2')}</li>
              <li>{t('terms.eligibility.item3')}</li>
              <li>{t('terms.eligibility.item4')}</li>
            </ul>
          </section>

          <section>
            <h2>{t('terms.application.title')}</h2>
            <p>{t('terms.application.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.noGuarantee.title')}</h2>
            <p>{t('terms.noGuarantee.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.fees.title')}</h2>
            <p>{t('terms.fees.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.privacyData.title')}</h2>
            <p>{t('terms.privacyData.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.liability.title')}</h2>
            <p>{t('terms.liability.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.governing.title')}</h2>
            <p>{t('terms.governing.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.changes.title')}</h2>
            <p>{t('terms.changes.desc')}</p>
          </section>

          <section>
            <h2>{t('terms.contactInfo.title')}</h2>
            <p>{t('terms.contactInfo.intro')}</p>
            <ul>
              <li>{t('terms.contactInfo.email')} legal@wispfi.com</li>
              <li>{t('terms.contactInfo.phone')} (818) 858-0184</li>
              <li>{t('terms.contactInfo.address')} 1317 EDGEWATER DR, #4212, Orlando, FL 32804</li>
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Terms;
