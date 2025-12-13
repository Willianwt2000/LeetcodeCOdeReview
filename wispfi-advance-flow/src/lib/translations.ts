export interface Translations {
  hero: {
    preTitle: string;
    title: string;
    description: string;
    disclaimer: string;
    formTitle: string;
    formDescription: string;
    qualifiesTitle: string;
    qualifiesBusiness: string;
    qualifiesRevenue: string;
    qualifiesCredit: string;
    complianceText: string;
  };
  form: {
    businessName: string;
    state: string;
    monthlyRevenue: string;
    timeInBusiness: string;
    equipmentType: string;
    equipmentCost: string;
    equipmentCondition: string;
    sellerType: string;
    submitButton: string;
    new: string;
    used: string;
    dealer: string;
    privateParty: string;
    microcopy: string;
  };
  industries: {
    contractors: string;
    restaurants: string;
    trucking: string;
    healthcare: string;
    broadband: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    hero: {
      preTitle: "Equipment Financing • $25K-$500K • Fast Approval",
      title: "Fast Equipment Financing — Upgrade Your Business Today",
      description:
        "Get the equipment you need to grow your business in as little as 24-48 hours* — no collateral, no stress.",
      disclaimer: "*Timeframes vary by business and require approval.",
      formTitle: "Check Eligibility → See Options → Apply",
      formDescription: "Secure form • Quick approval • No obligation",
      qualifiesTitle: "Who Qualifies:",
      qualifiesBusiness: "At least 1 year in business",
      qualifiesRevenue: "$20k+ monthly revenue",
      qualifiesCredit: "All credit considered (subject to approval)",
      complianceText: "Typical approvals in 24–72 hours* (*subject to approval)",
    },
    form: {
      businessName: "Business Name",
      state: "State",
      monthlyRevenue: "Monthly Revenue",
      timeInBusiness: "Time in business? (Minimum 1 year)",
      equipmentType: "Equipment Type",
      equipmentCost: "Estimated Equipment Cost",
      equipmentCondition: "Equipment Condition",
      sellerType: "Seller Type",
      submitButton: "Get My Equipment Financing Options",
      new: "New",
      used: "Used",
      dealer: "Dealer",
      privateParty: "Private Party",
      microcopy: "Private party and used equipment are eligible, subject to additional verification.",
    },
    industries: {
      contractors: "Contractors",
      restaurants: "Restaurants",
      trucking: "Trucking",
      healthcare: "Healthcare",
      broadband: "Broadband",
    },
  },
  es: {
    hero: {
      preTitle: "Financiamiento de Equipos • $25K-$500K • Aprobación Rápida",
      title: "Financiamiento Rápido de Equipos — Mejore Su Negocio Hoy",
      description:
        "Obtenga el equipo que necesita para hacer crecer su negocio en tan solo 24-48 horas* — sin garantía, sin estrés.",
      disclaimer: "*Los plazos varían según el negocio y requieren aprobación.",
      formTitle: "Verificar Elegibilidad → Ver Opciones → Aplicar",
      formDescription: "Formulario seguro • Aprobación rápida • Sin obligación",
      qualifiesTitle: "Quién Califica:",
      qualifiesBusiness: "6+ meses en el negocio",
      qualifiesRevenue: "$20k+ de ingresos mensuales",
      qualifiesCredit: "Todo crédito considerado (sujeto a aprobación)",
      complianceText: "Aprobaciones típicas en 24–72 horas* (*sujeto a aprobación)",
    },
    form: {
      businessName: "Nombre del Negocio",
      state: "Estado",
      monthlyRevenue: "Ingresos Mensuales",
      timeInBusiness: "Tiempo en el Negocio",
      equipmentType: "Tipo de Equipo",
      equipmentCost: "Costo Estimado del Equipo",
      equipmentCondition: "Condición del Equipo",
      sellerType: "Tipo de Vendedor",
      submitButton: "Obtener Mis Opciones de Financiamiento",
      new: "Nuevo",
      used: "Usado",
      dealer: "Concesionario",
      privateParty: "Venta Particular",
      microcopy: "Equipos usados y de venta particular son elegibles, sujeto a verificación adicional.",
    },
    industries: {
      contractors: "Contratistas",
      restaurants: "Restaurantes",
      trucking: "Transporte",
      healthcare: "Salud",
      broadband: "Internet",
    },
  },
};

export const useTranslations = () => {
  const getLanguage = () => {
    if (typeof window === "undefined") return "en";
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("lang") === "es" ? "es" : "en";
  };

  const lang = getLanguage();
  return translations[lang] || translations.en;
};
