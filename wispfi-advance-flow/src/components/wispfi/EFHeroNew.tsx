import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Star,
  Shield,
  CheckCircle2,
  Zap,
  Clock,
  Banknote,
  FileText,
  BadgeCheck,
  Users,
  Award,
  DollarSign,
} from "lucide-react";
import FormShellMCA from "@/components/forms/FormShellMCA";
import femaleBusinessOwner from "@/assets/hero/female-business-owner-equipment.webp";
import { IndustryChips } from "@/components/wispfi/IndustryChips";
import { useAttribution } from "@/hooks/useAttribution";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import { useIsMobile } from "@/hooks/use-mobile";
import EFFormAPI from "./EFFormAPI";

interface EFHeroNewProps {
  onFormSubmit?: () => void;
}

export const EFHeroNew = ({ onFormSubmit }: EFHeroNewProps) => {
  const { getAttributionForForm } = useAttribution();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isPrequalModalOpen, setIsPrequalModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);

  const handleCheckEligibility = () => setIsPrequalModalOpen(true);
  const handleTalkToSpecialist = () => navigate("/contact");

  return (
    <section className="ef-hero relative isolate overflow-hidden">
      <link rel="preload" as="image" href={femaleBusinessOwner} fetchPriority="high" />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <picture>
          <source srcSet="/images/hero-ef-mobile.jpg" media="(max-width: 640px)" />
          <img
            src={femaleBusinessOwner}
            alt={t('components.efHero.alt.heroImage')}
            className="h-[92vh] sm:h-[84vh] w-full object-cover sm:object-center [object-position:50%_35%] sm:[object-position:auto]"
            loading="eager"
            decoding="async"
            width="1920"
            height="1080"
            fetchPriority="high"
            style={{ imageRendering: "auto" }}
          />
        </picture>
        <div
          className="absolute inset-0 hero-overlay hero-gradient-mobile before:content[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-black/35 before:bottom-[40%] sm:before:content-none"
          aria-hidden
        />
      </div>

      <div className="container py-6 sm:py-16 grid gap-4 lg:gap-6 lg:grid-cols-2 items-end sm:items-center min-h-[550px] sm:min-h-[600px] lg:min-h-[580px] xl:min-h-[560px] 2xl:min-h-[540px]">
        <div className="w-full max-w-xl animate-fade-in order-1 lg:pt-32 text-center lg:text-left mb-8 sm:mb-0 pt-[52vh] sm:pt-0">
          <h1 className="text-[clamp(1.2rem,5vw,1.5rem)] leading-[1.2] sm:text-3xl lg:text-[44px] lg:leading-[52px] font-bold text-hero-primary hero-text-shadow mb-4">
            {t('components.efHero.headline.start')}{" "}
            <span
              className="text-orange-400 font-extrabold"
              style={{
                textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.5)",
              }}
            >
              {t('components.efHero.headline.highlight')}
            </span>
          </h1>

          <div className="industry-chips hidden sm:grid">
            <IndustryChips />
          </div>

          <p className="text-[clamp(0.9rem,3.2vw,1rem)] leading-[1.35] sm:text-base font-semibold text-hero-sub hero-text-shadow mb-4">
            {t('components.efHero.subheadline')}
          </p>
          <div className="mb-4 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
            <p className="text-xs text-white/90 text-center leading-relaxed">
              {t('components.efHero.disclaimer')}
            </p>
          </div>

          <div className="mb-3 p-4 rounded-xl bg-gradient-to-r from-orange-500/20 via-white/15 to-blue-500/20 backdrop-blur-sm border border-white/30 shadow-lg">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center animate-pulse" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#FFC107] text-[#FFC107] drop-shadow-sm"
                    aria-label={`Star ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-white/90" />
                <span className="text-white font-medium hero-text-shadow text-sm">
                  {t('components.efHero.socialProof')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="cta"
              size="lg"
              className="w-full sm:w-auto h-[44px] px-3 py-2 sm:px-5 sm:py-3 text-[15px] sm:text-base rounded-[14px]"
              onClick={handleCheckEligibility}
            >
              {t('components.efHero.cta.checkOptions')}
            </Button>
            <Button
              variant="brandBlue"
              size="lg"
              className="sm:hidden w-full h-[44px] px-3 py-2 text-[15px] rounded-[14px]"
              onClick={handleTalkToSpecialist}
            >
              {t('components.efHero.cta.talkToSpecialist')}
            </Button>
            <Button
              variant="brandBlue"
              size="lg"
              className="hidden sm:inline-flex w-full sm:w-auto px-3 py-2 sm:px-5 sm:py-3 text-[15px] sm:text-base rounded-[14px]"
              onClick={handleTalkToSpecialist}
            >
              {t('components.efHero.cta.talkToSpecialist')}
            </Button>
          </div>

          <div className="hidden sm:block mt-6 p-5 bg-gradient-to-br from-white/98 to-white/92 backdrop-blur-lg border-2 border-white/40 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-100 to-emerald-50">
                <BadgeCheck className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">{t('components.efHero.qualifications.title')}</h3>
            </div>
            <ul className="text-sm text-gray-800 space-y-3">
              <li className="flex items-center gap-3 p-2 rounded-lg bg-green-50/80 hover:bg-green-50 transition-colors">
                <div className="p-1 rounded-full bg-green-100">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                </div>
                <span className="font-medium">{t('components.efHero.qualifications.yearInBusiness')}</span>
              </li>
              <li className="flex items-center gap-3 p-2 rounded-lg bg-blue-50/80 hover:bg-blue-50 transition-colors">
                <div className="p-1 rounded-full bg-blue-100">
                  <DollarSign className="h-4 w-4 text-blue-600 flex-shrink-0" />
                </div>
                <span className="font-medium">{t('components.efHero.qualifications.revenue')}</span>
              </li>
              <li className="flex items-center gap-3 p-2 rounded-lg bg-purple-50/80 hover:bg-purple-50 transition-colors">
                <div className="p-1 rounded-full bg-purple-100">
                  <Award className="h-4 w-4 text-purple-600 flex-shrink-0" />
                </div>
                <span className="font-medium">{t('components.efHero.qualifications.credit')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="hidden lg:block rounded-xl border border-white/20 bg-white/80 backdrop-blur-md p-3 sm:p-5 shadow-2xl order-1 lg:order-2 w-full max-w-[520px] mx-auto lg:ml-auto lg:mr-0 self-start"
          id="ef-form-section"
        >
          <FormShellMCA variant="ef">
            {typeof window !== "undefined" && !location.pathname.startsWith("/equipment-financing") ? (
              <div>EF form blocked outside /equipment-financing</div>
            ) : (
              <EFFormAPI />
            )}
          </FormShellMCA>
        </div>
      </div>

      <PrequalModal open={isPrequalModalOpen} onOpenChange={setIsPrequalModalOpen} formType="ef" />

      <div className="sm:hidden mx-auto max-w-[1120px] px-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200/50 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">{t('components.efHero.fastApprovals.title')}</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 text-center">
            {t('components.efHero.fastApprovals.desc')}
          </p>
        </div>
      </div>
    </section>
  );
};
