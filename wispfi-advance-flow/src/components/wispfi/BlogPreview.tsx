import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getLatestPosts } from "@/lib/blog-data";
import { CalendarDays, Clock } from "lucide-react";
import { TrackedButton } from "@/components/wispfi/TrackedButton";
import { useTranslation } from "react-i18next";

export const BlogPreview = () => {
  const latestPosts = getLatestPosts(3);
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('components.blogPreview.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('components.blogPreview.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {latestPosts.map(post => (
            <Card key={post.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={post.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="flex-1">
                <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <TrackedButton 
                  size="sm" 
                  href={`/blog/${post.slug}`}
                  className="w-full"
                  trackingData={{
                    action: 'blog_preview_read',
                    category: 'content',
                    label: post.slug,
                    source: 'homepage_blog_preview'
                  }}
                  utmParams={{
                    source: 'homepage',
                    medium: 'blog_preview',
                    campaign: 'blog_engagement'
                  }}
                >
                  {t('components.blogPreview.readMore')}
                </TrackedButton>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <TrackedButton 
            variant="outline" 
            href="/blog"
            trackingData={{
              action: 'view_all_blog',
              category: 'navigation',
              label: 'homepage_blog_preview',
              source: 'homepage_blog_preview'
            }}
            utmParams={{
              source: 'homepage',
              medium: 'blog_preview_cta',
              campaign: 'blog_navigation'
            }}
          >
            {t('components.blogPreview.viewAll')}
          </TrackedButton>
        </div>
      </div>
    </section>
  );
};
