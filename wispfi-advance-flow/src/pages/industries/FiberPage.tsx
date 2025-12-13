import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { Wifi, CheckCircle2, TrendingUp, Clock, Zap, Shield, Network } from 'lucide-react';
import fiberBokehBlue from '@/assets/industries/fiber-bokeh-blue.webp';
import fiberTechnician from '@/assets/industries/fiber-technician.jpg';
import fiberOpticHero from '@/assets/industries/fiber-optic-hero.jpg';
import { useTranslation } from 'react-i18next';

const FiberPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Fiber Network Provider Funding"
      description="Specialized financing for fiber infrastructure buildouts."
      keywords="fiber network funding, fiber infrastructure financing"
      heroTitle={t('thankYou.industryPages.fiber.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.fiber.heroSubtitle')}
      icon={Wifi}
      challenges={[
        "High upfront capital requirements for fiber buildouts",
        "Long payback periods with delayed revenue recognition",
        "Traditional lenders unfamiliar with fiber economics",
        "Seasonal construction windows requiring rapid deployment",
        "Complex project financing for multi-phase buildouts"
      ]}
      useCases={[
        "Fiber splicing equipment and fusion splicers",
        "Micro-trenching machinery and directional boring equipment", 
        "OTDR testing equipment and certification tools",
        "Splice trailers and mobile fiber labs",
        "Fiber optic cable and conduit inventory",
        "Network terminal equipment and OLT systems",
        "Construction materials and underground infrastructure",
        "Crew vehicles and specialized fiber construction tools"
      ]}
      solutions={[
        "Project-based funding aligned with construction milestones",
        "Working capital for materials, labor, and equipment",
        "Flexible repayment terms matching revenue timeline",
        "Multiple funding rounds for phased buildout projects",
        "Equipment financing for specialized fiber tools",
        "Inventory financing for cable and materials"
      ]}
      benefits={[
        { icon: CheckCircle2, text: "Accelerated network deployment and market entry" },
        { icon: TrendingUp, text: "Increased market share in target service areas" },
        { icon: Clock, text: "Faster time-to-revenue for new fiber networks" },
        { icon: Zap, text: "Ability to respond quickly to RFP opportunities" },
        { icon: Shield, text: "Financial flexibility during long buildout cycles" },
        { icon: Network, text: "Comprehensive coverage area development" }
      ]}
      stats={[
        { label: "Average Project Size", value: "$50k-$750k", description: "Typical funding range for fiber buildout projects" },
        { label: "Deployment Acceleration", value: "3-6 months", description: "Faster network deployment vs. traditional financing" },
        { label: "Market Penetration", value: "65%", description: "Average subscriber capture rate in funded areas" }
      ]}
      testimonial={{
        quote: "The funding from WispFi allowed us to complete our FTTH buildout 6 months ahead of schedule.",
        author: "Sarah Chen",
        company: "Valley Fiber Networks",
        role: "CEO & Founder"
      }}
      faq={[
        { question: "Can I get funding for a multi-phase fiber buildout project?", answer: "Yes, we specialize in phased project funding aligned with your construction milestones." },
        { question: "Do you fund both equipment purchases and construction costs?", answer: "Absolutely. Our funding covers splicing equipment, trenching machinery, fiber cable inventory, and labor costs." },
        { question: "How do repayment terms work for long buildout timelines?", answer: "We offer flexible repayment structures that align with when your network begins generating revenue." },
        { question: "Can I use funding for take-ready fiber infrastructure?", answer: "Yes, funding can be used for take-ready infrastructure, drop installations, and CPE." },
        { question: "Do you work with contractors and fiber construction companies?", answer: "Yes, we work with both network operators and fiber construction contractors." }
      ]}
      images={{
        hero: fiberBokehBlue,
        challenge: fiberOpticHero,
        solution: fiberTechnician
      }}
      slug="fiber"
    />
  );
};

export default FiberPage;