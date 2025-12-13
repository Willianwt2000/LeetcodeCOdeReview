import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { ShoppingBag, CheckCircle2, TrendingUp, Clock, Zap, Shield, Target } from 'lucide-react';
import retailPeople from '@/assets/industries/retail-people.jpg';
import retail from '@/assets/industries/retail.jpg';
import businessMeeting from '@/assets/industries/business-planning-meeting.jpg';
import { useTranslation } from 'react-i18next';

const RetailPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Retail Business Funding"
      description="Fast capital for retail businesses and stores."
      keywords="retail business funding, retail loans, inventory financing"
      heroTitle={t('thankYou.industryPages.retail.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.retail.heroSubtitle')}
      icon={ShoppingBag}
      challenges={[
        "Seasonal inventory requirements and cash flow gaps",
        "Rapid inventory turnover and supplier payment terms",
        "Store renovation and modernization needs",
        "Equipment upgrades and technology investments",
        "Expansion opportunities requiring quick capital"
      ]}
      useCases={[
        "Seasonal inventory purchases and restocking",
        "Point-of-sale systems and retail technology", 
        "Store renovations and visual merchandising",
        "E-commerce platform development and integration",
        "Marketing campaigns and advertising",
        "New location openings and expansion",
        "Equipment purchases and store fixtures",
        "Holiday and seasonal promotional inventory"
      ]}
      solutions={[
        "Inventory financing aligned with purchasing cycles",
        "Seasonal funding for peak sales periods",
        "Quick approval process for retail opportunities",
        "Flexible repayment matching sales patterns",
        "Equipment financing for store improvements",
        "Multi-location funding for retail chains"
      ]}
      benefits={[
        { icon: CheckCircle2, text: "Never miss seasonal buying opportunities" },
        { icon: TrendingUp, text: "Increased inventory turnover and sales volume" },
        { icon: Clock, text: "Faster store improvements and renovations" },
        { icon: Zap, text: "Quick response to market trends and opportunities" },
        { icon: Shield, text: "Cash flow stability during slow periods" },
        { icon: Target, text: "Strategic expansion into new markets" }
      ]}
      stats={[
        { label: "Inventory Turnover", value: "2-3x faster", description: "With adequate inventory financing" },
        { label: "Seasonal Revenue", value: "35-50% increase", description: "During peak seasons with proper funding" },
        { label: "Store Performance", value: "28% boost", description: "Average sales increase after renovations" }
      ]}
      testimonial={{
        quote: "WispFi's inventory financing allowed us to stock up for the holiday season without cash flow concerns. We increased our holiday sales by 45%.",
        author: "Jennifer Kim",
        company: "Trendy Boutique",
        role: "Owner"
      }}
      faq={[
        { question: "Can I get funding specifically for seasonal inventory?", answer: "Yes, seasonal inventory financing is one of our specialties." },
        { question: "How quickly can I get funding for a time-sensitive opportunity?", answer: "Retail opportunities can be approved and funded within 24-48 hours." },
        { question: "Can I use funding for both online and physical store improvements?", answer: "Absolutely. Our funding covers e-commerce and physical store renovations." },
        { question: "Do you work with both single stores and retail chains?", answer: "Yes, we fund single-location retailers as well as multi-location chains." },
        { question: "Can I get funding for marketing and promotional campaigns?", answer: "Yes, marketing and promotional funding is available." }
      ]}
      images={{
        hero: retailPeople,
        challenge: retail,
        solution: businessMeeting
      }}
      slug="retail"
    />
  );
};

export default RetailPage;