import React from "react";
import { FileText, CheckCircle2, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ProcessTimelineProps {
  onOpenModal?: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();
  
  const steps = [
    { icon: FileText, title: t('components.processTimeline.step1Title'), text: t('components.processTimeline.step1Text') },
    { icon: CheckCircle2, title: t('components.processTimeline.step2Title'), text: t('components.processTimeline.step2Text') },
    { icon: Banknote, title: t('components.processTimeline.step3Title'), text: t('components.processTimeline.step3Text') },
  ];
  
  return (
    <section className="container py-16" style={{ marginTop: '13rem' }} >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
          ⚡ {t('components.processTimeline.urgencyBadge')}
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{t('components.processTimeline.title')}</h2>
        <p className="text-muted-foreground">{t('components.processTimeline.subtitle')}</p>
      </div>
      <ol className="grid gap-6 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, idx) => (
          <li key={title} className="relative rounded-lg border p-6 bg-card">
            {/* connector */}
            {idx < steps.length - 1 && (
              <span className="hidden sm:block absolute top-1/2 right-[-12px] h-[2px] w-6 bg-border" aria-hidden />
            )}
            <Icon className="h-8 w-8 text-primary mb-3" aria-hidden />
            <p className="font-semibold mb-1">{t('components.processTimeline.stepLabel', { number: idx + 1 })} — {title}</p>
            <p className="text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
      <div className="text-center mt-8">
        <Button variant="cta" onClick={onOpenModal}>
          {t('components.processTimeline.cta')}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          ⏰ {t('components.processTimeline.processingTime')}
        </p>
      </div>
    </section>
  );
};

export default ProcessTimeline;
