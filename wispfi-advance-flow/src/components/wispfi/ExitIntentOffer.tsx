import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, X, Users } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useTranslation } from "react-i18next";

interface ExitIntentOfferProps {
  onScheduleCall?: () => void;
}

export const ExitIntentOffer = ({ onScheduleCall }: ExitIntentOfferProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { trackEvent } = useAnalytics();
  const { t } = useTranslation();

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasShown(true);

        trackEvent({
          action: "exit_intent_preparation_modal_shown",
          category: "engagement",
          label: "thank_you_page",
        });
      }
    };

    // Add a small delay before activating exit intent
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown, trackEvent]);

  const handleClose = () => {
    trackEvent({
      action: "exit_intent_preparation_modal_closed",
      category: "engagement",
      label: "thank_you_page",
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t("components.exitIntentOffer.title")}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-semibold">{t("components.exitIntentOffer.specialistCall")}</p>
            </div>
            <p className="text-green-700 text-sm">{t("components.exitIntentOffer.specialistCallDesc")}</p>
          </div>

          <div className="space-y-3 mb-4">
            <h3 className="font-semibold text-foreground">{t("components.exitIntentOffer.whatToExpect")}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t("components.exitIntentOffer.expect1")}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t("components.exitIntentOffer.expect2")}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t("components.exitIntentOffer.expect3")}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{t("components.exitIntentOffer.expect4")}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-800">{t("components.exitIntentOffer.socialProof")}</p>
            </div>
            <p className="text-xs text-blue-600">{t("components.exitIntentOffer.keepPhoneNearby")}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
