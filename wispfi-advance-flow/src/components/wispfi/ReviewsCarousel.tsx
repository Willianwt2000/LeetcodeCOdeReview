import React from "react";
import { Star } from "lucide-react";
import p1 from "@/assets/reviewers/p1.jpg";
import p2 from "@/assets/reviewers/p2.jpg";
import p3 from "@/assets/reviewers/p3.jpg";
import p4 from "@/assets/reviewers/p4.jpg";
import p5 from "@/assets/reviewers/p5.jpg";
import p6 from "@/assets/reviewers/p6.jpg";
import { useTranslation } from "react-i18next";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const photos = [p1, p2, p3, p4, p5, p6];

export const ReviewsCarousel: React.FC = () => {
  const { t } = useTranslation();

  const base = [
    {
      name: "Gerard Vinci",
      role: t("components.reviewsCarousel.role1"),
      quoteKey: "components.reviewsCarousel.quote1",
      location: t("components.reviewsCarousel.location1"),
    },
    {
      name: "Steve Guy",
      role: t("components.reviewsCarousel.role2"),
      quoteKey: "components.reviewsCarousel.quote2",
      location: t("components.reviewsCarousel.location2"),
    },
    {
      name: "Joshua Aaron",
      role: t("components.reviewsCarousel.role3"),
      quoteKey: "components.reviewsCarousel.quote3",
      location: t("components.reviewsCarousel.location3"),
    },
    {
      name: "Sarah",
      role: t("components.reviewsCarousel.role4"),
      quoteKey: "components.reviewsCarousel.quote4",
      location: t("components.reviewsCarousel.location4"),
    },
    {
      name: "Mike",
      role: t("components.reviewsCarousel.role5"),
      quoteKey: "components.reviewsCarousel.quote5",
      location: t("components.reviewsCarousel.location5"),
    },
    {
      name: "Jessica",
      role: t("components.reviewsCarousel.role6"),
      quoteKey: "components.reviewsCarousel.quote6",
      location: t("components.reviewsCarousel.location6"),
    },
    {
      name: "Ravi",
      role: t("components.reviewsCarousel.role7"),
      quoteKey: "components.reviewsCarousel.quote7",
      location: t("components.reviewsCarousel.location7"),
    },
    {
      name: "Elena",
      role: t("components.reviewsCarousel.role8"),
      quoteKey: "components.reviewsCarousel.quote8",
      location: t("components.reviewsCarousel.location8"),
    },
    {
      name: "Carlos",
      role: t("components.reviewsCarousel.role9"),
      quoteKey: "components.reviewsCarousel.quote9",
      location: t("components.reviewsCarousel.location9"),
    },
  ];

  const items = Array.from({ length: 18 }).map((_, i) => ({
    ...base[i % base.length],
    photo: photos[i % photos.length],
    id: i,
    quote: t(base[i % base.length].quoteKey),
  }));

  return (
    <section className="container py-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          {t("components.reviewsCarousel.badge")}
        </div>
        <h2 className="text-2xl sm:text-[32px] sm:leading-[40px] font-semibold mb-2">
          {t("components.reviewsCarousel.title")}
        </h2>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4" aria-hidden />
            ))}
          </div>
          <span>{t("components.reviewsCarousel.ratingText")}</span>
        </div>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((r) => (
            <CarouselItem key={r.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <figure className="rounded-card border bg-card p-5 shadow-card h-full">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default ReviewsCarousel;
