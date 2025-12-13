import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Share2, ExternalLink, User, Calendar } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog-data";
import SiteHeader from "@/components/wispfi/SiteHeader";
import SiteFooter from "@/components/wispfi/SiteFooter";
import { TrackedButton } from "@/components/wispfi/TrackedButton";
import { NewsletterOptIn } from "@/components/wispfi/NewsletterOptIn";

const ORIGIN = typeof window !== "undefined" ? window.location.origin : "https://wispfi.com";

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 2);

  // Date locale based on current language
  const dateLocale = i18n.language === 'es' ? 'es-ES' : 'en-US';

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="container py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('blogPost.postNotFound')}</h1>
          <p className="text-muted-foreground mb-8">{t('blogPost.postNotFoundMessage')}</p>
          <Button asChild>
            <a href="/blog">{t('blogPost.backToBlog')}</a>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "WispFi"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{post.title} | WispFi Blog</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <link rel="canonical" href={`${ORIGIN}/blog/${post.slug}`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`${ORIGIN}/og/blog/${post.slug}.png`} />
        <meta property="og:url" content={`${ORIGIN}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <SiteHeader />
      
      <main>
        <article className="mx-auto max-w-[1200px] px-6 lg:px-8 py-8 lg:py-16">
          <div>
            {/* Back to Blog */}
            <div className="mb-8">
              <Button variant="ghost" asChild className="gap-2 hover:bg-muted/20">
                <a href="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  {t('blogPost.backToBlog')}
                </a>
              </Button>
            </div>

            {/* Article Header */}
            <header className="mb-16">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-8 shadow-2xl">
                <img
                  src={post.image}
                  alt={post.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <Badge variant="default" className="bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold rounded-full shadow-sm">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {post.readTime} {t('blogPost.minRead')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishDate).toLocaleDateString(dateLocale, { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium">{post.author}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight tracking-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light">
                  {post.excerpt}
                </p>
              </div>
            </header>

            {/* Article Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(700px,760px)_minmax(300px,360px)] gap-8">
              {/* Main Content */}
              <div>
                <div className="prose prose-lg max-w-none blog-content-container">
                  <div 
                    className="blog-content"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="italic text-foreground/80">$1</em>')
                        .replace(/^# (.*$)/gm, '<h2 class="text-3xl lg:text-4xl font-bold mb-6 text-foreground">$1</h2>')
                        .replace(/^## (.*$)/gm, '<h2 class="text-2xl lg:text-3xl font-bold mb-6 mt-16 text-primary leading-tight border-l-4 border-primary pl-6 bg-gradient-to-r from-primary/8 to-transparent py-4 rounded-r-xl shadow-sm">$1</h2>')
                        .replace(/^### (.*$)/gm, '<h3 class="text-xl lg:text-2xl font-bold mb-5 mt-12 text-foreground leading-tight">$1</h3>')
                        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="my-12 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-2"><img src="$2" alt="$1" class="w-full h-auto object-cover rounded-xl max-w-4xl mx-auto" loading="lazy" /></figure>')
                        .replace(/^> (.*$)/gm, '<blockquote class="my-10 p-8 border-l-6 border-primary bg-gradient-to-r from-primary/8 to-primary/3 rounded-r-2xl text-xl italic text-foreground font-medium leading-relaxed shadow-sm relative"><div class="absolute top-4 left-4 text-primary/30 text-4xl font-serif">"</div><div class="pl-8">$1</div></blockquote>')
                        .replace(/^- (.*$)/gm, '<li class="mb-4 text-foreground leading-relaxed flex items-start text-lg"><span class="inline-flex items-center justify-center w-6 h-6 bg-primary rounded-full mt-1 mr-4 flex-shrink-0"><svg class="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg></span><span>$1</span></li>')
                        .replace(/(<li.*?<\/li>\s*)+/gs, (match) => `<ul class="mb-10 space-y-2">${match}</ul>`)
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 font-semibold underline decoration-primary/40 hover:decoration-primary/80 decoration-2 underline-offset-2 transition-all duration-200" target="_blank" rel="noopener noreferrer">$1 <span class="inline-block ml-1 text-sm">↗</span></a>')
                        .split('\n')
                        .filter(line => line.trim())
                        .map((line, index, array) => {
                          if (line.trim().startsWith('#') || line.includes('<h') || line.includes('<ul') || line.includes('<figure') || line.includes('<blockquote') || line.includes('<li')) {
                            return line;
                          }
                          
                          // Insert mid-article CTA after ~30% of content
                          const midPoint = Math.floor(array.length * 0.3);
                          const midArticleCTA = index === midPoint ? `
                            <div class="my-16 p-10 bg-gradient-to-br from-primary/12 to-primary/6 border-2 border-primary/25 rounded-3xl shadow-xl relative overflow-hidden">
                              <div class="absolute inset-0 bg-grid-white/5 bg-[size:32px_32px] opacity-40"></div>
                              <div class="relative">
                                <div class="flex flex-col md:flex-row items-center gap-6">
                                  <div class="flex-shrink-0">
                                    <div class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                      <svg class="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                      </svg>
                                    </div>
                                  </div>
                                  <div class="flex-1 text-center md:text-left">
                                    <h3 class="text-2xl font-bold text-foreground mb-3">${t('blogPost.readyToExplore')}</h3>
                                    <p class="text-foreground/75 mb-6 text-lg leading-relaxed">${t('blogPost.estimatePrompt')}</p>
                                    <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                       <a href="/#eligibility-form" class="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        ${t('blogPost.estimateFunding')}
                                      </a>
                                       <a href="/contact#contact-form" class="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/10 transition-all duration-200 hover:shadow-md">
                                         ${t('blogPost.talkToSpecialist')}
                                       </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ` : '';
                          
                          return `${midArticleCTA}<p class="mb-8 text-foreground leading-relaxed text-lg font-normal">${line}</p>`;
                        })
                        .join('')
                    }}
                  />
                </div>
              </div>
              
              {/* Sidebar */}
              <aside>
                <div className="sticky top-24 space-y-8">
                  {/* Newsletter Signup */}
                  <NewsletterOptIn />
                  
                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-gradient-to-br from-muted/30 to-muted/10 border border-muted/20 rounded-2xl p-6 overflow-hidden">
                      <h3 className="text-lg font-semibold mb-4 text-foreground">{t('blogPost.relatedArticles')}</h3>
                      <div className="space-y-4">
                        {relatedPosts.slice(0, 3).map(relatedPost => (
                          <a 
                            key={relatedPost.slug}
                            href={`/blog/${relatedPost.slug}`}
                            className="block hover:bg-muted/20 p-3 rounded-xl transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label={`Read article: ${relatedPost.title}`}
                          >
                            <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {relatedPost.readTime} {t('blogPost.minRead')}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Funding Calculator CTA */}
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-6 overflow-hidden">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">{t('blogPost.quickEstimate')}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{t('blogPost.quickEstimateDesc')}</p>
                    <TrackedButton 
                      size="sm" 
                      href="/#eligibility-form"
                      className="w-full h-12 inline-flex items-center justify-center max-w-full bg-[hsl(var(--brand-blue))] hover:bg-[hsl(var(--brand-blue-hover))] text-white font-bold focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      trackingData={{
                        action: 'sidebar_calculator',
                        category: 'conversion',
                        label: post.slug,
                        source: 'blog_sidebar'
                      }}
                      utmParams={{
                        source: 'blog',
                        medium: 'sidebar_cta',
                        campaign: 'funding_calculator'
                      }}
                    >
                      {t('blogPost.calculateFunding')}
                    </TrackedButton>
                  </div>
                </div>
              </aside>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-20 mb-16">
                <h3 className="text-3xl font-bold mb-10 text-foreground border-b-2 border-primary/20 pb-4">{t('blogPost.relatedArticles')}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.slice(0, 2).map(relatedPost => (
                    <a 
                      key={relatedPost.slug} 
                      href={`/blog/${relatedPost.slug}`}
                      className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      aria-label={`Read article: ${relatedPost.title}`}
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-4 py-2 bg-primary/15 text-primary text-sm font-bold rounded-full border border-primary/20">
                            {relatedPost.category}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {relatedPost.readTime} {t('blogPost.minRead')}
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-4">
                          {relatedPost.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                          {relatedPost.excerpt}
                        </p>
                        <div className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary font-bold rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200 hover:shadow-md">
                          {t('blogPost.readArticle')}
                          <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* End of Article CTA */}
            <div className="mt-20 mb-16 bg-gradient-to-br from-primary/15 via-primary/8 to-primary/5 border-3 border-primary/30 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-grid-white/10 bg-[size:24px_24px] opacity-30"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/15 rounded-full blur-2xl"></div>
              <div className="relative">
                <div className="flex flex-col xl:flex-row items-center gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl">
                      <svg className="w-16 h-16 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 text-center xl:text-left">
                    <h3 className="text-4xl xl:text-5xl font-bold mb-6 text-foreground leading-tight">{t('blogPost.getAhead')}</h3>
                    <p className="text-xl xl:text-2xl text-foreground/80 mb-10 leading-relaxed font-light">
                      {t('blogPost.estimatePotentialDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center xl:justify-start">
                      <TrackedButton 
                        size="lg" 
                        href="/contact#contact-form"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-300 px-10 py-5 font-bold text-lg transform hover:-translate-y-1"
                        trackingData={{
                          action: 'blog_post_contact',
                          category: 'conversion',
                          label: post.slug,
                          source: 'blog_post_end_cta'
                        }}
                        utmParams={{
                          source: 'blog',
                          medium: 'end_cta',
                          campaign: 'contact_specialist'
                        }}
                      >
                        {t('blogPost.talkToFundingSpecialist')}
                      </TrackedButton>
                      <TrackedButton 
                        variant="outline" 
                        size="lg" 
                        href="/#eligibility-form"
                        className="border-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-10 py-5 font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                        trackingData={{
                          action: 'blog_post_calculator',
                          category: 'conversion',
                          label: post.slug,
                          source: 'blog_post_end_cta'
                        }}
                        utmParams={{
                          source: 'blog',
                          medium: 'end_cta',
                          campaign: 'funding_calculator'
                        }}
                      >
                        {t('blogPost.calculatePotential')}
                      </TrackedButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

      </main>
      
      <SiteFooter />
    </div>
  );
};

export default BlogPost;
