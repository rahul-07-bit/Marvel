import React, { useState } from 'react';

const storyData = [
  {
    name: "Iron Man",
    fullName: "Tony Stark",
    title: "The Armored Avenger",
    image: "/images/ironman.jpg",
    fallbackImage: "/images/ironman.png",
    threatIndex: "OMEGA",
    status: "SACRIFICED",
    story: "Tony Stark, a billionaire industrialist and genius inventor, was kidnapped and forced to build a devastating weapon. Instead, he used his intelligence and resources to build a high-tech suit of armor and escape captivity. This experience changed him, and he decided to use his wealth and technology to protect the world as Iron Man. As a founding member of the Avengers, he became the team's chief financier and technological lead, eventually making the ultimate sacrifice to save the universe from Thanos."
  },
  {
    name: "Captain America",
    fullName: "Steve Rogers",
    title: "The First Avenger",
    image: "/images/captainamerica.webp",
    fallbackImage: "/images/captainamerica.jpg",
    threatIndex: "OMEGA",
    status: "RETIRED",
    story: "During World War II, the frail Steve Rogers was transformed into a Super Soldier by a top-secret serum. Frozen in ice for decades after a heroic sacrifice, he awakened in the modern world to lead the Avengers. Guided by an unwavering moral compass and wielding an indestructible vibranium shield, Rogers became a symbol of hope and courage. His leadership was instrumental in the fight against Hydra and the mad titan Thanos, after which he finally found peace in the past he had lost."
  },
  {
    name: "Thor",
    fullName: "Thor Odinson",
    title: "God of Thunder",
    image: "/images/thor.webp",
    fallbackImage: "/images/thor.jpg",
    threatIndex: "OMEGA",
    status: "ACTIVE",
    story: "The crown prince of Asgard, Thor was initially an arrogant warrior before being banished to Earth to learn humility. He reclaimed his unworthy status and the power of Mjolnir, becoming one of Earth's mightiest defenders. Throughout his journey, he faced the loss of his family and his home, yet remained a stalwart protector of the Nine Realms. Armed with Stormbreaker and the power of lightning, Thor continues to seek his place in the cosmos after the fall of Thanos."
  },
  {
    name: "Hulk",
    fullName: "Bruce Banner",
    title: "The Strongest One There Is",
    image: "/images/hulk.jpg",
    fallbackImage: "/images/hulk.png",
    threatIndex: "OMEGA",
    status: "CONSULTANT",
    story: "Brilliant scientist Bruce Banner was exposed to massive doses of gamma radiation, causing him to transform into a green-skinned behemoth of pure rage whenever he's angry. For years, Banner struggled to control the 'other guy,' but eventually found a way to merge his intellect with the Hulk's strength, becoming 'Smart Hulk.' His incredible strength was vital in reversing Thanos's snap, though it came at a great physical cost. He remains a key consultant and heavy hitter for the Avengers."
  },
  {
    name: "Black Widow",
    fullName: "Natasha Romanoff",
    title: "The Master Assassin",
    image: "/images/blackwidow.jpg",
    fallbackImage: "/images/blackwidow.png",
    threatIndex: "OMEGA",
    status: "SACRIFICED",
    story: "Natasha Romanoff was trained from a young age in the Red Room, an elite Soviet spy facility. After defecting to S.H.I.E.L.D., she used her lethal skills to wipe out the red in her ledger. As a core member of the Avengers, she brought tactical expertise and unwavering loyalty to the team. Her journey culminated on Vormir, where she gave her life for the Soul Stone, ensuring the survival of the universe and her chosen family."
  },
  {
    name: "Spider-Man",
    fullName: "Peter Parker",
    title: "Your Friendly Neighborhood",
    image: "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=1000&auto=format&fit=crop",
    fallbackImage: "/images/spiderman.jpg",
    threatIndex: "BETA",
    status: "ACTIVE",
    story: "A high school student from Queens, Peter Parker gained spider-like abilities after being bitten by a radioactive spider. Mentored by Tony Stark, he transitioned from a local hero to an integral member of the Avengers. Peter balances the heavy responsibilities of a hero with the everyday struggles of a teenager. Despite losing his mentor and facing multiversal threats, he carries on the legacy of 'with great power comes great responsibility' while remaining an anonymous protector."
  },
  {
    name: "Doctor Strange",
    fullName: "Stephen Strange",
    title: "Sorcerer Supreme",
    image: "/images/doctorstrange.png",
    fallbackImage: "/images/doctorstrange.png",
    threatIndex: "OMEGA",
    status: "PROTECTOR",
    story: "Once a world-renowned but arrogant neurosurgeon, Stephen Strange's life was upended after a tragic car accident ruined his hands. Seeking a cure, he discovered the mystical arts at Kamar-Taj and eventually became the Sorcerer Supreme. Strange protects Earth from mystical and interdimensional threats, wielding the Eye of Agamotto and the Cloak of Levitation. His foresight was key in finding the one winning scenario against Thanos out of millions of possibilities."
  }
];

