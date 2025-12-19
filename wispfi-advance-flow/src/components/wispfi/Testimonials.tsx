import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import p1 from "@/assets/reviewers/p1.jpg";
import p2 from "@/assets/reviewers/p2.jpg";
import p3 from "@/assets/reviewers/p3.jpg";
import p4 from "@/assets/reviewers/p4.jpg";
import p5 from "@/assets/reviewers/p5.jpg";
import p6 from "@/assets/reviewers/p6.jpg";
import p7 from "@/assets/reviewers/p7.jpg";
import p8 from "@/assets/reviewers/p8.jpg";
import p9 from "@/assets/reviewers/p9.jpg";
import p10 from "@/assets/reviewers/p10.jpg";
import p11 from "@/assets/reviewers/p11.jpg";
import p12 from "@/assets/reviewers/p12.jpg";
import { useTranslation } from "react-i18next";

const photos = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];

const baseReviews = [
  {
    name: "Gerard Vinci",
    role: "CEO, ALL SERVE COMMUNICATIONS",
    location: "Telecom Industry",
    quoteKey: "components.testimonials.quote1",
  },
  {
    name: "Steve Guy",
    role: "Enermuscle Marketing",
    location: "Broadband Expansion",
    quoteKey: "components.testimonials.quote2",
  },
  {
    name: "Joshua Aaron",
    role: "Montana Internet",
    location: "Telecom/Broadband",
    quoteKey: "components.testimonials.quote3",
  },
  { name: "Sarah", role: "Café Owner", location: "Portland, OR", quoteKey: "components.testimonials.quote4" },
  { name: "Mike", role: "Trucking Business Owner", location: "Dallas, TX", quoteKey: "components.testimonials.quote5" },
  { name: "Jessica", role: "Salon Owner", location: "Miami, FL", quoteKey: "components.testimonials.quote6" },
  { name: "Ravi", role: "Retailer", location: "Edison, NJ", quoteKey: "components.testimonials.quote7" },
  { name: "Elena", role: "Café Owner", location: "Seattle, WA", quoteKey: "components.testimonials.quote8" },
  { name: "Carlos", role: "Auto Shop Owner", location: "Phoenix, AZ", quoteKey: "components.testimonials.quote9" },
  { name: "Aisha", role: "Boutique Owner", location: "Atlanta, GA", quoteKey: "components.testimonials.quote10" },
  { name: "Noah", role: "Contractor", location: "Denver, CO", quoteKey: "components.testimonials.quote11" },
];

interface TestimonialsProps {
  className?: string;
  limit?: number;
  showSeeAllLink?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ className, limit, showSeeAllLink }) => {
  const { t } = useTranslation();

  const reviews = Array.from({ length: 60 }).map((_, i) => {
    const b = baseReviews[i % baseReviews.length];
    const photo = photos[i % photos.length];
    return { id: i, ...b, photo, quote: t(b.quoteKey) };
  });

  const displayed = typeof limit === "number" ? reviews.slice(0, limit) : reviews;
  const rating = 4.8;

  return (
    <section className={cn("container py-16", className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-[32px] sm:leading-[40px] font-semibold">
          {t("components.testimonials.title")}
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4" aria-hidden />
            ))}
          </div>
          <span>
            {rating}/5 {t("components.testimonials.basedOn", { count: reviews.length })}
          </span>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayed.map((r) => (
          <figure key={r.id} className="rounded-card border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={r.photo}
                alt={`${r.name} – ${r.role}`}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <figcaption>
                <p className="font-medium leading-tight">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.role} • {r.location}
                </p>
              </figcaption>
            </div>
            <div className="mb-2 flex items-center text-primary" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5" aria-hidden />
              ))}
            </div>
            <blockquote className="text-sm">"{r.quote}"</blockquote>
          </figure>
        ))}
      </div>
      {showSeeAllLink && (
        <div className="mt-6 text-center">
          <a href="/case-studies" className="underline">
            {t("components.testimonials.seeAllLink")}
          </a>
        </div>
      )}
    </section>
  );
};
