import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import fundingImg from "@/assets/funding/owner-payment.jpg";
import { useTranslation } from "react-i18next";

interface FundingCalculatorProps {
  onOpenModal?: () => void;
}

export const FundingCalculator: React.FC<FundingCalculatorProps> = ({ onOpenModal }) => {
  const [revenue, setRevenue] = useState<number>(25000);
  const [term, setTerm] = useState<number>(12);
  const { t } = useTranslation();

  const estMin = useMemo(() => revenue * 1, [revenue]);
  const estMax = useMemo(() => revenue * 2, [revenue]);

  return (
    <section className="container py-16">
      <div className="grid gap-8 lg:grid-cols-2 items-stretch">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">{t('components.fundingCalculator.title')}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t('components.fundingCalculator.subtitle')}</p>

          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">{t('components.fundingCalculator.monthlyRevenue')}</label>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">$5k</span>
                <span className="font-semibold">{revenue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</span>
                <span className="text-muted-foreground">$2M</span>
              </div>
              <Slider
                value={[revenue]}
                onValueChange={([v]) => setRevenue(v)}
                min={5000}
                max={500000}
                step={1000}
                aria-label="Monthly revenue slider"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('components.fundingCalculator.estimatedTerm')}</label>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">6</span>
                <span className="font-semibold">{term} {t('components.fundingCalculator.months')}</span>
                <span className="text-muted-foreground">18</span>
              </div>
              <Slider
                value={[term]}
                onValueChange={([v]) => setTerm(v)}
                min={6}
                max={18}
                step={1}
                aria-label="Estimated term slider"
              />
            </div>

            <div className="rounded-md border bg-muted/40 p-4">
              <p className="text-sm">{t('components.fundingCalculator.estimatedRange')}</p>
              <p className="text-2xl font-semibold">
                {estMin.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                <span className="mx-1">–</span>
                {estMax.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                <span className="ml-2 text-sm font-normal text-muted-foreground">{t('components.fundingCalculator.overMonths', { months: term })}</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{t('components.fundingCalculator.disclaimer')}</p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">{t('components.fundingCalculator.noCreditImpact')}</p>
              <Button variant="cta" onClick={onOpenModal}>
                {t('components.fundingCalculator.applyNow')}
              </Button>
            </div>
          </div>
        </div>

        <figure className="relative rounded-lg overflow-hidden border">
          <img src={fundingImg} alt="Café owner smiling at customer while processing a payment" className="h-full w-full object-cover object-center" loading="lazy" />
          <figcaption className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 flex items-end">
            <blockquote className="text-white max-w-md text-sm sm:text-base">
              {t('components.fundingCalculator.testimonialQuote')}
              <br />
              <span className="text-white/80">— {t('components.fundingCalculator.testimonialAuthor')}</span>
            </blockquote>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default FundingCalculator;
