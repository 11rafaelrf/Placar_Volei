import React from "react";

export function Trophy() {
  return (
    <svg 
      viewBox="0 0 64 64" 
      className="w-32 h-32 mx-auto"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Trophy base */}
      <rect x="24" y="50" width="16" height="10" fill="#8B4513" stroke="#000000" strokeWidth="2" />
      <rect x="20" y="56" width="24" height="6" fill="#8B4513" stroke="#000000" strokeWidth="2" />
      
      {/* Trophy cup */}
      <path 
        d="M20,16 h24 v8 a12,12 0 0,1 -24,0 z" 
        fill="#FFC107" 
        stroke="#000000" 
        strokeWidth="2"
      />
      
      {/* Trophy handles */}
      <path 
        d="M20,18 h-8 a8,8 0 0,0 8,8 z" 
        fill="#FFC107" 
        stroke="#000000" 
        strokeWidth="2"
      />
      <path 
        d="M44,18 h8 a8,8 0 0,1 -8,8 z" 
        fill="#FFC107" 
        stroke="#000000" 
        strokeWidth="2"
      />
      
      {/* Trophy stem */}
      <rect x="28" y="36" width="8" height="14" fill="#FFC107" stroke="#000000" strokeWidth="2" />
      
      {/* Trophy shine */}
      <line x1="26" y1="20" x2="26" y2="28" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="30" y1="20" x2="30" y2="30" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}
