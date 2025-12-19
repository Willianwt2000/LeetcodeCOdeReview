import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/wispfi-logo.svg";
import { Button } from "@/components/ui/button";
import { PrequalModal } from "./PrequalModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  MoreVertical,
  Info,
  Building,
  Star,
  MessageSquare,
  Phone,
  FileText,
  Settings,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Determine form type based on current route
  const formType = location.pathname === "/equipment-financing" ? "ef" : "general";

  const currentLanguage = i18n.language === "es" ? "es" : "en";
  // Agregar esta línea:
  const langSuffix = currentLanguage === "es" ? "?lang=es" : "";

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    // Update URL parameter
    const url = new URL(window.location.href);
    if (lang === "es") {
      url.searchParams.set("lang", "es");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const navigationItems = [
    { href: "/about", labelKey: "nav.about", icon: Info },
    { href: "/industries", labelKey: "nav.industries", icon: Building },
    { href: "/equipment-financing", labelKey: "nav.equipmentFinancing", icon: Settings },
    { href: "/why", labelKey: "nav.whyWispfi", icon: Star },
    { href: "/reviews", labelKey: "nav.reviews", icon: MessageSquare },
    { href: "/contact", labelKey: "nav.contact", icon: Phone },
    { href: "/legal", labelKey: "nav.legal", icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between py-3 px-4">
        <Link to={`/${langSuffix}`} className="flex items-center gap-2 text-xl font-semibold">
          <img src={logo} alt={t("alt.logo")} className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        {/* <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/industries">{t('nav.industries')}</Link>
          <Link to="/equipment-financing">{t('nav.equipmentFinancing')}</Link>
          <Link to="/why">{t('nav.whyWispfi')}</Link>
          <Link to="/blog">{t('nav.blog')}</Link>
          <Link to="/reviews">{t('nav.reviews')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
        </nav> */}

        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to={`/about${langSuffix}`}>{t("nav.about")}</Link>
          <Link to={`/industries${langSuffix}`}>{t("nav.industries")}</Link>
          <Link to={`/equipment-financing${langSuffix}`}>{t("nav.equipmentFinancing")}</Link>
          <Link to={`/why${langSuffix}`}>{t("nav.whyWispfi")}</Link>
          <Link to={`/blog${langSuffix}`}>{t("nav.blog")}</Link>
          <Link to={`/reviews${langSuffix}`}>{t("nav.reviews")}</Link>
          <Link to={`/contact${langSuffix}`}>{t("nav.contact")}</Link>
        </nav>

        {/* Desktop CTA + Language Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                <Globe className="h-4 w-4" />
                <span className="text-xs font-medium uppercase">{currentLanguage}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border shadow-lg">
              <DropdownMenuItem
                onClick={() => switchLanguage("en")}
                className={currentLanguage === "en" ? "bg-accent" : ""}
              >
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchLanguage("es")}
                className={currentLanguage === "es" ? "bg-accent" : ""}
              >
                🇪🇸 Español
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="cta" size="sm" onClick={() => setOpen(true)} aria-label={t("cta.checkEligibility")}>
            {t("cta.checkEligibility")}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-3 sm:hidden">
          <Button
            variant="cta"
            size="sm"
            onClick={() => setOpen(true)}
            className="min-h-[44px] px-3 text-xs touch-friendly"
            aria-label={t("cta.checkEligibility")}
          >
            {t("cta.checkEligibility")}
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="min-h-[44px] min-w-[44px] p-0 touch-target"
                aria-label={t("accessibility.openMobileMenu")}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu-sheet"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]" id="mobile-menu-sheet">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 mb-6 border-b">
                  <h2 className="text-lg font-semibold">{t("nav.menu")}</h2>
                </div>

                <nav className="flex-1">
                  <ul className="space-y-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            to={item.href + langSuffix}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors min-h-[48px]"
                          >
                            <Icon className="h-5 w-5" />
                            {t(item.labelKey)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Language Toggle for Mobile */}
                <div className="py-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2 px-3">{t("nav.language")}</p>
                  <div className="flex gap-2 px-3">
                    <Button
                      variant={currentLanguage === "en" ? "default" : "outline"}
                      size="sm"
                      onClick={() => switchLanguage("en")}
                      className="flex-1"
                    >
                      🇺🇸 English
                    </Button>
                    <Button
                      variant={currentLanguage === "es" ? "default" : "outline"}
                      size="sm"
                      onClick={() => switchLanguage("es")}
                      className="flex-1"
                    >
                      🇪🇸 Español
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button
                    variant="cta"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setOpen(true);
                    }}
                  >
                    {t("cta.checkEligibilityNow")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <PrequalModal open={open} onOpenChange={setOpen} formType={formType} />
    </header>
  );
};

export default SiteHeader;
