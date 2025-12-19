import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

import EFFormAPI from "@/components/wispfi/EFFormAPI";
import FormShellMCA from "@/components/forms/FormShellMCA";
import MCAFormAPI from "@/components/wispfi/MCAFormAPI";

interface PrequalModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  formType?: "general" | "ef";
}

export const PrequalModal = ({ open, onOpenChange, formType = "general" }: PrequalModalProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <DialogContent className="sm:max-w-xl w-[95vw] max-w-[700px] p-3 sm:p-6 rounded-2xl overflow-y-auto max-h-[90vh] mx-auto">
          <DialogHeader>
            <DialogTitle>
              {formType === "ef" ? t("components.prequalModal.efTitle") : t("components.prequalModal.efTitle")}
            </DialogTitle>
          </DialogHeader>
          {formType === "ef" ? (
            <FormShellMCA variant="ef">
              {typeof window !== "undefined" && !location.pathname.includes("/equipment-financing") ? (
                <div>EF form blocked outside /equipment-financing</div>
              ) : (
                <EFFormAPI />
              )}
            </FormShellMCA>
          ) : (
            <FormShellMCA variant="mca">
              <MCAFormAPI />
            </FormShellMCA>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};
