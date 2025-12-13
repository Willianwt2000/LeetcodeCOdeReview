import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { canonical } from "@/lib/seo";
import { Star, Quote, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PrequalModal } from "@/components/wispfi/PrequalModal";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import businessOwner1 from "@/assets/reviewers/business-owner-1.jpg";
import businessOwner2 from "@/assets/reviewers/business-owner-2.jpg";
import businessOwner3 from "@/assets/reviewers/business-owner-3.jpg";
import meetingRoomImg from "@/assets/reviews/meeting-room-discussion.jpg";
import businessSuccessImg from "@/assets/reviews/business-success.jpg";
import bbbLogo from "@/assets/trust/bbb.svg";
import trustpilotLogo from "@/assets/trust/trustpilot.svg";

const testimonials = [
  {
    name: "Mark R.",
    business: "Manufacturing Company",
    type: "Small Business Owner",
    text: "WispFi made the funding process simple and fast. They truly understood my business needs.",
    rating: 5,
    image: businessOwner1
  },
  {
    name: "Laura S.",
    business: "Retail Store",
    type: "Business Owner",
    text: "Professional and reliable team. We received our funds quickly and without hassle.",
    rating: 5,
    image: businessOwner2
  },
  {
    name: "Daniel P.",
    business: "Service Provider",
    type: "Entrepreneur",
    text: "Transparent, efficient, and supportive from start to finish. Highly recommended.",
    rating: 5,
    image: businessOwner3
  }
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))}
  </div>
);

const Reviews = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>WispFi Reviews | 4.8/5 Customer Satisfaction Rating</title>
      <meta name="description" content="Read authentic WISP funding reviews and positive business financing experiences from connectivity companies. See why 2,000+ businesses trust WispFi." />
      <link rel="canonical" href={canonical("/reviews")} />
      <meta property="og:title" content="WispFi Reviews | Real Customer Success Stories" />
      <meta property="og:description" content="Customer satisfaction stories from WISP and fiber providers who got fast funding through WispFi." />
      <script type="application/ld+json">{JSON.stringify({
        "@context":"https://schema.org",
        "@type":"Organization",
        "name":"WispFi",
        "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","reviewCount":"2000"}
      })}</script>
    </Helmet>
    <SiteHeader />
    <main>
      {/* Intro Section */}
      <section className="py-16" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('reviews.title')}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('reviews.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-2xl font-bold text-primary">{t('reviews.rating')}</span>
            </div>
            <div className="text-muted-foreground">
              {t('reviews.trustedBy')}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.image} alt={`${testimonial.name} profile`} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                      <p className="text-xs text-primary">{testimonial.type}</p>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </CardHeader>
                <CardContent>
                  <Quote className="w-6 h-6 text-primary mb-2" />
                  <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Review */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="text-center lg:text-left">
                <Quote className="w-12 h-12 text-primary mb-6 mx-auto lg:mx-0" />
                <blockquote className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
                  "{t('reviews.highlightQuote')}"
                </blockquote>
                <div className="flex items-center gap-4 justify-center lg:justify-start mb-6">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={businessOwner1} alt="Featured client profile" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold">{t('reviews.highlightAuthor')}</h4>
                    <p className="text-muted-foreground">{t('reviews.highlightCompany')}</p>
                    <StarRating rating={5} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-background rounded-lg">
                    <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">300%</div>
                    <div className="text-sm text-muted-foreground">{t('reviews.growth')}</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">2,000+</div>
                    <div className="text-sm text-muted-foreground">{t('reviews.customers')}</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">18mo</div>
                    <div className="text-sm text-muted-foreground">{t('reviews.timeline')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src={businessSuccessImg} 
                alt="Business success story showing growth and achievement" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="py-12 bg-background">
        <div className="container">
          <h3 className="text-center text-xl font-semibold mb-8 text-muted-foreground">
            {t('reviews.trustedPlatforms')}
          </h3>
          <div className="flex items-center justify-center gap-12 opacity-60">
            <img src={bbbLogo} alt="Better Business Bureau accredited" className="h-12 w-auto" loading="lazy" />
            <img src={trustpilotLogo} alt="Trustpilot verified reviews" className="h-12 w-auto" loading="lazy" />
            <div className="text-2xl font-bold text-muted-foreground">4.8★</div>
            <div className="text-lg font-medium text-muted-foreground">{t('reviews.reviewsCount')}</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img 
            src={meetingRoomImg} 
            alt="Professional meeting room discussion about business growth" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('reviews.ctaTitle')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('reviews.ctaSubtitle')}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg" onClick={() => setOpen(true)}>
            {t('reviews.ctaButton')}
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            {t('reviews.ctaNote')}
          </p>
        </div>
      </section>
    </main>
    <SiteFooter />
    <PrequalModal open={open} onOpenChange={setOpen} />
  </div>
  );
};

export default Reviews;