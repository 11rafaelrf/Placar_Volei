import React from "react";
import { cn } from "@/lib/utils";

interface PixelContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "mario-red" | "luigi-green" | "coin-gold" | "sky-blue";
}

export function PixelContainer({ 
  children, 
  className, 
  variant = "dark", 
  ...props 
}: PixelContainerProps) {
  const variantStyles = {
    "dark": "bg-dark",
    "mario-red": "bg-mario-red",
    "luigi-green": "bg-luigi-green",
    "coin-gold": "bg-coin-gold",
    "sky-blue": "bg-sky-blue",
  };
  
  return (
    <div 
      className={cn(
        "p-4 rounded-lg pixel-border", 
        variantStyles[variant], 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
