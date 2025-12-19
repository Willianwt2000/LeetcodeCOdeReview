import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, DollarSign, BadgeCheck, Users, Award } from "lucide-react";
import "@/styles/home.hero.card.css";
import MCAFormFloat from "@/components/MCAFormFloat";
import { IndustryChips } from "@/components/wispfi/IndustryChips";

import heroPoster from "@/assets/hero/hero-golden-hour.jpg";
import heroMobile from "@/assets/hero/hero-mobile-optimized.webp";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeroVideoProps {
  onOpenModal?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const scrollToCard = () => {
    if (isMobile) {
      const card = document.getElementById("home-mca-form-card");
      if (card) {
        card.scrollIntoView({ behavior: "smooth" });
        (window as any).dataLayer?.push({ event: "mca_form_open" });
      }
    } else {
      onOpenModal?.();
    }
  };

  return (
    <section className="hp-hero relative isolate overflow-visible">
      <link rel="preload" as="image" href={isMobile ? heroMobile : heroPoster} fetchPriority="high" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <picture>
          <source srcSet="/images/hero-home-mobile.jpg" media="(max-width: 640px)" />
          <img
            src={isMobile ? heroMobile : heroPoster}
            alt={t("hero.businessOwnerSmiling")}
            className="h-[94vh] sm:h-[84vh] w-full object-cover sm:object-center [object-position:50%_40%] sm:[object-position:auto]"
            loading="eager"
            decoding="async"
          />
        </picture>
        <div
          className="absolute inset-0 hero-overlay hero-gradient-mobile before:content[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/35 before:bottom-[40%] sm:before:content-none"
          aria-hidden
        />
      </div>

      <div className="container py-6 sm:py-16 grid gap-4 lg:gap-6 lg:grid-cols-2 items-end sm:items-start min-h-[550px] sm:min-h-[600px] lg:min-h-[620px] xl:min-h-[600px] 2xl:min-h-[580px]">
        {/* <div className="w-full max-w-xl animate-fade-in order-1 lg:pt-60 text-center lg:text-left mb-20  pt-[50vh] sm:pt-[310px]"> */}
        <div className="hero-container w-full max-w-xl animate-fade-in order-1 text-center lg:text-left mb-20
  pt-[50vh] sm:pt-[19.375rem] lg:pt-60">
          <p className="text-sm font-semibold text-hero-pre hero-text-shadow mb-2 hero-sub-mobile sm:text-sm">
            {t("hero.preHeadline")}
          </p>
          <h1 className="flex home-hero-title text-hero-primary text-[25] hero-text-shadow mb-4 font-bold">{t("hero.headline")}</h1>
          <h1 className="flex home-hero-title text-hero-primary  hero-text-shadow mb-4 font-bold">{t("hero.headline2")}</h1>

          <div className="hidden sm:grid">
            <IndustryChips />
          </div>
          <p className="text-[clamp(0.9rem,3.2vw,1rem)] leading-[1.35] sm:text-base font-semibold text-hero-sub hero-text-shadow mb-4">
            {t("hero.subHeadline")}
          </p>

          {/* Enhanced social proof section */}
          <div className="mb-3 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-orange-500/20 via-white/15 to-blue-500/20 backdrop-blur-sm border border-white/30 shadow-lg home-hero-social">
            <div className="flex items-center justify-center flex-col gap-3">
              {/* Estrellas con animación */}
              <div className="flex items-center gap-1 animate-pulse" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#FFC107] text-[#FFC107] drop-shadow-sm"
                    aria-label={`Star ${i + 1}`}
                  />
                ))}
              </div>

              {/* Span con el texto */}
              <span className="text-white font-semibold hero-text-shadow text-ls sm:text-sm text-center leading-tight">
                {t("hero.socialProof")}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0   p-4 sm:p-0 sm:static to-transparent sm:bg-none sm:via-transparent sm:from-transparent sm:to-transparent pt-6 sm:pt-0 items-center sm:justify-center sm:gap-4 home-hero-cta-row">
            <Button
              variant="cta"
              size="lg"
              className="w-full  h-[44px] px-3 py-2 sm:px-5 sm:py-3 text-[15px] sm:text-base rounded-[14px] sm:min-w-[210px] home-hero-cta-btn"
              onClick={scrollToCard}
            >
              {t("cta.checkEligibilityNow")}
            </Button>
            <Button
              variant="brandBlue"
              size="lg"
              className="sm:hidden w-full h-[44px] px-3 py-2 text-[15px] rounded-[14px] home-hero-cta-btn"
              asChild
            >
              <a href="/contact">{t("cta.talkToSpecialist")}</a>
            </Button>
            <Button
              variant="brandBlue"
              size="lg"
              className="hidden sm:inline-flex w-full  px-3 py-2 sm:px-5 sm:py-3 text-[15px] sm:text-base rounded-[14px] home-hero-cta-btn"
              asChild
            >
              <a href="/contact">{t("cta.talkToSpecialist")}</a>
            </Button>
          </div>
          <WhoQualifies />
        </div>

        <MCAFormFloat />
      </div>
    <div className="pb-[clamp(16px,3vh,40px)]">
      <button className="px-6 py-3 rounded-xl">
        CTA
      </button>
    </div>
    </section>
  );
};

export const WhoQualifies = () => {
  const { t } = useTranslation();

  return (
    <section className="mb-[-170px] mt-5">
      <div className="hidden  sm:block mt-6 p-5 bg-gradient-to-br from-white/98 to-white/92 backdrop-blur-lg border-2 border-white/40 rounded-2xl shadow-2xl hover:shadow-3xl  transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-100 to-emerald-50">
            <BadgeCheck className="h-5 w-5 text-green-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">{t("whoQualifies.title")}</h3>
        </div>
        <ul className="text-sm text-gray-800 space-y-3">
          <li className="flex items-center gap-3 p-2 rounded-lg bg-green-50/80 hover:bg-green-50 transition-colors">
            <div className="p-1 rounded-full bg-green-100">
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            </div>
            <span className="font-medium">{t("whoQualifies.yearInBusiness")}</span>
          </li>
          <li className="flex items-center gap-3 p-2 rounded-lg bg-blue-50/80 hover:bg-blue-50 transition-colors">
            <div className="p-1 rounded-full bg-blue-100">
              <DollarSign className="h-4 w-4 text-blue-600 flex-shrink-0" />
            </div>
            <span className="font-medium">{t("whoQualifies.monthlyRevenue")}</span>
          </li>
          <li className="flex items-center gap-3 p-2 rounded-lg bg-purple-50/80 hover:bg-purple-50 transition-colors">
            <div className="p-1 rounded-full bg-purple-100">
              <Award className="h-4 w-4 text-purple-600 flex-shrink-0" />
            </div>
            <span className="font-medium">{t("whoQualifies.allCredit")}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HeroVideo;
