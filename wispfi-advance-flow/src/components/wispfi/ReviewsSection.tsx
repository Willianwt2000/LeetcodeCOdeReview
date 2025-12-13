import React from 'react';
import { Star, Quote } from 'lucide-react';
import businessOwner1 from '@/assets/reviewers/business-owner-1.jpg';
import businessOwner2 from '@/assets/reviewers/business-owner-2.jpg';
import businessOwner3 from '@/assets/reviewers/business-owner-3.jpg';
import { useTranslation } from "react-i18next";

interface Review {
  text: string;
  author: string;
  rating: number;
  image: string;
}

export const ReviewsSection: React.FC = () => {
  const { t } = useTranslation();
  
  const reviews: Review[] = [
    {
      text: t('components.reviewsSection.review1Text'),
      author: "Mark R.",
      rating: 5,
      image: businessOwner1
    },
    {
      text: t('components.reviewsSection.review2Text'),
      author: "Laura S.",
      rating: 5,
      image: businessOwner2
    },
    {
      text: t('components.reviewsSection.review3Text'),
      author: "Daniel P.",
      rating: 5,
      image: businessOwner3
    }
  ];

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-[32px] sm:leading-[40px] font-semibold mb-4">{t('components.reviewsSection.title')}</h2>
        <p className="text-muted-foreground">{t('components.reviewsSection.subtitle')}</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div key={index} className="bg-card rounded-card border p-6 shadow-card relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
            
            <div className="flex items-center mb-4">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <blockquote className="text-foreground mb-4 leading-relaxed">
              "{review.text}"
            </blockquote>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={review.image} 
                  alt={review.author} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{review.author}</p>
                <p className="text-xs text-muted-foreground">{t('components.reviewsSection.verifiedClient')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
