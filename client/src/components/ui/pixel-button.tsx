import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "mario-red" | "luigi-green" | "coin-gold" | "sky-blue" | "white";
  size?: "sm" | "md" | "lg";
}

export function PixelButton({ 
  children, 
  className, 
  variant = "mario-red", 
  size = "md",
  ...props 
}: PixelButtonProps) {
  const baseStyles = "font-pixel relative transform transition-transform hover:scale-105 active:translate-y-1";
  
  const variantStyles = {
    "mario-red": "bg-mario-red text-white",
    "luigi-green": "bg-luigi-green text-white",
    "coin-gold": "bg-coin-gold text-dark",
    "sky-blue": "bg-sky-blue text-white",
    "white": "bg-white text-dark",
  };
  
  const sizeStyles = {
    "sm": "py-1 px-3 text-xs",
    "md": "py-3 px-6 text-sm",
    "lg": "py-4 px-8 text-xl",
  };
  
  return (
    <button
      className={cn(
        baseStyles, 
        variantStyles[variant], 
        sizeStyles[size], 
        "border-4 border-black",
        "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        "active:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
