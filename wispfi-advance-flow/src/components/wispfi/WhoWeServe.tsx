import { Badge } from "@/components/ui/badge";
import { Hammer, Truck, Network, UtensilsCrossed, Stethoscope, Factory, Computer, CreditCard, Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

export const WhoWeServe = () => {
  const { t } = useTranslation();
  
  const industries = [
    { name: t('components.whoWeServe.contractors'), icon: Hammer },
    { name: t('components.whoWeServe.restaurants'), icon: UtensilsCrossed },
    { name: t('components.whoWeServe.trucking'), icon: Truck },
    { name: t('components.whoWeServe.healthcare'), icon: Stethoscope },
    { name: t('components.whoWeServe.retail'), icon: CreditCard },
    { name: t('components.whoWeServe.broadband'), icon: Network },
    { name: t('components.whoWeServe.autoServices'), icon: Wrench },
    { name: t('components.whoWeServe.ecommerce'), icon: Computer }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
            {t('components.whoWeServe.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('components.whoWeServe.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            return (
              <Badge 
                key={industry.name}
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium bg-white hover:bg-orange-50 text-gray-700 hover:text-orange-700 border border-gray-200 hover:border-orange-200 transition-all duration-200 cursor-pointer"
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {industry.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </section>
  );
};
