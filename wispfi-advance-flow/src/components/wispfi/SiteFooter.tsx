import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TrustSecurity } from "@/components/wispfi/TrustSecurity";

const SiteFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-gray-50">
      {/* Trust & Security Section */}
      <TrustSecurity />
      
        {/* Main Footer Content */}
        <div className="container py-6 lg:py-8">
          {/* Mobile-first layout */}
          <div className="grid gap-6 lg:grid-cols-4">
            {/* Company Info */}
            <div className="text-center lg:text-left">
              <p className="font-bold text-lg text-gray-900 mb-2">WispFi</p>
              <p className="text-sm text-gray-600 mb-4">{t('footer.tagline')}</p>
            </div>
            
            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <p className="font-semibold text-gray-900 mb-3">{t('footer.contact')}</p>
              <div className="space-y-2 text-sm">
                <a href="tel:+18188580184" className="block text-primary hover:text-primary-dark transition-colors min-h-[44px] py-2">
                  📞 818-858-0184
                </a>
                <a href="mailto:sales@wispfi.com" className="block text-primary hover:text-primary-dark transition-colors min-h-[44px] py-2">
                  📧 sales@wispfi.com
                </a>
              </div>
            </div>
          
            {/* Services Links */}
            <div className="text-center lg:text-left">
              <p className="font-semibold text-gray-900 mb-3">{t('footer.services')}</p>
              <div className="space-y-1 text-sm">
                <a href="/mca-funding" className="block text-blue-600 hover:text-blue-800 underline min-h-[44px] py-2">{t('nav.mcaFunding')}</a>
                <a href="/equipment-financing" className="block text-blue-600 hover:text-blue-800 underline min-h-[44px] py-2">{t('nav.equipmentFinancing')}</a>
                <a href="/industries" className="block text-blue-600 hover:text-blue-800 underline min-h-[44px] py-2">{t('nav.industries')}</a>
              </div>
            </div>
            
            {/* Legal Links */}
            <div className="text-center lg:text-left">
              <p className="font-semibold text-gray-900 mb-3">{t('footer.legal')}</p>
              <div className="space-y-1 text-sm">
                <a href="/legal" className="block text-blue-600 hover:text-blue-800 underline min-h-[44px] py-2">{t('footer.legal')}</a>
                <a href="/privacy" className="block text-blue-600 hover:text-blue-800 underline min-h-[44px] py-2">{t('footer.privacyPolicy')}</a>
                <a href="/terms" className="block text-blue-600 hover:text-blue-800 underline min-h-[44px] py-2">{t('footer.termsOfUse')}</a>
              </div>
            </div>
        </div>
        
        {/* Bottom Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
