import React, { useState, useEffect } from 'react';

const avengersData = [
  {
    name: "IRON MAN",
    subtitle: "Billionaire. Genius. Avenger.",
    story: "Tony Stark built a high-tech suit of armor to escape captivity, becoming the invincible Iron Man and the architect of the Avengers.",
    imgSrc: "/images/ironman.png"
  },
  {
    name: "CAPTAIN AMERICA",
    subtitle: "The First Avenger",
    story: "Steve Rogers volunteered for a top-secret experiment, gaining peak human abilities and wielding a shield of indestructible vibranium.",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZgf6hMEWbMzaPO8cGrXqA8Z1-DX2GhoxrfuzELYxf3FM4xDAwVv_E37itjupgiTp6sXpOTYT-nVSYr5coXxBTlmZ6hFnEyvo3OvVZzFdPBksjSxnPBHSLCLB7DVCoisGNAdWn21EDT0NK5si9QU4qvcnx8m6DSqbb0yz9WABRNeIeziEKWdZLBNe-am0jbIHWqrfBvMg-HEUCRBMN_gjWSKb7V1UHKNnY8zSBSvNJEhURMqMHBhi90OT39NQda-i5VcU49VS8vaU"
  },
  {
    name: "THOR",
    subtitle: "God of Thunder",
    story: "Banished to Earth, the Asgardian prince learned humility and reclaimed his legendary hammer Mjolnir to defend the realms.",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5j-DsJwZppBYmfSqouvUfdHcQUzGVYlUnkXPgkZ40_DonUyEX-yO7EdinhuyqRJN4X9titaI3VtWv1MbbU7w3gt1Od9HYcsFHGUxWqGEXgTttXaV8Ace-zXU1N3Lo8CIdTn7DxftqXPLVCURMZOuPDKsYvZbl5eEH4j3EsYfKxUaSieoa5wXHuCEHPNbjK71QgDugMe2oki_d6k85i2vaAf2Nn2SJpBA8T_YySpWNZvCpDAZcCH8NV8bF1d-0_MECKEm31RaaPpA"
  },
  {
    name: "HULK",
    subtitle: "The Green Goliath",
    story: "Caught in a gamma bomb explosion, Dr. Bruce Banner transforms into a beast of pure rage and limitless strength.",
    imgSrc: "/images/hulk.jpg"
  },
  {
    name: "BLACK WIDOW",
    subtitle: "Master Assassin",
    story: "Trained in the Red Room, Natasha Romanoff defected to S.H.I.E.L.D., using her elite combat prowess to right her past wrongs.",
    imgSrc: "/images/blackwidow.jpg"
  },
  {
    name: "HAWKEYE",
    subtitle: "Expert Marksman",
    story: "Clint Barton is an unparalleled archer with trick arrows, proving that human skill can stand alongside gods and monsters.",
    imgSrc: "/images/hawkeye.jpg"
  },
  {
    name: "SPIDER-MAN",
    subtitle: "Your Friendly Neighborhood",
    story: "Bitten by a radioactive spider, teenager Peter Parker balances high school life with swinging through the skyline of New York.",
    imgSrc: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=1000&auto=format&fit=crop"
  },
  {
    name: "DOCTOR STRANGE",
    subtitle: "Sorcerer Supreme",
    story: "Arrogant surgeon Stephen Strange lost his hands but found magic, defending Earth from interdimensional mystical threats.",
    imgSrc: "/images/doctorstrange.png"
  },
  {
    name: "BLACK PANTHER",
    subtitle: "King of Wakanda",
    story: "T'Challa protects his highly advanced, isolationist African nation using the ceremonial heart-shaped herb and vibranium claws.",
    imgSrc: "/images/blackpanther.jpg"
  },
  {
    name: "SCARLET WITCH",
    subtitle: "Reality Weaver",
    story: "Wanda Maximoff wields chaotic chaos magic, distorting reality and shifting probabilities at will with devastating force.",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2uzTl3mNnFnGDfJ5p6niZYyPm0JskhDfSxGfBare3CZPuB5XAjeoJMZJpKASIgs_ANuDSE2-oIOI5KVTvK5niGsHah1Ny5Q4kxp2NBM8dyBb9iM9gha2ZrFP6pcW-R6vETiCQYmjAyasr7kbh14hVlDmq-MGaP2TkCmPDVUbXeJQbUhrkoBQnj-tItHIY6DO6FSmE4_ZNbCZ1DRzHrCK0Ek5970WZY62jYPDpHlFDVV4mABed4NFYyooOrrMqGWNocI1Cq7OoDJI"
  },
  {
    name: "VISION",
    subtitle: "Synthezoid",
    story: "Born of Vibranium, JARVIS, and the Mind Stone, the Vision possesses unfathomable density control and pure logic.",
    imgSrc: "/images/vision.jpg"
  },
  {
    name: "LOKI",
    subtitle: "God of Mischief",
    story: "The adopted brother of Thor, Loki relies on sorcery and grand deception to secure the throne he believes is his birthright.",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWWw6MyqxUPjUcWCOiZ9KJVaVOZTj-aq_DlCj_i0fP9ipdywi17gNIUxde8ltrk5AIpx1-YgBKs783gDNe5Fr-6zkixPMzKuUXwHG3XQ8z-yScF75_szg3NFm2KM40OYNibPqW4ri4aOrJU5YBwWzt0me6Rgf10d8YWSbSqzKa2OktZRWHMlEYWA7cuIu389YimlcIzbCv7yTtkOd-kjKHt4Z-B6nzwWyFsVIrZah6P_1R31HUP1UXNoueJ1hoO8cB8sg7OokzliQ"
  },
  {
    name: "MOON KNIGHT",
    subtitle: "Fist of Khonshu",
    story: "Struggling with dissociative identity disorder, Marc Spector acts as the brutal avatar of the Egyptian moon god.",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCop0m3K06H9xr8rcZQKiLFcFMnlUaotY3m7qUzNoQbnxvviJKbZJXcm6dgWkIm5v7bZQu_7vDBibOMQapMeJtwo9ENkbt7CLqtL6veBE5iZPpGhpmJtmcV225W-WSFUotPNv2s-LhLuh5GGkgc2FmePoaXTvFzvzozAK7O2zryTuN0lCPopwUR3d8on9KUTzRwLY9R3HE7KREkM2LzllSiEj3Ez4wHPPYc_72j6q4KxlfqDc7dYn2ACqzunf20hZsROX2Xm1qMU4k"
  },
  {
    name: "VENOM",
    subtitle: "Lethal Protector",
    story: "An alien symbiote bonded to Eddie Brock, granting immense, shapeshifting abilities and a craving for violent, anti-heroic justice.",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcVP6H6Dp2HuHw1bhSw4u4wOjTIwFzDvu9CEa8MhU3FwH3qthDhoCOVdtdPr02FGEhnrJWpmq6M5rtHMcMto48tvMO6L_tSEK1VL4joB7xuTivGZ9x8N_zCYoAdJZnVVrNsU7kXrtgEnVVNEfecQqimAOiB-Aw58OeomUuKZ0y1HpoPjLwQ05VVxtJCYVFPTk6uz0vpErRD4THiJp0Ifl4JB1a8hRa653y3KeTQeHa83WZAXQC5_T2nvyrDfJfm5ncp-e3go5Ie0s"
  },
  {
    name: "DEADPOOL",
    subtitle: "Merc with a Mouth",
    story: "Wade Wilson balances an unbreakable healing factor with chaotic wit and a disturbing tendency to shatter the fourth wall.",
    imgSrc: "/images/deadpool.jpg"
  }
];

