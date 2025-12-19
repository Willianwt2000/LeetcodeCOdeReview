import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, DollarSign, Calendar, Building2, CheckCircle2, Zap, Shield, Star } from "lucide-react";

interface SimplifiedEFFormProps {
  onSubmit?: (data: FormData) => void;
  className?: string;
}

interface FormData {
  equipmentType: string;
  fundingAmount: string;
  businessAge: string;
  monthlyRevenue: string;
}

const equipmentTypes = [
  "Restaurant/Kitchen Equipment",
  "Medical/Dental Equipment",
  "Construction Equipment",
  "Manufacturing Equipment",
  "IT/Technology Equipment",
  "Transportation/Fleet",
  "Agricultural Equipment",
  "Fitness/Gym Equipment",
  "Other Equipment",
];

const fundingAmounts = [
  "$5,000 - $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000 - $500,000",
  "$500,000+",
];

const businessAges = ["6 months - 1 year", "1 - 2 years", "2 - 5 years", "5+ years"];

const revenueRanges = [
  "$10K - $25K/month",
  "$25K - $50K/month",
  "$50K - $100K/month",
  "$100K - $250K/month",
  "$250K+/month",
];

export const SimplifiedEFForm = ({ onSubmit, className = "" }: SimplifiedEFFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    equipmentType: "",
    fundingAmount: "",
    businessAge: "",
    monthlyRevenue: "",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      field: "equipmentType",
      title: "What equipment do you need financing for?",
      icon: Building2,
      options: equipmentTypes,
    },
    {
      field: "fundingAmount",
      title: "How much financing do you need?",
      icon: DollarSign,
      options: fundingAmounts,
    },
    {
      field: "businessAge",
      title: "How long have you been in business?",
      icon: Calendar,
      options: businessAges,
    },
    {
      field: "monthlyRevenue",
      title: "What's your monthly revenue?",
      icon: Calculator,
      options: revenueRanges,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      onSubmit?.(formData);
      // Redirect to thank you page or show success message
      window.location.href = "/thank-you-ef";
    }, 1000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className={`max-w-md mx-auto ${className}`}>
      <CardContent className="p-6">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <currentStepData.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
        </div>

        {/* Form field */}
        <div className="mb-6">
          <div className="grid gap-2">
            {currentStepData.options.map((option) => (
              <Button
                key={option}
                variant={formData[currentStepData.field as keyof FormData] === option ? "default" : "outline"}
                className="justify-start h-auto p-3 text-left"
                onClick={() => updateFormData(currentStepData.field, option)}
              >
                {option}
                {formData[currentStepData.field as keyof FormData] === option && (
                  <CheckCircle2 className="h-4 w-4 ml-auto" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button
            variant="cta"
            onClick={handleNext}
            disabled={!formData[currentStepData.field as keyof FormData] || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Processing..." : currentStep === steps.length - 1 ? "Get My Quote" : "Continue"}
          </Button>
        </div>

        {/* Trust signals */}
        {currentStep === 0 && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center justify-center gap-4 mb-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                <span>24hr Decisions</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-green-600" />
                <span>Secure Process</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>4.8/5 Rating</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">No impact to your credit score to check options</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimplifiedEFForm;
