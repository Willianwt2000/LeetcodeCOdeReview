import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export const MiniFAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("components.miniFAQ.q1"),
      answer: t("components.miniFAQ.a1"),
    },
    {
      question: t("components.miniFAQ.q2"),
      answer: t("components.miniFAQ.a2"),
    },
    {
      question: t("components.miniFAQ.q3"),
      answer: t("components.miniFAQ.a3"),
    },
    {
      question: t("components.miniFAQ.q4"),
      answer: t("components.miniFAQ.a4"),
    },
    {
      question: t("components.miniFAQ.q5"),
      answer: t("components.miniFAQ.a5"),
    },
    {
      question: t("components.miniFAQ.q6"),
      answer: t("components.miniFAQ.a6"),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{t("components.miniFAQ.title")}</h2>
          <p className="text-gray-600 text-lg">{t("components.miniFAQ.subtitle")}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-4">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
