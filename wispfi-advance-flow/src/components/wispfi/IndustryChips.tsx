import { Button } from "@/components/ui/button";
import { Hammer, UtensilsCrossed, Truck, HeartPulse, Wifi, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

export const IndustryChips = () => {
  const { t } = useTranslation();
  
  const industries = [
    { label: t('components.industryChips.contractors'), icon: Hammer, anchor: "contractors" },
    { label: t('components.industryChips.restaurants'), icon: UtensilsCrossed, anchor: "restaurants" },
    { label: t('components.industryChips.trucking'), icon: Truck, anchor: "trucking" },
    { label: t('components.industryChips.healthcare'), icon: HeartPulse, anchor: "healthcare" },
    { label: t('components.industryChips.broadband'), icon: Wifi, anchor: "broadband" },
    { label: t('components.industryChips.others'), icon: Plus, anchor: "others" }
  ];

  const scrollToIndustry = (anchor: string) => {
    const element = document.getElementById(`industry-${anchor}`) || 
                   document.querySelector(`[data-industry="${anchor}"]`) ||
                   document.getElementById("industries-we-serve");
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4 mb-6">
      {industries.map((industry) => {
        const Icon = industry.icon;
        return (
          <Button
            key={industry.anchor}
            variant="outline"
            size="sm"
            onClick={() => scrollToIndustry(industry.anchor)}
            className="h-8 px-3 bg-white/90 backdrop-blur border-white/30 text-gray-800 hover:bg-white hover:border-primary/50 transition-all duration-300 text-xs font-medium"
          >
            <Icon className="h-3 w-3 mr-1.5" />
            {industry.label}
          </Button>
        );
      })}
    </div>
  );
};
