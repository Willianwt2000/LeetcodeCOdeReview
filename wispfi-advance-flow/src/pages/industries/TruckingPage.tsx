import { IndustryTemplate } from '@/components/wispfi/IndustryTemplate';
import { Truck, CheckCircle2, TrendingUp, Clock } from 'lucide-react';
import truckingPeople from '@/assets/industries/trucking-people.jpg';
import trucking from '@/assets/industries/trucking.jpg';
import businessMeeting from '@/assets/industries/business-planning-meeting.jpg';
import { useTranslation } from 'react-i18next';

const TruckingPage = () => {
  const { t } = useTranslation();
  
  return (
    <IndustryTemplate
      title="Trucking Industry Funding"
      description="Fast capital for trucking companies and logistics businesses."
      keywords="trucking loans, semi truck financing, trailer financing"
      heroTitle={t('thankYou.industryPages.trucking.heroTitle')}
      heroSubtitle={t('thankYou.industryPages.trucking.heroSubtitle')}
      icon={Truck}
      challenges={t('thankYou.industryPages.trucking.challenges', { returnObjects: true }) as string[]}
      useCases={t('thankYou.industryPages.trucking.useCases', { returnObjects: true }) as string[]}
      solutions={t('thankYou.industryPages.trucking.solutions', { returnObjects: true }) as string[]}
      benefits={[
        { icon: CheckCircle2, text: "Expanded fleet capacity" },
        { icon: TrendingUp, text: "Improved operational efficiency" },
        { icon: Clock, text: "Reduced downtime" }
      ]}
      stats={[
        { label: "Fleet Uptime", value: "98%+", description: "After funding" },
        { label: "Revenue Growth", value: "30-45%", description: "After expansion" },
        { label: "Emergency Response", value: "< 24 hours", description: "For repairs" }
      ]}
      faq={[
        { question: "Can I get funding for trucks?", answer: "Yes, we finance all commercial vehicles." }
      ]}
      images={{
        hero: truckingPeople,
        challenge: trucking,
        solution: businessMeeting
      }}
      slug="trucking"
    />
  );
};

export default TruckingPage;