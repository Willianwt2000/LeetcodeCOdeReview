import React from "react";
import { Zap, Shield, Award, Users, DollarSign, Clock, CheckCircle2 } from "lucide-react";

type Props = { 
  children: React.ReactNode;
  className?: string;
  variant?: 'mca' | 'ef' | 'mca-ef' | 'mca-b';
};

export default function FormShellMCA({ children, className, variant = 'mca' }: Props) {
  
  // Define content based on variant
  let content = variant === 'ef' ? {
    pillBanner: "$2M+ Equipment Financing • Limited Time",
    headline: "Apply for Equipment Financing",
    headlineAccent: "",
    subhead: "Financing from $10,000 up to $2,000,000 • Quick online application • Approvals as fast as 24–48 hours",
    proofLine: "⚡ Join 1,000+ equipment buyers who've closed in under 5 days",
    greenTileTitle: "Equipment Line up to $2M***",
    greenTileSubtitle: "Most get $50K–$2M",
    blueTileTitle: "Quick Decision (Subject to approval)",
    blueTileSubtitle: "As soon as 1–2 business days"
  } : {
    pillBanner: "$2M+ FUNDING • LIMITED TIME",
    headline: "Check Your Eligibility • ",
    headlineAccent: "Quick process • No credit hit",
    subhead: "No personal credit check to start • No collateral required",
    proofLine: "⚡ Join 15,000+ funded businesses with A+ BBB rating",
    greenTileTitle: "Up to $2M",
    greenTileSubtitle: "Most get $50K-$2M",
    blueTileTitle: "Quick Decision (Subject to approval)",
    blueTileSubtitle: "Funding as soon as 1-2 business days"
  };

  content = variant === 'mca-b' ? {
    pillBanner: "",
    headline: "",
    headlineAccent: "",
    subhead: "Secure form • Check eligibility quickly • No obligation",
    proofLine: "",
    greenTileTitle: "Up to $2M",
    greenTileSubtitle: "Most get $50K-$2M",
    blueTileTitle: "Quick Decision (Subject to approval)",
    blueTileSubtitle: "Funding as soon as 1-2 business days"
  } : content;


  return (
    <div className={`relative max-w-[580px] mx-auto overflow-hidden ${className}`} style={{borderRadius: '18px'}}>
      <div className="relative bg-white border border-orange-200/50 shadow-2xl overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/40 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-xl"></div>
        
        <div className="relative p-5">
          {/* Power Badge with Urgency */}
          {variant !== 'mca-b' ? (
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
              <Zap className="h-3 w-3" />
              {content.pillBanner}
            </div>
          </div>
          ) : null }

          {/* Compelling Headline with Social Proof */}
          <div className="text-center mb-4">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-1 leading-tight">
              {content.headline} 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> {content.headlineAccent}</span>
            </h1>
            {variant !== 'mca-b' ? (
            <p className="text-sm text-gray-700 font-semibold mb-1">
              {content.subhead}
            </p>
            ) : null }
            <p className="text-xs text-orange-600 font-bold mb-3">
              {content.proofLine}
            </p>
            
            {/* Simplified Trust Indicators (mobile-optimized) */}
            <div className="flex justify-center items-center gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                <Shield className="h-3 w-3 text-green-600" />
                <span className="text-xs font-bold text-green-800">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                <Award className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-bold text-blue-800">A+ BBB Rating</span>
              </div>
              <div className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-full border border-purple-200">
                <Users className="h-3 w-3 text-purple-600" />
                <span className="text-xs font-bold text-purple-800">15K+ Funded</span>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-1.5 sm:p-2.5">
                  <DollarSign className="h-3 w-3 text-green-600" />
                  <div className="text-center">
                    <div className="font-bold text-green-800 text-xs">{content.greenTileTitle}</div>
                    <div className="text-green-600 font-medium text-xs">{content.greenTileSubtitle}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-0.5 sm:gap-1 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-1.5 sm:p-2.5">
                  <Clock className="h-3 w-3 text-blue-600" />
                  <div className="text-center">
                    <div className="font-bold text-blue-800 text-xs">{content.blueTileTitle}</div>
                    <div className="text-blue-600 font-medium text-xs">{content.blueTileSubtitle}</div>
                  </div>
                </div>
            </div>
          </div>

          {/* HubSpot form goes here with proper spacing */}
          <div className="relative mb-4 space-y-4">
            {children}
          </div>

          {/* Trust signals at bottom */}
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 sm:gap-3 text-xs text-gray-600 mb-2">
              <div className="flex items-center gap-0.5 sm:gap-1">
                <Shield className="h-3 w-3 text-green-600" />
                <span className="text-xs font-semibold">SSL Encrypted</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <CheckCircle2 className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-semibold">CCPA Compliant</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              🔒 Your information is never shared
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}