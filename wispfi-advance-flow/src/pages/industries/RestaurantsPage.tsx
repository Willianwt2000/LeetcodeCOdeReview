import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { UtensilsCrossed, CheckCircle2, TrendingUp, Clock, Zap, Shield, DollarSign } from 'lucide-react';
import restaurantsPeople from '@/assets/industries/restaurants-people.jpg';
import restaurants from '@/assets/industries/restaurants.jpg';
import businessMeeting from '@/assets/industries/business-planning-meeting.jpg';
import { useTranslation } from 'react-i18next';

const RestaurantsPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Restaurant Industry Funding"
      description="Fast, flexible funding for restaurants and food service businesses."
      keywords="restaurant funding, restaurant loans, food service financing"
      heroTitle={t('thankYou.industryPages.restaurants.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.restaurants.heroSubtitle')}
      icon={UtensilsCrossed}
      challenges={[
        "Seasonal revenue fluctuations affecting cash flow",
        "High equipment costs and frequent replacement needs",
        "Inventory management and supplier payment terms",
        "Renovation and expansion capital requirements",
        "Labor costs and staffing challenges"
      ]}
      useCases={[
        "Kitchen equipment and appliance upgrades",
        "Point-of-sale systems and technology", 
        "Restaurant renovations and interior improvements",
        "Food inventory and supplier payments",
        "Seasonal marketing and advertising campaigns",
        "New location buildouts and expansion",
        "Outdoor seating and patio installations",
        "Delivery vehicle purchases and equipment"
      ]}
      solutions={[
        "Fast-track approval process for restaurant operations",
        "Flexible repayment terms aligned with seasonal patterns",
        "Daily or weekly payment options matching cash flow",
        "Multiple funding rounds for growth and expansion",
        "Equipment financing with competitive rates",
        "Working capital for inventory and operations"
      ]}
      benefits={[
        { icon: CheckCircle2, text: "Kitchen upgrades completed without service interruption" },
        { icon: TrendingUp, text: "Increased capacity and customer satisfaction" },
        { icon: Clock, text: "Faster renovation and expansion timelines" },
        { icon: Zap, text: "Quick response to seasonal opportunities" },
        { icon: Shield, text: "Cash flow stability during slow periods" },
        { icon: DollarSign, text: "Improved profit margins through efficiency gains" }
      ]}
      stats={[
        { label: "Average Approval Time", value: "24-48hrs", description: "From application to funding decision" },
        { label: "Revenue Increase", value: "25-40%", description: "Average increase after equipment upgrades" },
        { label: "Success Rate", value: "84%", description: "Of qualifying restaurants receive funding" }
      ]}
      testimonial={{
        quote: "WispFi helped us upgrade our entire kitchen during our slow season. When summer hit, we were ready to handle 3x the volume.",
        author: "Maria Santos",
        company: "Coastal Bistro",
        role: "Owner"
      }}
      faq={[
        { question: "Can I use funding for restaurant renovations?", answer: "Yes, renovation funding is one of our most popular uses." },
        { question: "How do repayment terms work with seasonal restaurant revenue?", answer: "We offer flexible repayment structures that accommodate seasonal patterns." },
        { question: "Can I get funding for a new restaurant location?", answer: "Yes, we provide funding for new location buildouts and equipment purchases." },
        { question: "Do you fund franchise restaurants?", answer: "Absolutely. We work with both independent restaurants and franchise locations." },
        { question: "Can I use funding for delivery and takeout expansion?", answer: "Yes, funding can be used for delivery vehicles, packaging equipment, and online ordering systems." }
      ]}
      images={{
        hero: restaurantsPeople,
        challenge: restaurants,
        solution: businessMeeting
      }}
      slug="restaurants"
    />
  );
};

export default RestaurantsPage;