export default function AvengersOverlay({ isOpen, onClose }) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  const total = avengersData.length;
  const current = avengersData[index];
  
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (animating) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, index, animating]);

  const handleChange = (newIndex) => {
    if (animating) return;
    setAnimating(true);
    // Simple cinematic fade handling via small timeout
    setTimeout(() => {
      setIndex(newIndex);
      setTimeout(() => setAnimating(false), 50);
    }, 400); // Wait for fade out
  };

  const nextSlide = () => handleChange((index + 1) % total);
  const prevSlide = () => handleChange((index - 1 + total) % total);

  // Handle Swipe
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e) => setTouchStart(e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    const end = e.changedTouches[0].screenX;
    if (touchStart - end > 50) nextSlide();
    if (touchStart - end < -50) prevSlide();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-[#0c0c0c] text-[#fbf9f4] flex flex-col md:flex-row overflow-hidden transition-opacity duration-700 ease-in-out"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Parallax Element */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none scale-150 blur-xl mix-blend-screen transition-all duration-[1500ms] ease-out delay-100"
        style={{ backgroundImage: `url(${current.imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: !animating ? 'scale(1.1) rotate(2deg)' : 'scale(1.4) rotate(-2deg)' }}
      />
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[999] text-white hover:text-[#EC1D24] transition-all duration-300 hover:scale-110 active:scale-95 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-3xl font-light">close</span>
      </button>

      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden group">
        <div 
           className={`absolute inset-0 transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]
            ${animating ? 'opacity-0 scale-105 translate-x-8' : 'opacity-100 scale-100 translate-x-0'}
           `}
        >
          <img 
            src={current.imgSrc} 
            alt={current.name}
            className="w-full h-full object-cover object-center relative z-10"
          />
          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent z-20 md:bg-gradient-to-r" />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex flex-col justify-center px-10 md:px-24 relative z-20">
        <div 
          className={`flex flex-col transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] 
          ${animating ? 'opacity-0 translate-y-12 blur-sm' : 'opacity-100 translate-y-0 blur-none'}`}
        >
          <p className="font-label text-sm md:text-base tracking-[0.4em] uppercase text-[#EC1D24] mb-3 md:mb-5 font-bold">
            {current.subtitle}
          </p>
          <h2 className="font-marvel text-6xl md:text-8xl tracking-tight leading-none uppercase mb-6 md:mb-8 text-white drop-shadow-lg">
            {current.name}
          </h2>
          <p className="font-body text-base md:text-lg text-gray-400 max-w-lg leading-relaxed md:leading-loose">
            {current.story}
          </p>
        </div>

        {/* Navigation Indicators */}
        <div className="absolute bottom-12 left-10 md:left-24 flex items-center gap-8">
          <div className="flex gap-4">
            <button onClick={prevSlide} className="hover:text-[#EC1D24] transition-colors duration-300">
              <span className="material-symbols-outlined text-3xl font-light">arrow_back</span>
            </button>
            <button onClick={nextSlide} className="hover:text-[#EC1D24] transition-colors duration-300">
              <span className="material-symbols-outlined text-3xl font-light">arrow_forward</span>
            </button>
          </div>
          <span className="font-label tracking-[0.3em] text-sm text-gray-500">
            {String(index + 1).padStart(2, '0')} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
