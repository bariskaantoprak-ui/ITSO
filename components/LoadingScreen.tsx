
import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-itso-dark transition-all duration-1000 ease-in-out ${
        !isLoading ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-itso-secondary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-itso-primary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className={`relative z-10 flex flex-col items-center transition-opacity duration-500 ${!isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="scale-150 mb-8">
            <Logo variant="white" />
        </div>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-8">
            <div className="h-full bg-gradient-to-r from-itso-secondary to-itso-primary animate-[loading_2s_ease-in-out_infinite] w-full origin-left"></div>
        </div>
        
        <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-4 animate-pulse">Yükleniyor</p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
