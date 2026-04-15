import React, { useState, useEffect } from 'react';
import { menuData } from '../data/menuData';

export default function HeroSection({ currentHero }) {
  const [data, setData] = useState(menuData[currentHero]);
  const [animationClass, setAnimationClass] = useState('opacity-100 translate-y-0');

  useEffect(() => {
    // Animate out
    setAnimationClass('opacity-0 translate-y-5');
    
    // Switch data and animate in after a short delay
    const timer = setTimeout(() => {
      setData(menuData[currentHero]);
      setAnimationClass('opacity-100 translate-y-0');
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentHero]);

  if (!data) return null;

  return (
    <div className="w-full md:w-1/2 h-full flex items-center justify-center pl-0 md:pl-12 lg:pl-24 relative overflow-hidden mt-8 md:mt-0">
      <div 
        className={`hero-transition flex flex-col items-center text-center max-w-lg ${animationClass}`} 
        id="hero-content"
      >
        <div className="relative w-[280px] md:w-[380px] h-[400px] md:h-[550px] mb-8 overflow-hidden bg-neutral-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] group">
          <img 
            alt="Hero Portrait" 
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms] ease-out grayscale-[0.3] group-hover:grayscale-0" 
            src={data.img}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="space-y-4 px-4">
          <h3 className="font-signature text-6xl md:text-8xl text-primary-container">{data.name}</h3>
          <p className="font-body text-neutral-400 leading-relaxed text-sm md:text-base tracking-wide max-w-sm mx-auto opacity-80">
            {data.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
