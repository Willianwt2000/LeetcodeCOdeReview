import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { Network, CheckCircle2, TrendingUp, Clock, Zap, Shield, Settings } from 'lucide-react';
import networkEquipment from '@/assets/industries/network-equipment.jpg';
import cellTower from '@/assets/industries/cell-tower.jpg';
import businessMeeting from '@/assets/industries/business-planning-meeting.jpg';
import { useTranslation } from 'react-i18next';

const TelecomPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Telecom Infrastructure Company Funding"
      description="Fast capital for telecom infrastructure companies."
      keywords="telecom infrastructure funding, NOC equipment financing"
      heroTitle={t('thankYou.industryPages.telecom.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.telecom.heroSubtitle')}
      icon={Network}
      challenges={[
        "Immediate capital needs for large equipment purchases",
        "Emergency repairs that can't wait for approval processes",
        "Technology refresh cycles requiring significant investment",
        "24/7 network uptime demands and service level agreements",
        "Competitive pressure to adopt latest technologies quickly"
      ]}
      useCases={[
        "Network Operations Center (NOC) equipment refresh",
        "Microwave link installations and upgrades", 
        "Emergency generator replacements and power systems",
        "Network monitoring and management systems",
        "Redundancy and backup equipment installations",
        "Data center infrastructure and cooling systems",
        "Fiber optic and copper cable installations",
        "Testing equipment and network analysis tools"
      ]}
      solutions={[
        "Rapid deployment funding for critical infrastructure",
        "Emergency repair financing available 24/7",
        "Equipment refresh financing with flexible terms",
        "Technology upgrade capital aligned with ROI",
        "Multi-vendor equipment financing solutions",
        "Scalable funding for growing infrastructure needs"
      ]}
      benefits={[
        { icon: CheckCircle2, text: "Minimized network downtime and service disruptions" },
        { icon: TrendingUp, text: "Enhanced network performance and reliability" },
        { icon: Clock, text: "Competitive advantage through rapid technology adoption" },
        { icon: Zap, text: "24/7 availability for emergency funding needs" },
        { icon: Shield, text: "Improved network redundancy and disaster recovery" },
        { icon: Settings, text: "Comprehensive infrastructure modernization capability" }
      ]}
      stats={[
        { label: "Emergency Response", value: "< 4 hours", description: "Average response time for critical funding needs" },
        { label: "Uptime Improvement", value: "99.9%+", description: "Network availability after infrastructure upgrades" },
        { label: "Project Completion", value: "2-3x faster", description: "Compared to traditional financing methods" }
      ]}
      testimonial={{
        quote: "When our primary NOC equipment failed during peak hours, WispFi provided emergency funding within 4 hours.",
        author: "David Park",
        company: "Metro Network Solutions",
        role: "VP of Infrastructure"
      }}
      faq={[
        { question: "How quickly can I get emergency funding for critical equipment failures?", answer: "Emergency funding for critical infrastructure can be approved and funded within hours." },
        { question: "Can I use funding for both hardware and software infrastructure?", answer: "Yes, our funding covers both hardware equipment and software licensing." },
        { question: "Do you fund large-scale data center infrastructure projects?", answer: "Absolutely. We provide funding for data center equipment, cooling systems, and power infrastructure." },
        { question: "Can I get funding for preventive maintenance and equipment refresh cycles?", answer: "Yes, proactive equipment refresh funding helps you stay ahead of failures." },
        { question: "Do you work with both network operators and infrastructure contractors?", answer: "Yes, we fund both telecom operators and specialized contractors." }
      ]}
      images={{
        hero: networkEquipment,
        challenge: cellTower,
        solution: businessMeeting
      }}
      slug="telecom"
    />
  );
};

export default TelecomPage;