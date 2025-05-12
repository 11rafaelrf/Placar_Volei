import React from "react";

export function VolleyballCourt() {
  return (
    <svg 
      viewBox="0 0 800 300" 
      className="w-full max-w-md md:max-w-2xl h-auto mx-auto"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Court background */}
      <rect x="0" y="0" width="800" height="300" fill="#FCD34D" />
      
      {/* Court lines */}
      <rect x="20" y="20" width="760" height="260" fill="#E9B824" stroke="#000000" strokeWidth="4" />
      
      {/* Center line */}
      <line x1="400" y1="20" x2="400" y2="280" stroke="#000000" strokeWidth="4" />
      
      {/* Net */}
      <rect x="395" y="20" width="10" height="260" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      <rect x="385" y="30" width="30" height="240" fill="none" stroke="#000000" strokeWidth="2" strokeDasharray="8" />
      
      {/* Team 1 player */}
      <circle cx="200" cy="150" r="25" fill="#E52521" stroke="#000000" strokeWidth="3" />
      <rect x="185" y="135" width="30" height="8" fill="#000000" /> {/* eyes */}
      <path d="M185 155 Q200 165 215 155" stroke="#000000" strokeWidth="3" fill="none" /> {/* smile */}
      
      {/* Team 2 player */}
      <circle cx="600" cy="150" r="25" fill="#4CAF50" stroke="#000000" strokeWidth="3" />
      <rect x="585" y="135" width="30" height="8" fill="#000000" /> {/* eyes */}
      <path d="M585 155 Q600 165 615 155" stroke="#000000" strokeWidth="3" fill="none" /> {/* smile */}
      
      {/* Ball */}
      <circle cx="300" cy="120" r="15" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
      <line x1="300" y1="105" x2="300" y2="135" stroke="#000000" strokeWidth="2" />
      <line x1="285" y1="120" x2="315" y2="120" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}