export default function AvengersStory({ onClose }) {
  const [selectedHero, setSelectedHero] = useState(storyData[0]);
  const [isChanging, setIsChanging] = useState(false);
  const [transitionState, setTransitionState] = useState('settled'); // 'spotlight', 'settled'

  const handleSelect = (hero) => {
    if (hero.name === selectedHero.name && transitionState === 'settled') return;
    
    setIsChanging(true);
    setTransitionState('spotlight');
    
    // Change data after short fade-out of previous focus
    setTimeout(() => {
      setSelectedHero(hero);
      setIsChanging(false);
      
      // Delay in spotlight before transitioning to side-by-side layout
      setTimeout(() => {
        setTransitionState('settled');
      }, 1000);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] pt-12 pb-32 bg-[#050505] flex flex-col md:flex-row relative overflow-hidden animate-[fadeIn_0.5s_ease-out]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Return Button */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[120] text-gray-500 hover:text-white transition-all flex items-center gap-2 group"
      >
        <span className="font-label text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">EXIT STORY MODE</span>
        <span className="material-symbols-outlined text-4xl font-light">close</span>
      </button>

      {/* Hero Selector - Left Column */}
      <div className="w-full md:w-[320px] lg:w-[400px] border-r border-white/5 flex flex-col pt-12 pb-12 relative z-10 bg-[#080808]/80 backdrop-blur-xl shrink-0">
        <div className="px-10 mb-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-red-600"></span>
            <span className="font-label text-[0.6rem] text-red-600 tracking-[0.4em] uppercase font-black">Archive Dossiers</span>
          </div>
          <h2 className="font-marvel text-4xl text-white uppercase tracking-tight">Avengers Stories</h2>
        </div>

        <nav className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
          {storyData.map((hero) => (
            <button
              key={hero.name}
              onClick={() => handleSelect(hero)}
              className={`group flex items-center justify-between px-10 py-6 border-b border-white/5 transition-all duration-500 relative overflow-hidden
                ${selectedHero.name === hero.name ? 'bg-red-600/5' : 'hover:bg-white/[0.02]'}
              `}
            >
              {selectedHero.name === hero.name && (
                <div className="absolute left-0 top-0 w-1 h-full bg-red-600 shadow-[0_0_15px_rgba(236,29,36,0.8)]" />
              )}
              
              <div className="flex flex-col items-start transition-transform duration-500 group-hover:translate-x-2">
                <span className={`font-label text-[0.55rem] tracking-[0.2em] font-bold mb-1 transition-colors ${selectedHero.name === hero.name ? 'text-red-500' : 'text-gray-500'}`}>
                  {selectedHero.name === hero.name ? 'ACTIVE_SCAN' : 'DATA_POINT'}
                </span>
                <span className={`font-marvel text-2xl tracking-wide uppercase transition-all ${selectedHero.name === hero.name ? 'text-white' : 'text-gray-400 opacity-60'}`}>
                  {hero.name}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Cinematic Content Area */}
      <div className="flex-1 relative flex flex-row overflow-hidden">
        
        {/* Cinematic Spotlight: Image appears centered first */}
        <div 
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1) z-50
            ${transitionState === 'spotlight' ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-90 blur-xl'}
          `}
        >
          <div className="w-[600px] h-[800px] relative">
            <div className="absolute inset-0 bg-red-600/20 blur-[100px] animate-pulse" />
            <img 
              loading="lazy"
              src={selectedHero.image} 
              alt={selectedHero.name}
              className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.1] shadow-[0_0_120px_rgba(0,0,0,1)] border border-white/5"
            />
            {/* Spotlight Frame UI */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-red-600 -translate-x-6 -translate-y-6" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-red-600 translate-x-6 translate-y-6" />
          </div>
        </div>

        {/* Story Text Area (Slides in from Left) */}
        <div 
          className={`w-[640px] flex flex-col justify-center px-20 relative z-20 h-full transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1)
            ${transitionState === 'settled' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24 blur-sm'}
          `}
        >
          <span className="font-label text-red-600 tracking-[0.6em] text-[0.65rem] font-black uppercase inline-block mb-4">
             Classified Hero Profile // Level 7 Clearance
          </span>
          <h1 className="font-marvel text-[8rem] text-white leading-[0.85] uppercase tracking-tighter mb-8 drop-shadow-2xl">
            {selectedHero.name}
          </h1>
          <div className="flex items-center gap-6 mb-12">
            <span className="font-label text-gray-400 tracking-[0.3em] text-[0.65rem] uppercase">{selectedHero.fullName}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
            <span className="font-label text-gray-500 tracking-[0.3em] text-[0.65rem] uppercase">{selectedHero.title}</span>
          </div>
          <div className="relative group max-w-lg mb-12">
             <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-transparent opacity-10 blur-lg transition duration-1000"></div>
             <p className="relative font-body text-lg md:text-xl text-gray-300 leading-relaxed font-light italic border-l-4 border-red-600 pl-10 py-2">
               {selectedHero.story}
             </p>
          </div>
          <div className="flex gap-10">
             <div className="flex flex-col gap-1">
               <span className="font-label text-[0.55rem] text-gray-600 tracking-[0.3em] uppercase font-bold">Threat Index</span>
               <span className="font-marvel text-2xl text-blue-500 underline decoration-blue-500/20 underline-offset-8">{selectedHero.threatIndex}</span>
             </div>
             <div className="flex flex-col gap-1">
               <span className="font-label text-[0.55rem] text-gray-600 tracking-[0.3em] uppercase font-bold">Status Code</span>
               <span className="font-marvel text-2xl text-white">{selectedHero.status}</span>
             </div>
          </div>
        </div>

        {/* Hero Portrait Area (Settled Right) */}
        <div className="flex flex-1 items-center justify-center p-12 relative h-full">
           <div 
             className={`w-full h-full max-w-[500px] relative transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1)
               ${transitionState === 'settled' ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-32 scale-90 blur-md'}
             `}
           >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
              <img 
                src={selectedHero.image} 
                alt={selectedHero.name}
                className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 rounded-sm"
              />
              <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1">
                 <span className="font-label text-[0.5rem] text-white/40 tracking-[0.4em]">SYSTEM_ARCHIVE_ID: 0x{Math.floor(Math.random()*10000)}</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
