import React from "react";
import cafeImg from "@/assets/case-studies/cafe-owner.jpg";
import contractorsImg from "@/assets/case-studies/gym-owner.jpg";
import retailImg from "@/assets/case-studies/boutique-store.jpg";

export const CaseStudies: React.FC = () => {
  const studies = [
    {
      title: "Boosted revenue by 42% in 3 months",
      quote: "We added a patio and hired two baristas — sales jumped within weeks.",
      name: "Sarah M.",
      role: "Café Owner, OR",
      img: cafeImg,
      alt: "Smiling café owners at window counter in warm natural light — authentic, people-first",
      stats: ["+42% revenue", "+$28k monthly capacity", "2 new hires"],
    },
    {
      title: "Member growth 22% in one quarter",
      quote: "We launched small-group training and kept momentum strong.",
      name: "Diego S.",
      role: "Gym Owner, AZ",
      img: contractorsImg,
      stats: ["+22% memberships", "3 new classes", "Higher retention"],
    },
    {
      title: "31% lift in weekend sales after restock",
      quote: "We stocked best-sellers early and avoided stockouts.",
      name: "Aisha K.",
      role: "Retail Owner, GA",
      img: retailImg,
      stats: ["+31% weekend sales", "Holiday‑ready", "Top SKUs replenished"],
    },
  ];
  return (
    <section className="container py-16">
      <h2 className="text-2xl sm:text-[32px] sm:leading-[40px] font-semibold mb-6">Real Results, Real Businesses</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studies.map((s) => (
          <article key={s.title} className="rounded-card border overflow-hidden shadow-card">
            <img src={s.img} alt={s.alt ?? s.title} className="h-40 w-full object-cover" loading="lazy" />
            <div className="p-5">
              <h3 className="font-semibold sm:text-[24px] sm:leading-[32px] mb-1">{s.title}</h3>
              <ul className="mb-3 flex flex-wrap gap-2 text-xs">
                {s.stats?.map((st) => (
                  <li key={st} className="rounded-full bg-muted px-2 py-1">{st}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mb-3">“{s.quote}”</p>
              <p className="text-xs text-muted-foreground">— {s.name}, {s.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
