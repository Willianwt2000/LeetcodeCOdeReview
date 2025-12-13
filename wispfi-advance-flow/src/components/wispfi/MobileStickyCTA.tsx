import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PrequalModal } from "./PrequalModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export const MobileStickyCTA = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Auto-detect form type based on current route
  const formType = location.pathname === '/equipment-financing' ? 'ef' : 'general';

  if (!isMobile) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t p-3 sm:hidden safe-area-inset-bottom">
        <div className="container flex gap-2 px-4 mx-auto max-w-full">
          <Button 
            variant="cta" 
            size="lg" 
            className="flex-1 min-h-[48px] touch-friendly-button touch-feedback"
            onClick={() => setOpen(true)}
          >
            {formType === 'ef' ? t('components.mobileStickyCTA.applyEF') : t('components.mobileStickyCTA.checkEligibility')}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="min-h-[48px] px-4 touch-friendly-button touch-feedback"
            asChild
          >
            <a href="tel:+18188580184" aria-label={t('components.mobileStickyCTA.callUs')}>
              <Phone className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
      {/* Add bottom padding to prevent content from being hidden */}
      <div className="h-28 sm:hidden safe-area-inset-bottom" aria-hidden="true" />
      <PrequalModal open={open} onOpenChange={setOpen} formType={formType} />
    </>
  );
};

export default MobileStickyCTA;
