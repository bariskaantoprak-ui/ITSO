
import React from 'react';

export const Logo: React.FC<{ variant?: 'color' | 'white'; className?: string }> = ({ variant = 'color', className = "" }) => {
  const color1 = variant === 'white' ? 'currentColor' : '#0060af'; // Primary Dark Blue
  const color2 = variant === 'white' ? 'currentColor' : '#00a0e3'; // Secondary Turquoise
  
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
        {/* Dots representing filters/nodes */}
        <circle cx="12" cy="36" r="4" fill={color1} className="animate-pulse-slow" />
        <circle cx="22" cy="24" r="4" fill={color2} className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
        <circle cx="12" cy="14" r="4" fill={color1} className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Arrow representing export/growth */}
        <path d="M26 32L40 10M40 10H28M40 10V22" stroke={color1} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        
        {/* Abstract flow line */}
        <path d="M32 40C34 40 38 38 42 30" stroke={color2} strokeWidth="4" strokeLinecap="round" strokeDasharray="4 6" />
      </svg>
      <div className={`flex flex-col justify-center ${variant === 'white' ? 'text-white' : 'text-slate-800'}`}>
         <span className="font-black text-lg md:text-xl leading-none tracking-tight">Filtre<span className={variant === 'white' ? '' : 'text-itso-secondary'}>İhracat</span></span>
         <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-80 leading-tight mt-0.5 md:mt-1">Takımı</span>
      </div>
    </div>
  );
};
