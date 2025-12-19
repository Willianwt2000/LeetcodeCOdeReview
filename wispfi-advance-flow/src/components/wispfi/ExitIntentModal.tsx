import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MCAFormAPI from "./MCAFormAPI";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "wispfi_exit_intent_shown_v1";

const shouldShow = () => {
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
};

export const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!shouldShow()) return;

    const onLeave = (e: MouseEvent) => {
      if (window.innerWidth < 640) return; // avoid on small screens
      if (e.clientY <= 0) {
        setOpen(true);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        window.removeEventListener("mouseout", onLeave);
      }
    };

    window.addEventListener("mouseout", onLeave);
    return () => window.removeEventListener("mouseout", onLeave);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-xl w-[92vw] max-w-[700px] p-4 sm:p-6 rounded-2xl overflow-y-auto max-h-[85vh]">
        <DialogHeader>
          <DialogTitle>{t("components.exitIntentModal.title")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground -mt-2 mb-4">{t("components.exitIntentModal.subtitle")}</p>
        <MCAFormAPI />
      </DialogContent>
    </Dialog>
  );
};
