import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { canonical } from '@/lib/seo';
import SiteHeader from '@/components/wispfi/SiteHeader';
import SiteFooter from '@/components/wispfi/SiteFooter';

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{t('privacy.pageTitle')} | WispFi</title>
        <meta name="description" content={t('privacy.metaDescription')} />
        <link rel="canonical" href={canonical("/privacy")} />
      </Helmet>

      <SiteHeader />

      <main className="container py-16">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1>{t('privacy.pageTitle')}</h1>
          <p className="text-muted-foreground">{t('privacy.lastUpdated')} {new Date().toLocaleDateString()}</p>

          <section>
            <h2>{t('privacy.infoCollect.title')}</h2>
            <p>{t('privacy.infoCollect.desc')}</p>
          </section>

          <section>
            <h2>{t('privacy.howUse.title')}</h2>
            <p>{t('privacy.howUse.intro')}</p>
            <ul>
              <li>{t('privacy.howUse.item1')}</li>
              <li>{t('privacy.howUse.item2')}</li>
              <li>{t('privacy.howUse.item3')}</li>
              <li>{t('privacy.howUse.item4')}</li>
            </ul>
          </section>

          <section>
            <h2>{t('privacy.sharing.title')}</h2>
            <p>{t('privacy.sharing.desc')}</p>
          </section>

          <section>
            <h2>{t('privacy.security.title')}</h2>
            <p>{t('privacy.security.desc')}</p>
          </section>

          <section>
            <h2>{t('privacy.rights.title')}</h2>
            <p>{t('privacy.rights.desc')}</p>
          </section>

          <section>
            <h2>{t('privacy.cookies.title')}</h2>
            <p>{t('privacy.cookies.desc')}</p>
          </section>

          <section>
            <h2>{t('privacy.updates.title')}</h2>
            <p>{t('privacy.updates.desc')}</p>
          </section>

          <section>
            <h2>{t('privacy.contactUs.title')}</h2>
            <p>{t('privacy.contactUs.intro')}</p>
            <ul>
              <li>{t('privacy.contactUs.email')} privacy@wispfi.com</li>
              <li>{t('privacy.contactUs.phone')} (818) 858-0184</li>
              <li>{t('privacy.contactUs.address')} 1317 EDGEWATER DR, #4212, Orlando, FL 32804</li>
            </ul>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Privacy;
