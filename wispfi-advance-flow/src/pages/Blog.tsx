import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, User } from "lucide-react";
import { BlogPost, getPostsByCategory, getAllCategories } from "@/lib/blog-data";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { NewsletterOptIn } from "@/components/wispfi/NewsletterOptIn";
import { TrackedButton } from "@/components/wispfi/TrackedButton";

const Blog = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredPosts = getPostsByCategory(selectedCategory);
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>WispFi Business Funding Blog | Small Business Finance Insights</title>
        <meta
          name="description"
          content="Expert insights on small business funding, economics, and finance. Get the latest strategies for business growth and funding success."
        />
        <link rel="canonical" href="/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "WispFi Business Funding Blog",
            description: "Expert insights on small business funding, economics, and finance",
            url: "/blog",
            author: {
              "@type": "Organization",
              name: "WispFi",
            },
            blogPost: filteredPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              datePublished: post.publishDate,
              author: {
                "@type": "Organization",
                name: post.author,
              },
              url: `/blog/${post.slug}`,
            })),
          })}
        </script>
      </Helmet>

      <SiteHeader />

      <main>
        <section className="mx-auto max-w-[1200px] px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{t("blog.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("blog.subtitle")}</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="hover:scale-105 transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Article Hero */}
          {filteredPosts.length > 0 && (
            <div className="mb-16">
              <Card className="group hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl border-2 border-muted/20 bg-gradient-to-br from-background via-background to-muted/10">
                <div className="lg:flex lg:min-h-[500px]">
                  <div className="lg:w-3/5 relative overflow-hidden">
                    <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                      <img
                        src={filteredPosts[0].image}
                        alt={filteredPosts[0].alt}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent lg:from-transparent lg:to-black/20"></div>
                    </div>
                  </div>
                  <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-background to-muted/5">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <Badge
                        variant="default"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-semibold rounded-full shadow-lg"
                      >
                        {filteredPosts[0].category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4 mr-1" />
                        {filteredPosts[0].readTime} {t("blog.minRead")}
                      </div>
                    </div>

                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight tracking-tight">
                      {filteredPosts[0].title}
                    </h2>

                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed line-clamp-3">
                      {filteredPosts[0].excerpt}
                    </p>

                    <div className="mt-6 flex justify-center">
                      <TrackedButton
                        size="lg"
                        href={`/blog/${filteredPosts[0].slug}`}
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue-hover))] text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 transition-all duration-200"
                        trackingData={{
                          action: "blog_featured_read",
                          category: "content",
                          label: filteredPosts[0].slug,
                          source: "blog_featured_hero",
                        }}
                        utmParams={{
                          source: "blog",
                          medium: "featured_hero",
                          campaign: "blog_engagement",
                        }}
                      >
                        {t("blog.readFullArticle")}
                        <span aria-hidden="true">→</span>
                      </TrackedButton>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 justify-center lg:justify-start">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {t("blog.fundingExperts")}
                      </div>
                      <span aria-hidden="true">•</span>
                      <time dateTime={filteredPosts[0].publishDate}>
                        {t("blog.published")}{" "}
                        {new Date(filteredPosts[0].publishDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Blog Posts Grid - New design with better spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 auto-rows-fr">
                {filteredPosts.length > 1 ? (
                  [
                    ...filteredPosts.slice(1).map((post, index) => (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-muted/20 overflow-hidden group h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        aria-label={`Read article: ${post.title}`}
                      >
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img
                            src={post.image}
                            alt={post.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.readTime} {t("blog.minRead")}
                            </div>
                          </div>
                          <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed mb-4 flex-1">
                            {post.excerpt.length > 150 ? post.excerpt.substring(0, 150) + "..." : post.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-2 text-sm text-slate-500 mt-auto">
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {t("blog.experts")}
                            </span>
                            <span>
                              {new Date(post.publishDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </a>
                    )),
                    // Filler CTA card if needed to prevent gaps
                    ...(filteredPosts.length % 3 === 2
                      ? [
                          <div
                            key="cta-filler"
                            className="flex flex-col p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 rounded-2xl shadow-sm overflow-hidden"
                          >
                            <h3 className="text-lg font-bold mb-3 text-foreground">{t("blog.getMoreTips")}</h3>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                              {t("blog.subscribeCta")}
                            </p>
                            <TrackedButton
                              size="sm"
                              href="#newsletter"
                              className="w-full inline-flex items-center justify-center max-w-full bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue-hover))] text-white font-bold"
                              trackingData={{
                                action: "newsletter_cta_click",
                                category: "engagement",
                                label: "blog_filler_card",
                                source: "blog_grid_filler",
                              }}
                            >
                              {t("blog.subscribeNow")}
                            </TrackedButton>
                          </div>,
                        ]
                      : []),
                  ]
                ) : filteredPosts.length === 1 ? (
                  <div className="col-span-full text-center py-20 bg-muted/10 rounded-2xl border border-muted/20">
                    <p className="text-muted-foreground text-lg">{t("blog.latestArticle")}</p>
                  </div>
                ) : (
                  <div className="col-span-full text-center py-20 bg-muted/10 rounded-2xl border border-muted/20">
                    <p className="text-muted-foreground text-lg">{t("blog.noPosts")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Positioned properly */}
            <aside className="space-y-8">
              <div className="sticky top-24">
                {/* Newsletter Opt-in */}
                <div id="newsletter">
                  <NewsletterOptIn />
                </div>

                {/* CTA Card */}
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg mt-8">
                  <h3 className="text-lg font-bold mb-3 text-foreground">{t("blog.needFunding")}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t("blog.fundingEstimate")}</p>
                  <div className="space-y-3">
                    <TrackedButton
                      size="sm"
                      href="/#eligibility-form"
                      className="w-full h-12 inline-flex items-center justify-center max-w-full bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue-hover))] text-white font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      trackingData={{
                        action: "funding_calculator_click",
                        category: "conversion",
                        label: "blog_sidebar_cta",
                        source: "blog_sidebar",
                      }}
                      utmParams={{
                        source: "blog",
                        medium: "sidebar_cta",
                        campaign: "funding_calculator",
                      }}
                    >
                      {t("blog.calculateFunding")}
                    </TrackedButton>
                    <TrackedButton
                      variant="outline"
                      size="sm"
                      href="/contact#contact-form"
                      className="w-full h-12 inline-flex items-center justify-center max-w-full border-2 border-[hsl(var(--brand-blue))] text-[hsl(var(--brand-blue))] font-bold hover:bg-[hsl(var(--brand-blue))] hover:text-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-blue))] focus:ring-offset-2"
                      trackingData={{
                        action: "specialist_contact",
                        category: "conversion",
                        label: "blog_sidebar_contact",
                        source: "blog_sidebar",
                      }}
                      utmParams={{
                        source: "blog",
                        medium: "sidebar_contact",
                        campaign: "contact_specialist",
                      }}
                    >
                      {t("blog.talkToSpecialist")}
                    </TrackedButton>
                  </div>
                </Card>
              </div>
            </aside>
          </div>

          {/* Newsletter Section for Mobile */}
          <div className="lg:hidden mt-16">
            <NewsletterOptIn />
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t("blog.readyToFund")}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("blog.expertAdvice")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedButton
                size="lg"
                href="/contact#contact-form"
                className="h-12 px-8 inline-flex items-center justify-center max-w-full bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue-hover))] text-white font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                trackingData={{
                  action: "specialist_contact",
                  category: "conversion",
                  label: "blog_bottom_cta",
                  source: "blog_cta_section",
                }}
                utmParams={{
                  source: "blog",
                  medium: "bottom_cta",
                  campaign: "contact_specialist",
                }}
              >
                {t("blog.talkToFundingSpecialist")}
              </TrackedButton>
              <TrackedButton
                // Quitamos variant="outline" y size="lg" porque definimos altura y padding en className
                // Si necesitas que el tamaño (h, px) se maneje por 'size', omite h-12 y px-8 de className.
                href="/#eligibility-form"
                // Nuevo className: Fondo azul, texto blanco, sin efectos de hover
                className="h-12 px-8 inline-flex items-center justify-center max-w-full 
               border-2 border-[hsl(var(--brand-blue))] 
               **bg-[hsl(var(--brand-blue))] text-white font-bold** focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-blue))] focus:ring-offset-2"
                trackingData={{
                  action: "funding_calculator_click",
                  category: "conversion",
                  label: "blog_bottom_cta",
                  source: "blog_cta_section",
                }}
                utmParams={{
                  source: "blog",
                  medium: "bottom_cta",
                  campaign: "funding_calculator",
                }}
              >
                {t("blog.calculatePotential")}
              </TrackedButton>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Blog;
