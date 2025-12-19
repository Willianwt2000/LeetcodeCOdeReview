import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useABTest } from "@/hooks/useABTest";

export const NewsletterOptIn = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackNewsletterSignup } = useAnalytics();

  // A/B test for newsletter copy
  const { variant: copyVariant } = useABTest({
    testName: "newsletter_copy",
    variants: ["version_a", "version_b"],
    defaultVariant: "version_a",
  });

  // A/B test for CTA button color
  const { variant: buttonVariant } = useABTest({
    testName: "newsletter_button_color",
    variants: ["brand_blue", "accent_orange"],
    defaultVariant: "brand_blue",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      toast.error(t("newsletter.errorMessage"));
      return;
    }

    setIsSubmitting(true);

    // Track newsletter signup
    trackNewsletterSignup("blog_newsletter_banner");

    // Simulate API call
    setTimeout(() => {
      toast.success(t("newsletter.successMessage"));
      setEmail("");
      setName("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card className="rounded-2xl bg-white/90 backdrop-blur border-2 border-muted/20 overflow-hidden">
      <div className="p-7">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-[hsl(var(--brand-blue))] grid place-items-center text-white shadow-lg">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-extrabold text-foreground leading-tight">
            {copyVariant === "version_a" ? t("newsletter.titleA") : t("newsletter.titleB")}
          </h3>
        </div>
        <p className="text-slate-600 mb-5 leading-relaxed">
          {copyVariant === "version_a" ? t("newsletter.descA") : t("newsletter.descB")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <Input
              type="text"
              placeholder={t("newsletter.namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 flex-1 rounded-xl border border-slate-200 px-4 focus:border-primary transition-colors"
              required
            />
            <Input
              type="email"
              placeholder={t("newsletter.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-xl border border-slate-200 px-4 focus:border-primary transition-colors"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full px-6 rounded-xl bg-[hsl(var(--brand-blue))] text-white font-bold shadow-md hover:bg-[hsl(var(--brand-blue-hover))] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-blue))]/50 transition-all duration-200"
          >
            {isSubmitting ? t("newsletter.subscribing") : t("newsletter.subscribe")}
          </Button>
        </form>

        <p className="text-xs text-slate-500 mt-3 leading-relaxed">{t("newsletter.privacy")}</p>
      </div>
    </Card>
  );
};
