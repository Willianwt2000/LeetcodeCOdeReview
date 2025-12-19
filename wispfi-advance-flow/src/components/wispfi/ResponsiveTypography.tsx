import React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption";
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({ children, variant = "body", className }) => {
  const baseClasses = {
    h1: "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight sm:leading-normal",
    h2: "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight sm:leading-normal",
    h3: "text-lg sm:text-xl lg:text-2xl font-semibold leading-tight sm:leading-normal",
    h4: "text-base sm:text-lg lg:text-xl font-medium leading-tight sm:leading-normal",
    body: "text-sm sm:text-base leading-relaxed",
    caption: "text-xs sm:text-sm text-muted-foreground leading-relaxed",
  };

  const Component = variant.startsWith("h") ? variant : "p";

  return React.createElement(
    Component,
    {
      className: cn(baseClasses[variant], className),
    },
    children,
  );
};

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, className, size = "lg" }) => {
  const sizeClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-none",
  };

  return <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", sizeClasses[size], className)}>{children}</div>;
};

export default ResponsiveText;
