import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

interface TrackedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "brandBlue" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  trackingData: {
    action: string;
    category: string;
    label: string;
    source: string;
    campaign?: string;
  };
  utmParams?: {
    source: string;
    medium: string;
    campaign: string;
    content?: string;
  };
  asChild?: boolean;
}

export const TrackedButton = ({
  children,
  href,
  onClick,
  variant = "default",
  size = "default",
  className,
  trackingData,
  utmParams,
  asChild = false,
  ...props
}: TrackedButtonProps) => {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    // Track the event
    trackEvent(trackingData);

    // Execute original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  const buildURL = (baseUrl: string) => {
    if (!utmParams) return baseUrl;

    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set("utm_source", utmParams.source);
    url.searchParams.set("utm_medium", utmParams.medium);
    url.searchParams.set("utm_campaign", utmParams.campaign);
    if (utmParams.content) {
      url.searchParams.set("utm_content", utmParams.content);
    }

    return url.toString();
  };

  if (href) {
    const finalUrl = buildURL(href);
    return (
      <Button variant={variant} size={size} className={className} asChild={asChild} {...props}>
        <a href={finalUrl} onClick={handleClick}>
          {children}
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};
