import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Testimonial {
  id: string;
  name: string;
  business: string;
  industry: string;
  equipment: string;
  amount: string;
  rating: number;
  quote: string;
  avatar: string;
}

export const EquipmentFinancingTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useTranslation();

  const equipmentTestimonials: Testimonial[] = [
    {
      id: "1",
      name: "Maria Rodriguez",
      business: "Rodriguez Restaurant Group",
      industry: t("components.equipmentTestimonials.industry1"),
      equipment: t("components.equipmentTestimonials.equipment1"),
      amount: "$125,000",
      rating: 5,
      quote: t("components.equipmentTestimonials.quote1"),
      avatar: "/images/reviewers/maria-rodriguez-restaurant.jpg",
    },
    {
      id: "2",
      name: "Dr. James Park",
      business: "Park Family Dentistry",
      industry: t("components.equipmentTestimonials.industry2"),
      equipment: t("components.equipmentTestimonials.equipment2"),
      amount: "$85,000",
      rating: 5,
      quote: t("components.equipmentTestimonials.quote2"),
      avatar: "/images/reviewers/dr-james-park-dentist.jpg",
    },
    {
      id: "3",
      name: "Tom Wilson",
      business: "Wilson Construction LLC",
      industry: t("components.equipmentTestimonials.industry3"),
      equipment: t("components.equipmentTestimonials.equipment3"),
      amount: "$210,000",
      rating: 5,
      quote: t("components.equipmentTestimonials.quote3"),
      avatar: "/images/reviewers/tom-wilson-construction.jpg",
    },
    {
      id: "4",
      name: "Sarah Chen",
      business: "Chen Manufacturing Co",
      industry: t("components.equipmentTestimonials.industry4"),
      equipment: t("components.equipmentTestimonials.equipment4"),
      amount: "$180,000",
      rating: 5,
      quote: t("components.equipmentTestimonials.quote4"),
      avatar: "/images/reviewers/sarah-chen-manufacturing.jpg",
    },
    {
      id: "5",
      name: "Mike Thompson",
      business: "Thompson Transport",
      industry: t("components.equipmentTestimonials.industry5"),
      equipment: t("components.equipmentTestimonials.equipment5"),
      amount: "$450,000",
      rating: 5,
      quote: t("components.equipmentTestimonials.quote5"),
      avatar: "/images/reviewers/mike-thompson-trucking.jpg",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % equipmentTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, equipmentTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % equipmentTestimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + equipmentTestimonials.length) % equipmentTestimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = equipmentTestimonials[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("components.equipmentTestimonials.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("components.equipmentTestimonials.subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Main testimonial card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-orange-100">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Avatar and business info */}
              <div className="text-center lg:text-left flex-shrink-0">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-24 h-24 rounded-full mx-auto lg:mx-0 mb-4 object-cover border-4 border-orange-100"
                  onError={(e) => {
                    e.currentTarget.src = "/images/reviewers/p1.jpg";
                  }}
                />
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{currentTestimonial.name}</h3>
                  <p className="text-primary font-medium">{currentTestimonial.business}</p>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.industry}</p>
                </div>
              </div>

              {/* Quote and details */}
              <div className="flex-1">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                {/* Star rating */}
                <div className="flex gap-1 mb-4 justify-center lg:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg leading-relaxed mb-6 text-center lg:text-left">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Equipment details */}
                <div className="grid md:grid-cols-2 gap-4 p-4 bg-orange-50/50 rounded-lg border border-orange-100">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("components.equipmentTestimonials.equipmentFinanced")}
                    </p>
                    <p className="font-semibold">{currentTestimonial.equipment}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("components.equipmentTestimonials.financingAmount")}
                    </p>
                    <p className="font-semibold text-primary text-lg">{currentTestimonial.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-12 bg-white shadow-lg hover:shadow-xl border hidden lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-12 bg-white shadow-lg hover:shadow-xl border hidden lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Mobile navigation */}
          <div className="flex justify-center gap-2 mt-6 lg:hidden">
            <Button variant="outline" size="sm" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t("components.equipmentTestimonials.previous")}
            </Button>
            <Button variant="outline" size="sm" onClick={nextTestimonial}>
              {t("components.equipmentTestimonials.next")}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {equipmentTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <span className="text-2xl font-bold text-primary">$50M+</span>
            <p className="text-sm text-muted-foreground">
              {t("components.equipmentTestimonials.statEquipmentFinanced")}
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <p className="text-2xl font-bold text-primary">2,500+</p>
            <p className="text-sm text-muted-foreground">{t("components.equipmentTestimonials.statEquipmentDeals")}</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <p className="text-2xl font-bold text-primary">96%</p>
            <p className="text-sm text-muted-foreground">
              {t("components.equipmentTestimonials.statClientSatisfaction")}
            </p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm border">
            <p className="text-2xl font-bold text-primary">24-48hr</p>
            <p className="text-sm text-muted-foreground">{t("components.equipmentTestimonials.statAvgApproval")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentFinancingTestimonials;
