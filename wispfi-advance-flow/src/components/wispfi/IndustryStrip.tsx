import constructionImg from "@/assets/industries/construction.webp";
import truckingImg from "@/assets/industries/trucking.webp";
import restaurantImg from "@/assets/industries/restaurant.webp"; 
import medicalImg from "@/assets/industries/medical.webp";
import { useTranslation } from "react-i18next";

export const IndustryStrip = () => {
  const { t } = useTranslation();
  
  const industries = [
    { name: t('components.industryStrip.contractors'), image: constructionImg },
    { name: t('components.industryStrip.restaurants'), image: restaurantImg },
    { name: t('components.industryStrip.trucking'), image: truckingImg },
    { name: t('components.industryStrip.healthcare'), image: medicalImg }
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg">
            {t('components.industryStrip.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <div 
              key={industry.name}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[3/2]">
                <img
                  src={industry.image}
                  alt={`${industry.name} equipment financing`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-semibold text-lg">{industry.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
