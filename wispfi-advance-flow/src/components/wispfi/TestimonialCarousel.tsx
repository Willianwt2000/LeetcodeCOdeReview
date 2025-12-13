import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: t('components.testimonialCarousel.role1'),
      company: "Golden Brew Coffee",
      image: "/src/assets/reviewers/business-owner-1.jpg",
      quote: t('components.testimonialCarousel.quote1'),
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: t('components.testimonialCarousel.role2'), 
      company: "Rodriguez Construction",
      image: "/src/assets/reviewers/business-owner-2.jpg",
      quote: t('components.testimonialCarousel.quote2'),
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: t('components.testimonialCarousel.role3'),
      company: "Thompson Family Dentistry", 
      image: "/src/assets/reviewers/business-owner-3.jpg",
      quote: t('components.testimonialCarousel.quote3'),
      rating: 5
    },
    {
      name: "David Kim",
      role: t('components.testimonialCarousel.role4'),
      company: "Seoul Kitchen",
      image: "/src/assets/reviewers/p4.jpg",
      quote: t('components.testimonialCarousel.quote4'),
      rating: 5
    },
    {
      name: "Jennifer Walsh",
      role: t('components.testimonialCarousel.role5'),
      company: "Walsh Precision Parts",
      image: "/src/assets/reviewers/p6.jpg", 
      quote: t('components.testimonialCarousel.quote5'),
      rating: 5
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isPlaying, testimonials.length]);

  const next = () => {
    setCurrent(prev => (prev + 1) % Math.ceil(testimonials.length / 3));
  };

  const prev = () => {
    setCurrent(prev => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
  };

  const getVisibleTestimonials = () => {
    const startIndex = current * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50/30 to-amber-50/20">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t('components.testimonialCarousel.title')}
            </h2>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
              {t('components.testimonialCarousel.badge')}
            </span>
          </div>
          <p className="text-gray-600 text-lg">
            {t('components.testimonialCarousel.subtitle')}
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card 
                key={`${current}-${index}`}
                className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-white to-orange-50/20 border-0 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    width="48"
                    height="48"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-orange-400 text-orange-400" 
                    />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>
              </Card>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
              aria-label={t('components.testimonialCarousel.previousLabel')}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    current === index ? 'bg-orange-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={t('components.testimonialCarousel.goToLabel', { number: index + 1 })}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200"
              aria-label={t('components.testimonialCarousel.nextLabel')}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
