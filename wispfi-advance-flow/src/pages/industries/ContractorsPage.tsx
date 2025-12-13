import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { Hammer, CheckCircle2, TrendingUp, Clock, Zap, Shield, Wrench } from 'lucide-react';
import contractorsPeople from '@/assets/industries/contractors-people.jpg';
import contractors from '@/assets/industries/contractors.jpg';
import businessMeeting from '@/assets/industries/business-planning-meeting.jpg';
import { useTranslation } from 'react-i18next';

const ContractorsPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Contractor & Construction Funding"
      description="Fast capital for contractors and construction businesses."
      keywords="contractor funding, construction loans, contractor equipment financing"
      heroTitle={t('thankYou.industryPages.contractors.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.contractors.heroSubtitle')}
      icon={Hammer}
      challenges={[
        "Project-based cash flow with payment delays",
        "Equipment purchases and maintenance costs",
        "Material procurement and supplier payments",
        "Seasonal work patterns and weather delays",
        "Labor costs and workforce management"
      ]}
      useCases={[
        "Construction equipment and tool purchases",
        "Commercial vehicles and work trucks", 
        "Material purchases and supplier payments",
        "Project mobilization and startup costs",
        "Equipment maintenance and repairs",
        "Bonding and insurance requirements",
        "Subcontractor payments and labor costs",
        "Emergency equipment replacement"
      ]}
      solutions={[
        "Equipment financing for construction machinery",
        "Working capital for materials and labor",
        "Project funding aligned with payment schedules",
        "Flexible terms matching project completion cycles",
        "Quick approval for emergency equipment needs",
        "Multiple funding rounds for business growth"
      ]}
      benefits={[
        { icon: CheckCircle2, text: "Ability to take on larger, more profitable projects" },
        { icon: TrendingUp, text: "Increased equipment capacity and efficiency" },
        { icon: Clock, text: "Faster project completion and delivery" },
        { icon: Zap, text: "Quick response to emergency equipment failures" },
        { icon: Shield, text: "Financial stability during payment delays" },
        { icon: Wrench, text: "Comprehensive equipment maintenance capability" }
      ]}
      stats={[
        { label: "Project Capacity", value: "2-3x larger", description: "Projects you can bid on with proper funding" },
        { label: "Equipment Uptime", value: "95%+", description: "With preventive maintenance funding" },
        { label: "Profit Margins", value: "15-25% higher", description: "With owned vs. rented equipment" }
      ]}
      testimonial={{
        quote: "WispFi helped us purchase the excavator we needed to bid on commercial projects. We've tripled our revenue and can now handle jobs we could never take on before.",
        author: "Mike Thompson",
        company: "Thompson Construction",
        role: "Owner"
      }}
      faq={[
        { question: "Can I get funding for large construction equipment purchases?", answer: "Yes, we provide equipment financing for excavators, bulldozers, cranes, trucks, and all types of construction machinery." },
        { question: "How do payments work with project-based cash flow?", answer: "We offer flexible payment structures that can accommodate project completion cycles and payment delays." },
        { question: "Can I get funding for materials and supplier payments?", answer: "Absolutely. Working capital funding can be used for material purchases and supplier payments." },
        { question: "Do you fund both general contractors and specialty contractors?", answer: "Yes, we work with all types of contractors including general, electrical, plumbing, HVAC, and roofing." },
        { question: "Can I get emergency funding for equipment breakdowns?", answer: "Yes, emergency equipment funding is available for critical equipment failures." }
      ]}
      images={{
        hero: contractorsPeople,
        challenge: contractors,
        solution: businessMeeting
      }}
      slug="contractors"
    />
  );
};

export default ContractorsPage;