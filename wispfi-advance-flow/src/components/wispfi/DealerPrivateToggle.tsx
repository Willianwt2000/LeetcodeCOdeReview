import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DealerPrivateToggle = () => {
  const [activeTab, setActiveTab] = useState("dealer");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Track tab click in dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'ef_toggle_cta_click',
        tab_value: value,
        page_url: window.location.href
      });
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Dealer vs Private Party</h2>
          <p className="text-muted-foreground">We work with both purchase types to get you the equipment you need</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="dealer" className="text-base py-3">
              Dealer Purchase
            </TabsTrigger>
            <TabsTrigger value="private" className="text-base py-3">
              Private Party
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dealer">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Dealer Purchases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Streamlined process with established vendors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Warranty and service support included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Faster approval and funding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Direct payment to dealer</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="private">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Private Party</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Additional verification required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Equipment inspection may be needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Title transfer documentation required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Competitive pricing opportunities</span>
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