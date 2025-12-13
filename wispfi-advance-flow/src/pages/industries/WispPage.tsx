import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { Radio, CheckCircle2, TrendingUp, Clock, Zap, Shield, Target } from 'lucide-react';
import cellTowerSunset from '@/assets/industries/cell-tower-sunset.webp';
import networkEquipment from '@/assets/industries/network-equipment.jpg';
import cellTower from '@/assets/industries/cell-tower.jpg';
import { useTranslation } from 'react-i18next';

const WispPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Wireless Internet Service Provider (WISP) Funding"
      description="Fast, flexible funding for WISP operations."
      keywords="WISP funding, wireless ISP financing, CBRS equipment loans"
      heroTitle={t('thankYou.industryPages.wisp.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.wisp.heroSubtitle')}
      icon={Radio}
      challenges={[
        "Seasonal revenue fluctuations affecting cash flow",
        "Urgent tower upgrades that can't wait for bank approval",
        "Equipment failures requiring immediate replacement",
        "High upfront costs for site acquisition and leases",
        "Unpredictable maintenance and emergency repair needs"
      ]}
      useCases={[
        "Tower lease deposits and site acquisition",
        "CBRS equipment upgrades and spectrum expansion", 
        "Emergency backhaul equipment replacement",
        "Seasonal infrastructure capacity upgrades",
        "Network monitoring and management systems",
        "Customer premises equipment (CPE) inventory",
        "Backup power systems and generators",
        "Fiber backhaul and microwave link installations"
      ]}
      solutions={[
        "Fast-track approval process designed for WISP operations",
        "Flexible repayment terms aligned with seasonal cash flow",
        "No hard credit pull for pre-qualification",
        "Funding amounts from $25k to $2M based on revenue",
        "Revenue-based repayment that scales with your business",
        "Multiple funding rounds as you grow and expand"
      ]}
      benefits={[
        { icon: CheckCircle2, text: "Equipment upgrades completed within days, not months" },
        { icon: TrendingUp, text: "Improved service reliability and customer satisfaction" },
        { icon: Clock, text: "Reduced downtime and increased revenue potential" },
        { icon: Zap, text: "Rapid response to emergency equipment failures" },
        { icon: Shield, text: "Network redundancy and backup systems implementation" },
        { icon: Target, text: "Strategic expansion into new service territories" }
      ]}
      stats={[
        { label: "Average Approval Time", value: "24-48hrs", description: "From application to funding decision" },
        { label: "Funding Range", value: "$25k-$2M", description: "Based on monthly revenue and business needs" },
        { label: "Success Rate", value: "87%", description: "Of qualifying WISPs receive funding approval" }
      ]}
      testimonial={{
        quote: "WispFi helped us secure funding for a critical tower upgrade in just 48 hours.",
        author: "Mike Rodriguez",
        company: "Mountain View Wireless",
        role: "Owner & CTO"
      }}
      faq={[
        { question: "Can I use funding for tower lease deposits?", answer: "Yes, tower lease deposits and site acquisition costs are common uses for our funding." },
        { question: "How quickly can I get funding for emergency equipment replacement?", answer: "Emergency funding can be approved and funded within 24-48 hours." },
        { question: "Do you work with WISPs that have seasonal revenue variations?", answer: "Absolutely. We specialize in businesses with seasonal cash flow patterns." },
        { question: "What equipment purchases qualify for funding?", answer: "Virtually any network equipment including CBRS radios, backhaul equipment, towers, CPE devices, and more." },
        { question: "Can I get funding for multiple projects?", answer: "Yes, many of our WISP clients use multiple funding rounds for different projects." }
      ]}
      images={{
        hero: cellTowerSunset,
        challenge: networkEquipment,
        solution: cellTower
      }}
      slug="wisp"
    />
  );
};

export default WispPage;