import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
export const DealerPrivateToggle = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("dealer");

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    // Track tab click in dataLayer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "ef_toggle_cta_click",
        tab_value: value,
        page_url: window.location.href,
      });
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("dealer.title")}</h2>
          <p className="text-muted-foreground">{t("dealer.subtitle")}</p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="dealer" className="text-base py-3">
              {t("dealer.dealerTab")}
            </TabsTrigger>
            <TabsTrigger value="private" className="text-base py-3">
              {t("dealer.privateTab")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dealer">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t("dealer.dealerCardTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t("dealer.dealerPoint1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t("dealer.dealerPoint2")}</span>{" "}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t("dealer.dealerPoint3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t("dealer.dealerPoint4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="private">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{t("dealer.privateCardTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{t("dealer.privatePoint1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{t("dealer.privatePoint2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{t("dealer.privatePoint3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{t("dealer.privatePoint4")}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
