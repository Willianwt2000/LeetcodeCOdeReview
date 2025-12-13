import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { Scissors, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import salonsPeople from '@/assets/industries/salons-people.jpg';
import salons from '@/assets/industries/salons.jpg';
import businessMeeting from '@/assets/industries/business-planning-meeting.jpg';
import { useTranslation } from 'react-i18next';

const SalonsPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Salon & Beauty Industry Funding"
      description="Fast capital for salons, spas, and beauty businesses."
      keywords="salon funding, beauty business loans, spa financing"
      heroTitle={t('thankYou.industryPages.salons.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.salons.heroSubtitle')}
      icon={Scissors}
      challenges={t('thankYou.industryPages.salons.challenges', { returnObjects: true }) as string[]}
      useCases={t('thankYou.industryPages.salons.useCases', { returnObjects: true }) as string[]}
      solutions={t('thankYou.industryPages.salons.solutions', { returnObjects: true }) as string[]}
      benefits={[
        { icon: CheckCircle2, text: "Modern equipment improving service quality" },
        { icon: TrendingUp, text: "Increased client capacity" },
        { icon: Clock, text: "Faster renovations" }
      ]}
      stats={[
        { label: "Client Retention", value: "85%+", description: "After upgrades" },
        { label: "Revenue Increase", value: "20-35%", description: "Typical growth" },
        { label: "Booking Efficiency", value: "40% faster", description: "With modern systems" }
      ]}
      faq={[
        { question: "Can I get funding for renovations?", answer: "Yes, renovation funding is available." }
      ]}
      images={{
        hero: salonsPeople,
        challenge: salons,
        solution: businessMeeting
      }}
      slug="salons"
    />
  );
};

export default SalonsPage;