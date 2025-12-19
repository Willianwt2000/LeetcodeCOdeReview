import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EquipmentFinancingCalculatorProps {
  onOpenModal?: () => void;
}

export const EquipmentFinancingCalculator: React.FC<EquipmentFinancingCalculatorProps> = ({ onOpenModal }) => {
  const [equipmentValue, setEquipmentValue] = useState<number>(50000);
  const [selectedEquipment, setSelectedEquipment] = useState<string>("restaurant");
  const [term, setTerm] = useState<number>(36);
  const { t } = useTranslation();

  const equipmentTypes = [
    { key: "restaurant", label: t("components.equipmentCalculator.typeRestaurant") },
    { key: "medical", label: t("components.equipmentCalculator.typeMedical") },
    { key: "construction", label: t("components.equipmentCalculator.typeConstruction") },
    { key: "manufacturing", label: t("components.equipmentCalculator.typeManufacturing") },
    { key: "it", label: t("components.equipmentCalculator.typeIT") },
    { key: "transportation", label: t("components.equipmentCalculator.typeTransportation") },
    { key: "other", label: t("components.equipmentCalculator.typeOther") },
  ];

  // Calculate financing amounts based on equipment value (80-100% LTV typical)
  const financingAmount = useMemo(() => {
    const ltv = 0.9; // 90% loan-to-value
    return Math.round(equipmentValue * ltv);
  }, [equipmentValue]);

  const monthlyPayment = useMemo(() => {
    const rate = 0.08 / 12; // 8% APR monthly
    const payment = (financingAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    return Math.round(payment);
  }, [financingAmount, term]);

  return (
    <section className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">{t("components.equipmentCalculator.title")}</h2>
          </div>
          <p className="text-lg text-muted-foreground">{t("components.equipmentCalculator.subtitle")}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          <div className="rounded-xl border bg-gradient-to-br from-white via-orange-50/30 to-white p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t("components.equipmentCalculator.equipmentDetails")}
            </h3>

            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium mb-3">
                  {t("components.equipmentCalculator.equipmentType")}
                </label>
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {equipmentTypes.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("components.equipmentCalculator.equipmentValue")}
                </label>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">$10k</span>
                  <span className="font-semibold text-lg">
                    {equipmentValue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                  <span className="text-muted-foreground">$500k+</span>
                </div>
                <Slider
                  value={[equipmentValue]}
                  onValueChange={([v]) => setEquipmentValue(v)}
                  min={10000}
                  max={500000}
                  step={5000}
                  className="w-full"
                  aria-label="Equipment value slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("components.equipmentCalculator.financingTerm")}
                </label>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{t("components.equipmentCalculator.termMin")}</span>
                  <span className="font-semibold text-lg">
                    {term} {t("components.equipmentCalculator.months")}
                  </span>
                  <span className="text-muted-foreground">{t("components.equipmentCalculator.termMax")}</span>
                </div>
                <Slider
                  value={[term]}
                  onValueChange={([v]) => setTerm(v)}
                  min={12}
                  max={84}
                  step={6}
                  className="w-full"
                  aria-label="Financing term slider"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-gradient-to-br from-primary/5 via-white to-primary/10 p-8 shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-primary">{t("components.equipmentCalculator.title")}</h3>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 border">
                <p className="text-sm text-muted-foreground">{t("components.equipmentCalculator.financingAmount")}</p>
                <p className="text-2xl font-bold text-primary">
                  {financingAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border">
                <p className="text-sm text-muted-foreground">{t("components.equipmentCalculator.monthlyPayment")}</p>
                <p className="text-2xl font-bold text-primary">
                  {monthlyPayment.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{t("components.equipmentCalculator.month")}
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{t("components.equipmentCalculator.benefit1")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{t("components.equipmentCalculator.benefit2")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{t("components.equipmentCalculator.benefit3")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>{t("components.equipmentCalculator.benefit4")}</span>
                </div>
              </div>

              <Button variant="cta" size="lg" className="w-full" onClick={onOpenModal}>
                {t("components.equipmentCalculator.cta")}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {t("components.equipmentCalculator.disclaimer")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentFinancingCalculator;
